// src/commands/mergeStylesIntoBase.ts
import type { Style } from "@/types/webflow";

interface MergeStylesParams {
  baseStyle: Style;
  duplicateStyles: Style[];
}

export async function mergeStylesIntoBase(
  params: MergeStylesParams
): Promise<{ success: boolean; error?: string }> {
  // This is a placeholder implementation.
  // You should replace this with your actual style merging logic.
  console.log("Merging styles:", params.baseStyle, params.duplicateStyles);
  return { success: true };
}