/**
 * @file Webflow API Utilities for Designer Extensions
 * This module provides a suite of helper functions for working with styles, breakpoints, and design context
 * in the Webflow Designer Extension environment.
 */

// Breakpoint IDs and pseudo-classes
export const BREAKPOINTS = ['xxl', 'xl', 'large', 'main', 'medium', 'small', 'tiny'] as const;
export const PSEUDOS = [
  'noPseudo', 'nth-child(odd)', 'nth-child(even)', 'first-child', 'last-child',
  'hover', 'active', 'pressed', 'visited', 'focus', 'focus-visible',
  'focus-within', 'placeholder', 'empty', 'before', 'after'
] as const;

type Breakpoint = typeof BREAKPOINTS[number];
type Pseudo = typeof PSEUDOS[number];

// =====================================
// Error Handling
// =====================================

/**
 * Displays and logs API error feedback in the Webflow Designer.
 * @param {any} error - The thrown error
 * @param {string} contextMessage - Context to prefix log output
 */
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

// =====================================
// Design Mode Utilities
// =====================================

/**
 * Checks if the current user has design capabilities.
 * @returns {Promise<boolean>}
 */
export const canDesign = async (): Promise<boolean> => {
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
};

/**
 * Sets the extension popup size in the Webflow Designer.
 * @param {'default' | 'comfortable' | 'large' | { width: number, height: number }} size
 */
export const setExtensionSize = async (
  size: 'default' | 'comfortable' | 'large' | { width: number; height: number }
): Promise<void> => {
  try {
    await webflow.setExtensionSize(size);
    console.log('Extension size set to:', size);
  } catch (error) {
    handleApiError(error, 'Error setting extension size:');
  }
};

// =====================================
// Element Editing
// =====================================

/**
 * Sets the text content on the selected element.
 * @param {string} text
 */
export const setTextOnSelectedElement = async (text: string): Promise<void> => {
  try {
    const el = await webflow.getSelectedElement();
    if (el && typeof el.setTextContent === 'function') {
      await el.setTextContent(text);
    } else {
      await webflow.notify({
        type: 'Error',
        message: 'Select an element that can contain text.',
      });
    }
  } catch (error) {
    handleApiError(error, `Error setting text: "${text}"`);
  }
};

// =====================================
// Style Utilities
// =====================================

/**
 * Returns all styles defined in the Webflow project.
 * @returns {Promise<Style[]>}
 */
export const getAllStyles = async (): Promise<Style[]> => {
  try {
    return await webflow.getAllStyles();
  } catch (error) {
    handleApiError(error, 'Error fetching all styles');
    return [];
  }
};

/**
 * Retrieves a style object and its properties by name.
 * @param {string} styleName
 * @returns {Promise<Record<string, string> | null>}
 */
export const getStylePropsByName = async (styleName: string): Promise<Record<string, string> | null> => {
  try {
    const style = await webflow.getStyleByName(styleName);
    if (!style) return null;
    return await style.getProperties();
  } catch (error) {
    handleApiError(error, `Error getting properties for "${styleName}"`);
    return null;
  }
};

/**
 * Retrieves a specific style property from a style.
 * @param {string} styleName
 * @param {string} property
 * @param {{ breakpoint?: Breakpoint, pseudo?: Pseudo }} [options]
 * @returns {Promise<any>}
 */
export const getStyleProperty = async (
  styleName: string,
  property: string,
  options?: { breakpoint?: Breakpoint; pseudo?: Pseudo }
): Promise<any | null> => {
  try {
    const style = await webflow.getStyleByName(styleName);
    if (!style) return null;
    return await style.getProperty(property as any, options);
  } catch (error) {
    handleApiError(error, `Error getting property "${property}"`);
    return null;
  }
};

/**
 * Sets a property on a style.
 * @param {string} styleName
 * @param {string} property
 * @param {string | { variableId: string }} value
 * @param {{ breakpoint?: Breakpoint, pseudo?: Pseudo }} [options]
 */
export const setStyleProperty = async (
  styleName: string,
  property: string,
  value: string | { variableId: string },
  options?: { breakpoint?: Breakpoint; pseudo?: Pseudo }
): Promise<void> => {
  try {
    const style = await webflow.getStyleByName(styleName);
    if (!style) return;
    await style.setProperty(property as any, value, options);
  } catch (error) {
    handleApiError(error, `Error setting "${property}" on "${styleName}"`);
  }
};

/**
 * Creates a style and sets multiple properties.
 * @param {string} styleName
 * @param {Record<string, string>} props
 * @param {{ breakpoint?: Breakpoint, pseudo?: Pseudo }} [options]
 */
export const createStyleWithProps = async (
  styleName: string,
  props: Record<string, string>,
  options?: { breakpoint?: Breakpoint; pseudo?: Pseudo }
): Promise<any | null> => {
  try {
    const style = await webflow.createStyle(styleName);
    await style.setProperties(props, options);
    return style;
  } catch (error) {
    handleApiError(error, `Error creating style "${styleName}"`);
    return null;
  }
};

/**
 * Applies a style to the selected element.
 * @param {Style} style
 */
export const applyStyleToSelected = async (style: Style): Promise<void> => {
  try {
    const element = await webflow.getSelectedElement();
    if (element?.setStyles) {
      await element.setStyles([style]);
    }
  } catch (error) {
    handleApiError(error, 'Error applying style to element');
  }
};

/**
 * Removes all properties from a style.
 * @param {string} styleName
 * @param {{ breakpoint?: Breakpoint, pseudo?: Pseudo }} [options]
 */
export const removeAllStyleProperties = async (
  styleName: string,
  options?: { breakpoint?: Breakpoint; pseudo?: Pseudo }
): Promise<void> => {
  try {
    const style = await webflow.getStyleByName(styleName);
    if (!style) return;
    const properties = await style.getProperties();
    await style.removeProperties(properties, options);
  } catch (error) {
    handleApiError(error, `Error removing all properties from "${styleName}"`);
  }
};

/**
 * Removes a single style property.
 * @param {string} styleName
 * @param {string} property
 * @param {{ breakpoint?: Breakpoint, pseudo?: Pseudo }} [options]
 */
export const removeStyleProperty = async (
  styleName: string,
  property: string,
  options?: { breakpoint?: Breakpoint; pseudo?: Pseudo }
): Promise<void> => {
  try {
    const style = await webflow.getStyleByName(styleName);
    if (!style) return;
    await style.removeProperty(property as any, options);
  } catch (error) {
    handleApiError(error, `Error removing "${property}" from "${styleName}"`);
  }
};

/**
 * Removes a style completely by name.
 * @param {string} styleName
 */
export const removeStyleByName = async (styleName: string): Promise<void> => {
  try {
    const style = await webflow.getStyleByName(styleName);
    if (style) await webflow.removeStyle(style);
  } catch (error) {
    handleApiError(error, `Error removing style "${styleName}"`);
  }
};

/**
 * Checks if the style is a combo class.
 * @param {string} styleName
 * @returns {Promise<boolean>}
 */
export const isComboClass = async (styleName: string): Promise<boolean> => {
  try {
    const style = await webflow.getStyleByName(styleName);
    return style ? await style.isComboClass() : false;
  } catch (error) {
    handleApiError(error, `Error checking combo class status for "${styleName}"`);
    return false;
  }
};
