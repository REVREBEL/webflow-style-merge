/**
 * @file webflow.d.ts
 * @description This file creates a virtual module for Webflow types.
 * It loads the global types from the official package and re-exports
 * them from a stable, importable module path (`@/types/webflow`).
 * This avoids issues with global namespace resolution during the build process.
 */

/// <reference types="@webflow/designer-extension-typings" />

declare module '@/types/webflow' {
  export type Component = Webflow.Component;
  export type ComponentElement = Webflow.ComponentElement;
  export type AnyElement = Webflow.AnyElement;
  export type Style = Webflow.Style;
}