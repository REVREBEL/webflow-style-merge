// src/commands/mergeDuplicates.ts
export type MergeDuplicatesResult = {
  styleGroups: Record<string, Style[]>;
  error?: string;
};

export const mergeDuplicates = async (): Promise<MergeDuplicatesResult> => {
  try {
    // Get all styles
    const allStyles = await webflow.styles.list();
    
    // Group styles by base name
    const styleGroups: Record<string, Style[]> = {};
    
    for (const style of allStyles) {
      const baseName = style.name.replace(/\s+\d+$/, '');
      
      if (!styleGroups[baseName]) {
        styleGroups[baseName] = [];
      }
      
      styleGroups[baseName].push(style);
    }
    
    // Filter out groups with only one style (no duplicates)
    Object.keys(styleGroups).forEach(key => {
      if (styleGroups[key].length <= 1) {
        delete styleGroups[key];
      }
    });
    
    return { styleGroups };
  } catch (error) {
    console.error("Error in mergeDuplicates:", error);
    return { 
      styleGroups: {},
      error: "Failed to find duplicate styles: " + (error instanceof Error ? error.message : String(error))
    };
  }
};