/** @format */

// src/components/ComponentExplorer.tsx
import type { Component, ComponentElement } from "@/types/webflow";
import React, { useState, useEffect, useRef, useCallback } from "react";

import { Alert, Box, Button, CircularProgress, Divider, List, ListItemButton, Stack, Typography } from "@mui/material";

interface ComponentDetails {
  id: string;
  name: string;
  rootElement:
    | {
        id: string;
        type: string;
      }
    | "No root element found";
}

interface ComponentInfo {
  id: string;
  name?: string;
  // Can be a string for loading/error messages, or the full details object
  details?: ComponentDetails | string;
}

const ComponentExplorer: React.FC = () => {
  const [components, setComponents] = useState<ComponentInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null);
  const [enteringComponent, setEnteringComponent] = useState<boolean>(false);
  const allComponentsRef = useRef<Component[]>([]);

  // Fetch all components from the Webflow Designer API
  const fetchComponents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const allComponents = await webflow.getAllComponents();
      allComponentsRef.current = allComponents; // Cache the component objects

      // Directly map over the component objects and fetch their names efficiently
      const componentsWithData = await Promise.all(
        allComponents.map(async (component: Component) => {
          try {
            const name = await component.getName();
            return { id: component.id, name };
          } catch (err) {
            console.error(`Error fetching name for component ${component.id}:`, err);
            // Return a fallback object so the entire Promise.all doesn't fail
            return { id: component.id, name: "Unnamed Component" };
          }
        })
      );

      setComponents(componentsWithData);
    } catch (err) {
      console.error("Error fetching components:", err);
      const message = err instanceof Error ? err.message : String(err);
      setError(`Failed to load components: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load components on initial render
  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  // Get additional details for a component
  const getComponentDetails = useCallback(
    async (component: ComponentInfo) => {
      setSelectedComponent({ ...component, details: "Loading details..." });

      try {
        const componentObj = allComponentsRef.current.find((c) => c.id === component.id);
        if (!componentObj) {
          throw new Error("Component not found");
        }

        const rootElement = await componentObj.getRootElement();

        const details: ComponentDetails = {
          id: component.id,
          name: component.name || "Unnamed Component",
          rootElement: rootElement ? { id: rootElement.id, type: rootElement.type } : "No root element found",
        };

        setSelectedComponent({ ...component, details });
      } catch (err) {
        console.error("Error fetching component details:", err);
        setSelectedComponent({
          ...component,
          details: "Error loading details. Please try again.",
        });
      }
    },
    [] // Dependencies are stable (setters, refs)
  );

  // Enter a component using Webflow Designer API
  const handleEnterComponent = useCallback(
    async (component: ComponentInfo) => {
      setEnteringComponent(true);
      setError(null);

      try {
        const allElements = await webflow.getAllElements();
        let targetInstance: ComponentElement | undefined;

        for (const element of allElements) {
          if (element.type === "ComponentInstance") {
            const componentElement = element as ComponentElement;
            const mainComponent = await componentElement.getComponent();

            if (mainComponent?.id === component.id) {
              targetInstance = componentElement;
              break;
            }
          }
        }

        if (!targetInstance) {
          throw new Error("No instances of this component found on the current page");
        }

        // Enter the component
        await webflow.enterComponent(targetInstance);
        setSelectedComponent(null); // Clear selection after entering
      } catch (err) {
        console.error("Error entering component:", err);
        const message = err instanceof Error ? err.message : String(err);
        setError(`Failed to enter component: ${message}`);
      } finally {
        setEnteringComponent(false);
      }
    },
    [] // Dependencies are stable (setters)
  );

  // Render loading state
  if (loading && components.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={4}>
        <Typography
          variant="h5"
          component="h1">
          Component Explorer
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          onClick={fetchComponents}
          size="small"
          disabled={loading}
          variant="outlined">
          Refresh Components
        </Button>

        <Box display="flex">
          {/* Component List */}
          <Box sx={{ width: "50%", pr: 2 }}>
            <Typography
              variant="h6"
              component="h2"
              mb={2}>
              Components ({components.length})
            </Typography>

            {components.length === 0 && !loading ? (
              <Typography>No components found in this project.</Typography>
            ) : (
              <List>
                {components.map((component) => (
                  <ListItemButton
                    key={component.id}
                    selected={selectedComponent?.id === component.id}
                    onClick={() => getComponentDetails(component)}
                    sx={{ display: "block", mb: 1 }}>
                    <Typography fontWeight="medium">{component.name || "Unnamed Component"}</Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary">
                      ID: {component.id}
                    </Typography>
                  </ListItemButton>
                ))}
              </List>
            )}
          </Box>

          {/* Component Details */}
          <Box sx={{ width: "50%", pl: 2, borderLeft: 1, borderColor: "divider" }}>
            <Typography
              variant="h6"
              component="h2"
              mb={2}>
              Component Details
            </Typography>

            {selectedComponent ? (
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold">
                  {selectedComponent.name || "Unnamed Component"}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  mb={2}>
                  ID: {selectedComponent.id}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {typeof selectedComponent.details === "string" ? (
                  <Typography>{selectedComponent.details}</Typography>
                ) : (
                  <Box>
                    <Typography variant="subtitle2">Root Element</Typography>
                    {selectedComponent.details?.rootElement && typeof selectedComponent.details.rootElement === "object" ? (
                      <>
                        <Typography variant="body2">Type: {selectedComponent.details.rootElement.type}</Typography>
                        <Typography variant="body2">ID: {selectedComponent.details.rootElement.id}</Typography>
                      </>
                    ) : (
                      <Typography variant="body2">No root element information is available for this component.</Typography>
                    )}

                    <Button
                      sx={{ mt: 4 }}
                      variant="contained"
                      size="small"
                      disabled={enteringComponent}
                      onClick={() => handleEnterComponent(selectedComponent)}>
                      {enteringComponent ? (
                        <CircularProgress
                          size={24}
                          color="inherit"
                        />
                      ) : (
                        "Enter Component"
                      )}
                    </Button>
                  </Box>
                )}
              </Box>
            ) : (
              <Typography>Select a component to view details</Typography>
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ComponentExplorer;
