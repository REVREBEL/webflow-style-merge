import { Box, Button } from "@mui/material";
import { useDevTools } from "../hooks/useDevTools";

export function DevTools() {
  const { clearSession, logStorage } = useDevTools();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 4,
      }}
    >
      <Button variant="outlined" onClick={logStorage}>
        Log Storage
      </Button>
      <Button variant="contained" color="error" onClick={clearSession}>
        Clear Session & Data
      </Button>
    </Box>
  );
}