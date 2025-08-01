// src/commands/mergeDuplicates.ts
import { Style } from '@/types/webflow-designer-extensions';

export type MergeDuplicatesResult = {
  styleGroups: Record<string, Style[]>;
  error?: string;
};

/**
 * Scans all styles and returns groups of duplicate-named styles
 * like: gap-xsmall, gap-xsmall 1, gap-xsmall 2
 */

export const mergeDuplicates = async (): Promise<MergeDuplicatesResult> => {
  try {
    const rawStyles = await webflow.getAllStyles();
    const allStyles: (Style & { name: string })[] = await Promise.all(
      rawStyles.map(async (style: Style) => ({
        ...style,
        name: await style.getName(),
      }))
    );

    // Group by base name (e.g., "gap-xsmall" from "gap-xsmall 1")
    const styleGroups: Record<string, (Style & { name: string })[]> = {};

    for (const style of allStyles) {
      const baseName = style.name.replace(/\s+\d+$/, ''); // strips trailing space + digits
      if (!styleGroups[baseName]) styleGroups[baseName] = [];
      styleGroups[baseName].push(style);
    }

    // Remove entries where there’s only one style (no dupes)
    Object.keys(styleGroups).forEach((key) => {
      const group = styleGroups[key];
      if (group && group.length <= 1) {
        delete styleGroups[key];
      }
    });

    return { styleGroups };
  } catch (error) {
    console.error('Error in mergeDuplicates:', error);
    return {
      styleGroups: {},
      error: `Failed to merge duplicates: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};
