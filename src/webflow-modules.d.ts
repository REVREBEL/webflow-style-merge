import React from 'react';

/**
 * This declaration file informs TypeScript about the "virtual" modules
 * that are provided by the Webflow CLI at runtime. This will resolve the
 * "Cannot find module" errors in your editor without needing to
 * install them via npm.
 */

type UIComponentProps = {
  children?: React.ReactNode;
  [key: string]: any;
};

declare module '@webflow/designer-extension-ui' {
  export const Box: React.FC<UIComponentProps>;
  export const Button: React.FC<UIComponentProps>;
  export const Heading: React.FC<UIComponentProps>;
  export const Text: React.FC<UIComponentProps>;
  export const Stack: React.FC<UIComponentProps>;
  export const Accordion: React.FC<UIComponentProps>;
  export const AccordionItem: React.FC<UIComponentProps>;
  export const AccordionButton: React.FC<UIComponentProps>;
  export const AccordionPanel: React.FC<UIComponentProps>;
  export const Alert: React.FC<UIComponentProps>;
  export const AlertIcon: React.FC<UIComponentProps>;
  export const Spinner: React.FC<UIComponentProps>;
  export const Badge: React.FC<UIComponentProps>;
  export const DesignerExtensionUI: React.FC<{ children: React.ReactNode }>;
}

declare module '@webflow/designer-extension-hooks' {
  export function useCommand(
    command: string
  ): {
    execute: (payload: any) => Promise<any>;
  };
}

