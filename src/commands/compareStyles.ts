// src/commands/compareStyles.ts
export type StyleWithProperties = Style & { properties: Record<string, unknown> };

export type CompareStylesParams = {
  styles: Style[];
};

export type CompareStylesResult = {
  stylesWithProperties: StyleWithProperties[];
  error?: string;
};

export const compareStyles = async ({ styles }: CompareStylesParams): Promise<CompareStylesResult> => {
  try {
    const stylesWithProperties: StyleWithProperties[] = [];
    
    for (const style of styles) {
      const properties = await style.getProperties();
      stylesWithProperties.push({
        ...style,
        properties
      });
    }
    
    return { stylesWithProperties };
  } catch (error) {
    console.error("Error in compareStyles:", error);
    return { 
      stylesWithProperties: [],
      error: "Failed to compare styles: " + (error instanceof Error ? error.message : String(error))
    };
  }
};