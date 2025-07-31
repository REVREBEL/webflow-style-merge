// src/typings/webflow.d.ts

declare global {
  const webflow: {
    getStyleByName(name: string): Promise<Style | null>;
    removeStyle(style: Style): Promise<void>;
    styles: {
      list(): Promise<Style[]>;
    }
  };

  interface Style {
    id: string;
    name: string;
    getProperties(): Promise<Record<string, unknown>>;
    getElements(): Promise<Element[]>;
    removeAllProperties(): Promise<void>;
  }

  interface Element {
    addStyle(style: Style): Promise<void>;
    removeStyle(style: Style): Promise<void>;
  }
}

export {};