
/**
 * @file useWebflowStyles.ts
 * @description A React hook for interacting with Webflow Designer styles and elements.
 * @module useWebflowStyles
 */

import { useCallback } from 'react';
import type { Style as WebflowStyle } from '@/types/webflow-designer-extensions';

export const BREAKPOINTS = ['xxl', 'xl', 'large', 'main', 'medium', 'small', 'tiny'] as const;
export const PSEUDOS = [
  'noPseudo', 'nth-child(odd)', 'nth-child(even)', 'first-child', 'last-child',
  'hover', 'active', 'pressed', 'visited', 'focus', 'focus-visible',
  'focus-within', 'placeholder', 'empty', 'before', 'after'
] as const;

type Breakpoint = typeof BREAKPOINTS[number];
type Pseudo = typeof PSEUDOS[number];

function handleApiError(error: any, contextMessage: string): void {
  console.error(contextMessage, error);
  let userMessage = 'An unexpected error occurred. Please try again.';
  if (error?.cause?.tag) {
    switch (error.cause.tag) {
      case 'DuplicateValue': userMessage = 'A variable with this name already exists.'; break;
      case 'ResourceMissing': userMessage = 'The requested item could not be found.'; break;
      case 'InvalidTargetElement': userMessage = 'Invalid element for this operation.'; break;
      case 'Forbidden': userMessage = 'Permission denied. Switch to Design Mode on the Main Branch.'; break;
      default: userMessage = error.message || `Error: ${error.cause.tag}`;
    }
  }
  webflow.notify({ type: 'Error', message: userMessage });
}

/**
 * React hook exposing Webflow Designer style utilities.
 */
export function useWebflowStyles() {
  const canDesign = useCallback(async (): Promise<boolean> => {
    try {
      const capabilities = await webflow.canForAppMode([
        webflow.appModes.canDesign,
        webflow.appModes.canEdit
      ]);
      if (!capabilities.canDesign) {
        await webflow.notify({
          type: 'Error',
          message: 'Design mode required. Ensure you are on the Main Branch.',
        });
      }
      return capabilities.canDesign;
    } catch (error) {
      handleApiError(error, 'Error checking design capabilities:');
      return false;
    }
  }, []);

  const setExtensionSize = useCallback(async (size: 'default' | 'comfortable' | 'large' | { width: number; height: number }) => {
    try {
      await webflow.setExtensionSize(size);
    } catch (error) {
      handleApiError(error, 'Error setting extension size:');
    }
  }, []);

  const setTextOnSelectedElement = useCallback(async (text: string) => {
    try {
      const el = await webflow.getSelectedElement();
      if (el && 'setTextContent' in el && typeof (el as any).setTextContent === 'function') {
        await (el as any).setTextContent(text);
      } else {
        await webflow.notify({ type: 'Error', message: 'Select an element that can contain text.' });
      }
    } catch (error) {
      handleApiError(error, 'Error setting text content');
    }
  }, []);

  const getAllStyles = useCallback(async (): Promise<WebflowStyle[]> => {
    try {
      const styles = await webflow.getAllStyles();
      return styles as unknown as WebflowStyle[];
    } catch (error) {
      handleApiError(error, 'Error fetching all styles');
      return [];
    }
  }, []);

  const getStylePropsByName = useCallback(async (styleName: string): Promise<Record<string, string | { variableId: string } | ColorVariable> | null> => {
    try {
      const style = await webflow.getStyleByName(styleName);
      const props = await style?.getProperties();
      return props as Record<string, string | { variableId: string } | ColorVariable>;
    } catch (error) {
      handleApiError(error, `Error fetching properties for ${styleName}`);
      return null;
    }
  }, []);

  const getStyleProperty = useCallback(async (
    styleName: string,
    property: string,
    options?: { breakpoint?: Breakpoint; pseudo?: Pseudo }
  ) => {
    try {
      const style = await webflow.getStyleByName(styleName);
      return style ? await style.getProperty(property as any, options) : null;
    } catch (error) {
      handleApiError(error, `Error getting property ${property}`);
      return null;
    }
  }, []);

  const setStyleProperty = useCallback(async (
    styleName: string,
    property: string,
    value: string | { variableId: string },
    options?: { breakpoint?: Breakpoint; pseudo?: Pseudo }
  ) => {
    try {
      const style = await webflow.getStyleByName(styleName);
      if (style) {
        await style.setProperty(property as any, value, options);
      }
    } catch (error) {
      handleApiError(error, `Error setting property ${property}`);
    }
  }, []);

  const removeStyleProperty = useCallback(async (
    styleName: string,
    property: string,
    options?: { breakpoint?: Breakpoint; pseudo?: Pseudo }
  ) => {
    try {
      const style = await webflow.getStyleByName(styleName);
      if (style) {
        await style.removeProperty(property as any, options);
      }
    } catch (error) {
      handleApiError(error, `Error removing property ${property}`);
    }
  }, []);

  const removeAllStyleProperties = useCallback(async (
    styleName: string,
    options?: { breakpoint?: Breakpoint; pseudo?: Pseudo }
  ) => {
    try {
      const style = await webflow.getStyleByName(styleName);
      if (!style) return;
      const props = await style.getProperties(options);
      const propKeys = Object.keys(props);
      await style.removeProperties(propKeys as any, options);
    } catch (error) {
      handleApiError(error, `Error removing all properties from ${styleName}`);
    }
  }, []);

  const removeStyleByName = useCallback(async (styleName: string) => {
    try {
      const style = await webflow.getStyleByName(styleName);
      if (style) await webflow.removeStyle(style);
    } catch (error) {
      handleApiError(error, `Error removing style ${styleName}`);
    }
  }, []);

  const createStyleWithProps = useCallback(async (
    styleName: string,
    props: Record<string, string>,
    options?: { breakpoint?: Breakpoint; pseudo?: Pseudo }
  ): Promise<WebflowStyle | null> => {
    try {
      const style = await webflow.createStyle(styleName);
      await style.setProperties(props as any, options);
      return style as unknown as WebflowStyle;
    } catch (error) {
      handleApiError(error, `Error creating style ${styleName}`);
      return null;
    }
  }, []);

  const applyStyleToSelected = useCallback(async (style: WebflowStyle) => {
    try {
      const el = await webflow.getSelectedElement();
      if (el && 'setStyles' in el && typeof (el as any).setStyles === 'function') {
        await (el as any).setStyles([style]);
      }
    } catch (error) {
      handleApiError(error, 'Error applying style to selected element');
    }
  }, []);

  const isComboClass = useCallback(async (styleName: string): Promise<boolean> => {
    try {
      const style = await webflow.getStyleByName(styleName);
      return !!(style && await style.isComboClass());
    } catch (error) {
      handleApiError(error, `Error checking if ${styleName} is a combo class`);
      return false;
    }
  }, []);

  return {
    BREAKPOINTS,
    PSEUDOS,
    canDesign,
    setExtensionSize,
    setTextOnSelectedElement,
    getAllStyles,
    getStylePropsByName,
    getStyleProperty,
    setStyleProperty,
    removeStyleProperty,
    removeAllStyleProperties,
    removeStyleByName,
    createStyleWithProps,
    applyStyleToSelected,
    isComboClass,
  };
}
