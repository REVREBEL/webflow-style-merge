// src/extension.ts
import { mergeDuplicates } from './commands/mergeDuplicates';
import { compareStyles } from './commands/compareStyles';
import { mergeStylesIntoBase } from './commands/mergeStylesIntoBase';

// Register your commands
export const commands = {
  mergeDuplicates,
  compareStyles,
  mergeStylesIntoBase
};