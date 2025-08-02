// src/commands/compareStyles.ts
import type { Style } from "@/types/webflow";

/**
 * Compares two styles to see if their properties are identical.
 * @param styleA The first style to compare.
 * @param styleB The second style to compare.
 * @returns A promise that resolves to `true` if the styles are identical, otherwise `false`.
 */
export async function compareStyles(
  styleA: Style,
  styleB: Style
): Promise<boolean> {
  try {
    const propsA = await styleA.getProperties();
    const propsB = await styleB.getProperties();
    // A JSON stringify comparison is a fast and effective way to check for deep equality.
    return JSON.stringify(propsA) === JSON.stringify(propsB);
  } catch (error) {
    console.error(`Error comparing styles ${styleA.id} and ${styleB.id}:`, error);
    // To be safe, assume they are not equal if the comparison fails.
    return false;
  }
}