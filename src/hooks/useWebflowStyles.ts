// hooks/useWebflowStyles.ts

import { useCallback } from 'react';

// Optional: export for reuse elsewhere
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

export function useWebflowStyles() {
  // Capabilities
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

  // Element
  const setTextOnSelectedElement = useCallback(async (text: string) => {
    try {
      const el = await webflow.getSelectedElement();
      if (el?.setTextContent) {
        await el.setTextContent(text);
      } else {
        await webflow.notify({ type: 'Error', message: 'Select an element that can contain text.' });
      }
    } catch (error) {
      handleApiError(error, 'Error setting text content');
    }
  }, []);

  // Style Operations
  const getAllStyles = useCallback(async () => {
    try {
      return await webflow.getAllStyles();
    } catch (error) {
      handleApiError(error, 'Error fetching all styles');
      return [];
    }
  }, []);

  const getStylePropsByName = useCallback(async (styleName: string) => {
    try {
      const style = await webflow.getStyleByName(styleName);
      return style ? await style.getProperties() : null;
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
      if (style) {
        const props = await style.getProperties();
        await style.removeProperties(props, options);
      }
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
  ) => {
    try {
      const style = await webflow.createStyle(styleName);
      await style.setProperties(props, options);
      return style;
    } catch (error) {
      handleApiError(error, `Error creating style ${styleName}`);
      return null;
    }
  }, []);

  const applyStyleToSelected = useCallback(async (style: Style) => {
    try {
      const el = await webflow.getSelectedElement();
      if (el?.setStyles) {
        await el.setStyles([style]);
      }
    } catch (error) {
      handleApiError(error, 'Error applying style to selected element');
    }
  }, []);

  const isComboClass = useCallback(async (styleName: string) => {
    try {
      const style = await webflow.getStyleByName(styleName);
      return style ? await style.isComboClass() : false;
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
