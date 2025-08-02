// src/commands/mergeStylesIntoBase.ts
import type { Style } from "@/types/webflow";

interface MergeStylesParams {
  baseStyle: Style;
  duplicateStyles: Style[];
}

/**
 * Re-assigns elements from duplicate styles to a base style, then deletes the duplicates.
 * @param baseStyle The style to keep and apply to elements.
 * @param duplicateStyles An array of styles to be removed.
 * @returns A promise that resolves to an object indicating success or failure.
 */
export async function mergeStylesIntoBase({
  baseStyle,
  duplicateStyles,
}: MergeStylesParams): Promise<{ success: boolean; error?: string }> {
  try {
    for (const dupStyle of duplicateStyles) {
      const elements = await dupStyle.getElements();
      for (const element of elements) {
        await element.removeStyle(dupStyle);
        await element.addStyle(baseStyle);
      }
      await dupStyle.remove();
    }
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Error during style merge:", message);
    return { success: false, error: `Failed to merge styles: ${message}` };
  }
}