// src/components/Home.tsx
import React, { useState, useEffect } from "react";
import type { Style } from "@/types/webflow";
import { mergeDuplicates } from "@/commands/mergeDuplicates";

// Assuming these commands exist and are exported from these paths.
// I have created placeholder files for them to resolve the errors.
import { compareStyles } from "@/commands/compareStyles";
import { mergeStylesIntoBase } from "@/commands/mergeStylesIntoBase";

const commands = { mergeDuplicates, compareStyles, mergeStylesIntoBase };

// The PropertyMap type is not exported, so we define a local type for a Style object that includes its properties.
type StyleWithProperties = Style & { properties: Record<string, unknown> };

const Home = () => {
  // The style objects will have a 'name' property after being processed.
  const [styleGroups, setStyleGroups] = useState<Record<string, (Style & { name: string })[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [compareData, setCompareData] = useState<StyleWithProperties[] | null>(null);
  const [mergeInProgress, setMergeInProgress] = useState(false);

  useEffect(() => {
    loadStyles();
  }, []);

  const loadStyles = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await commands.mergeDuplicates();
      if (result.error) {
        setError(result.error);
      } else {
        setStyleGroups(result.styleGroups || {});
      }
    } catch (err) {
      setError("Failed to load styles");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompareStyles = async (groupName: string) => {
    setSelectedGroup(groupName);
    setCompareData(null);
    
    try {
      const group = styleGroups[groupName];
      if (!group) {
        throw new Error("Selected style group not found.");
      }

      const result = await commands.compareStyles({ styles: group });
      if (result.error) {
        setError(result.error);
      } else {
        setCompareData(result.stylesWithProperties);
      }
    } catch (err) {
      setError("Failed to compare styles");
      console.error(err);
    }
  };

  const handleMergeStyles = async (groupName: string) => {
    setMergeInProgress(true);
    try {
      const group = styleGroups[groupName];
      // Type guard to ensure the group and its elements exist
      if (!group || group.length < 2) {
        throw new Error("Cannot merge a group with less than two styles.");
      }

      const baseStyle = group[0]; // Assume first style is base
      const duplicateStyles = group.slice(1); // All others are duplicates
      
      const result = await commands.mergeStylesIntoBase({
        baseStyle,
        duplicateStyles,
      });
      
      if (result.error) {
        setError(result.error);
      } else {
        // Refresh the style list after successful merge
        await loadStyles();
      }
    } catch (err) {
      setError("Failed to merge styles");
      console.error(err);
    } finally {
      setMergeInProgress(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="heading">Webflow Style Merge</h1>
      
      {error && (
        <div className="error-alert">
          {error}
        </div>
      )}

      {Object.keys(styleGroups).length === 0 ? (
        <div className="info-message">
          No duplicate styles found. All your styles have unique names.
        </div>
      ) : (
        <div className="style-groups">
          <h2>Potential Duplicate Styles</h2>
          <p>The following groups of styles have similar names and may be duplicates.</p>
          
          {Object.entries(styleGroups).map(([groupName, styles]) => (
            <div key={groupName} className="style-group">
              <div className="group-header">
                <h3>{groupName}</h3>
                <span className="count-badge">{styles.length} styles</span>
              </div>
              
              <div className="style-list">
                {styles.map((style) => (
                  <div key={style.id} className="style-item">
                    {style.name}
                  </div>
                ))}
              </div>
              
              <div className="action-buttons">
                <button 
                  className="compare-button"
                  onClick={() => handleCompareStyles(groupName)}
                >
                  Compare Styles
                </button>
                
                <button 
                  className="merge-button"
                  onClick={() => handleMergeStyles(groupName)}
                  disabled={mergeInProgress}
                >
                  {mergeInProgress ? "Merging..." : "Merge into Base"}
                </button>
              </div>
              
              {selectedGroup === groupName && compareData && (
                <div className="compare-results">
                  <h4>Style Comparison</h4>
                  {/* Display comparison data here */}
                  <pre>{JSON.stringify(compareData, null, 2)}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;