/**
 * @file webflow-designer-extensions.ts
 * @description This file acts as a bridge to the global Webflow types,
 * making them available as standard ES module exports. This avoids
 * issues with global namespace resolution in different build environments.
 */

// Re-export the types we need from the global Webflow namespace.
export type Component = Webflow.Component;
export type ComponentElement = Webflow.ComponentElement;
export type AnyElement = Webflow.AnyElement;
export type Style = Webflow.Style;
