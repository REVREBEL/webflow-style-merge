// src/components/Home.tsx
import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  Checkbox,
  Alert,
  Paper,
  Divider,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { Style } from "@/types/webflow";
import { mergeStylesIntoBase } from "../commands/mergeStylesIntoBase";
import { compareStyles } from "../commands/compareStyles";

// A style object that includes its name, fetched asynchronously.
type StyleWithName = Style & { name: string };

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundStyles, setFoundStyles] = useState<StyleWithName[]>([]);
  const [sourceStyleId, setSourceStyleId] = useState<string | null>(null);
  const [targetStyleIds, setTargetStyleIds] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [mergeAction, setMergeAction] = useState<(() => void) | null>(null);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a base class name to search.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setFoundStyles([]);
    setSourceStyleId(null);
    setTargetStyleIds([]);

    try {
      const allStyles = await webflow.getAllStyles();
      const stylesWithName = await Promise.all(
        allStyles.map(async (style: Style) => ({
          ...style,
          name: await style.getName(),
        }))
      );

      const filtered = stylesWithName
        .filter((style: StyleWithName) => style.name.startsWith(searchQuery))
        .slice(0, 20); // Limit to first 20 results

      setFoundStyles(filtered);
      if (filtered.length === 0) {
        setError(`No styles found starting with "${searchQuery}".`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Failed to search for styles: ${message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleToggleTarget = (styleId: string) => {
    setTargetStyleIds((prev) =>
      prev.includes(styleId)
        ? prev.filter((id) => id !== styleId)
        : [...prev, styleId]
    );
  };

  const handleSelectAllTargets = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allTargetIds = foundStyles
        .filter((style) => style.id !== sourceStyleId) // Exclude the source
        .map((style) => style.id);
      setTargetStyleIds(allTargetIds);
    } else {
      setTargetStyleIds([]);
    }
  };

  const performMerge = async (source: StyleWithName, targets: StyleWithName[]) => {
    setIsMerging(true);
    setError(null);
    try {
      const result = await mergeStylesIntoBase({ baseStyle: source, duplicateStyles: targets });
      if (result.error) {
        setError(result.error);
      } else {
        await handleSearch();
        webflow.notify({ type: "Success", message: "Styles merged successfully!" });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Failed to merge styles: ${message}`);
      console.error(err);
    } finally {
      setIsMerging(false);
    }
  };

  const handleMerge = async () => {
    if (!sourceStyleId || targetStyleIds.length === 0) {
      setError(
        "Please select a source style to keep and at least one target style to merge."
      );
      return;
    }

    const sourceStyle = foundStyles.find((s) => s.id === sourceStyleId);
    const targetStyles = foundStyles.filter((s) =>
      targetStyleIds.includes(s.id)
    );

    if (!sourceStyle || targetStyles.length === 0) {
      setError("Could not find the selected styles. Please try searching again.");
      return;
    }

    // --- Style Comparison & Warning ---
    let stylesAreDifferent = false;
    for (const target of targetStyles) {
      const areEqual = await compareStyles(sourceStyle, target);
      if (!areEqual) {
        stylesAreDifferent = true;
        break;
      }
    }

    if (stylesAreDifferent) {
      // If styles are different, open the confirmation dialog
      setMergeAction(() => () => performMerge(sourceStyle, targetStyles));
      setIsConfirmDialogOpen(true);
    } else {
      // If styles are the same, merge directly
      await performMerge(sourceStyle, targetStyles);
    }
  };

  // Derived state for the "Select All" checkbox to improve readability
  const nonSourceStylesCount = foundStyles.length - (sourceStyleId ? 1 : 0);
  const allTargetsSelected =
    nonSourceStylesCount > 0 && targetStyleIds.length === nonSourceStylesCount;
  const someTargetsSelected =
    targetStyleIds.length > 0 &&
    targetStyleIds.length < nonSourceStylesCount;

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" component="h1">
        Style Merge Tool
      </Typography>
      <Typography variant="body1">
        Enter a base class name to find and merge its variations (e.g., "dev_block" to find "dev_block 1", "dev_block 2", etc.).
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="Base Class Name"
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isLoading}
            sx={{ minWidth: 100 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Search"}
          </Button>
        </Box>
      </Paper>

      {error && <Alert severity="error">{error}</Alert>}

      {foundStyles.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6">Found Styles</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Select one style to keep (Source) and one or more styles to merge into it (Targets).
          </Typography>
          <FormControlLabel
            label="Select All Targets"
            control={
              <Checkbox
                checked={allTargetsSelected}
                indeterminate={someTargetsSelected}
                onChange={handleSelectAllTargets}
                disabled={!sourceStyleId} // Disable until a source is chosen
              />
            }
          />
          <Box sx={{ position: "relative" }}>
            {isMerging && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  borderRadius: 1,
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <List sx={{ opacity: isMerging ? 0.5 : 1 }}>
              {foundStyles.map((style: StyleWithName) => (
                <ListItem key={style.id} disablePadding>
                  <ListItemIcon>
                    <Radio
                      checked={sourceStyleId === style.id}
                      onChange={() => setSourceStyleId(style.id)}
                      disabled={targetStyleIds.includes(style.id)}
                    />
                  </ListItemIcon>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={targetStyleIds.includes(style.id)}
                      onChange={() => handleToggleTarget(style.id)}
                      disabled={sourceStyleId === style.id}
                    />
                  </ListItemIcon>
                  <ListItemText primary={style.name} secondary={`ID: ${style.id}`} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleMerge}
              disabled={isMerging || !sourceStyleId || targetStyleIds.length === 0}
            >
              {isMerging ? <CircularProgress size={24} /> : `Merge ${targetStyleIds.length} styles`}
            </Button>
          </Box>
        </Paper>
      )}

      <Dialog
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
      >
        <DialogTitle>Style Mismatch Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The selected source and target styles have different properties. Merging them may cause unintended visual changes. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              mergeAction?.();
              setIsConfirmDialogOpen(false);
            }}
            color="warning"
          >Proceed with Merge</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
