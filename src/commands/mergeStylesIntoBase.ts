// src/commands/mergeStylesIntoBase.ts
export type MergeStylesIntoBaseParams = {
  baseStyle: Style;
  duplicateStyles: Style[];
};

export type MergeStylesIntoBaseResult = {
  success: boolean;
  error?: string;
};

export const mergeStylesIntoBase = async ({ 
  baseStyle, 
  duplicateStyles 
}: MergeStylesIntoBaseParams): Promise<MergeStylesIntoBaseResult> => {
  try {
    for (const duplicateStyle of duplicateStyles) {
      // Get all elements using the duplicate style
      const elements = await duplicateStyle.getElements();
      
      // Replace duplicate style with base style on all elements
      for (const element of elements) {
        await element.removeStyle(duplicateStyle);
        await element.addStyle(baseStyle);
      }
      
      // Remove the duplicate style (will only work if no elements are using it)
      await webflow.removeStyle(duplicateStyle);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error in mergeStylesIntoBase:", error);
    return { 
      success: false,
      error: "Failed to merge styles: " + (error instanceof Error ? error.message : String(error))
    };
  }
};