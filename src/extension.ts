// src/extension.ts
import { compareStyles } from './commands/compareStyles';
import { mergeStylesIntoBase } from './commands/mergeStylesIntoBase';

// Register your commands
export const commands = {
  compareStyles,
  mergeStylesIntoBase
};