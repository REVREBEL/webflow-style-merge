// src/components/ComponentsList.jsx
import React, { useEffect, useState } from "react";
import { useCapabilities } from "../context/CapabilitiesContext";

const ComponentsList = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const capabilities = useCapabilities();

  useEffect(() => {
    const loadComponents = async () => {
      // Wait until capabilities check is complete
      if (capabilities.isLoading) {
        return; // Do nothing until capabilities are loaded
      }

      setLoading(true);
      setError(null);

      if (capabilities.hasComponents) {
        try {
          const fetchedComponents = await webflow.getAllComponents();
          // Fetch names for each component, as the API requires an async call
          const componentsWithNames = await Promise.all(
            fetchedComponents.map(async (component) => ({
              id: component.id,
              name: await component.getName(),
            }))
          );
          setComponents(componentsWithNames);
        } catch (err) {
          console.error("Failed to load components:", err);
          setError("Failed to load components.");
        }
      } else {
        // Handle case where component API is not available
        setError("Component API is not available in this context.");
      }
      setLoading(false);
    };

    loadComponents();
  }, [capabilities.isLoading, capabilities.hasComponents]);

  if (loading || capabilities.isLoading) {
    return <div>Loading components...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Available Components</h2>
      {components.length > 0 ? (
        <ul>
          {components.map((component) => (
            <li key={component.id}>
              {component.name} (ID: {component.id})
            </li>
          ))}
        </ul>
      ) : (
        <p>No components found in this project.</p>
      )}
    </div>
  );
};

export default ComponentsList;