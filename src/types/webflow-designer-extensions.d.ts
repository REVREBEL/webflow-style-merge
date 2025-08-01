
// src/types/webflow-designer-extensions.d.ts


export interface Component {
  id: string;
  getName(): Promise<string>;
  getRootElement(): Promise<AnyElement | null>;
}

export interface ComponentInstance {
  type: 'ComponentInstance';
  id: string;
  getComponent(): Promise<Component>;
}

export type AnyElement = {
  id: string;
  type: string;
} & Record<string, unknown>;


export interface Style {
  id: string;
  getName(): Promise<string>;
  getElements?: () => Promise<AnyElement[]>;
  removeAllProperties?: () => Promise<void>;
  getProperties(options?: BreakpointAndPseudo): Promise<Record<string, string | { variableId: string } | ColorVariable>>;
  getProperty(prop: string, options?: BreakpointAndPseudo): Promise<string | { variableId: string } | null>;

  setProperties(
    props: Record<string, string | { variableId: string }>,
    options?: BreakpointAndPseudo
  ): Promise<null>; 

  setProperty(
    prop: string,
    value: string | { variableId: string },
    options?: BreakpointAndPseudo
  ): Promise<void>;

  removeProperties(props: string[], options?: BreakpointAndPseudo): Promise<void>;
  removeProperty(prop: string, options?: BreakpointAndPseudo): Promise<void>;
  isComboClass(): Promise<boolean>;
}



export interface WebflowDesignerAPI {
  getAllComponents(): Promise<Component[]>;
  getAllElements(): Promise<AnyElement[]>;
  enterComponent(instance: ComponentInstance): Promise<null>;
  exitComponent(): Promise<null>;
  notify(options: { type: 'Error' | 'Success' | 'Info' | 'Warning', message: string }): Promise<void>;

  // Additions for completeness (if calling from root instead of per-style):
  getAllStyles(): Promise<Style[]>;
  getStyleByName(styleName: string): Promise<Style | null>;
  createStyle(name: string): Promise<Style>;
  removeStyle(styleId: string): Promise<void>;

  getSelectedElement(): Promise<AnyElement | null>;
  setExtensionSize(size: 'default' | 'comfortable' | 'large' | { width: number; height: number }): Promise<void>;
  canForAppMode(modes: string[]): Promise<{ canDesign: boolean; canEdit: boolean }>;

  appModes: {
    canDesign: string;
    canEdit: string;
  };
}

export interface WebflowStyleService {
  getStyleProperty(
    styleName: string,
    property: string,
    options?: BreakpointAndPseudo
  ): Promise<string | { variableId: string } | ColorVariable | null>;

  setStyleProperty(
    styleName: string,
    property: string,
    value: string | { variableId: string },
    options?: BreakpointAndPseudo
  ): Promise<void>;

  removeStyleProperty(
    styleName: string,
    property: string,
    options?: BreakpointAndPseudo
  ): Promise<void>;

  removeAllStyleProperties(
    styleName: string,
    options?: BreakpointAndPseudo
  ): Promise<void>;



  isComboClass(styleName: string): Promise<boolean>;



  getStylePropsByName(styleName: string): Promise<Record<string, string> | null>;

  removeStyleByName(styleName: string): Promise<void>;

  canDesign(): Promise<boolean>;

  setExtensionSize(size: 'default' | 'comfortable' | 'large' | { width: number; height: number }): Promise<void>;

  setTextOnSelectedElement(text: string): Promise<void>;
}

export interface ColorVariable {
  r: number;
  g: number;
  b: number;
  a?: number;
  type: 'ColorVariable';
}


export interface BreakpointAndPseudo {
  breakpointId?: BreakpointId;
  pseudo?: PseudoClass;
}

export type BreakpointId = 'xxl' | 'xl' | 'large' | 'main' | 'medium' | 'small' | 'tiny';

export type PseudoClass =
  | 'noPseudo'
  | 'nth-child(odd)'
  | 'nth-child(even)'
  | 'first-child'
  | 'last-child'
  | 'hover'
  | 'active'
  | 'pressed'
  | 'visited'
  | 'focus'
  | 'focus-visible'
  | 'focus-within'
  | 'placeholder'
  | 'empty'
  | 'before'
  | 'after';


//export declare global {
//  const webflow: WebflowDesignerAPI;
//}

export type PseudoStateKey =
  | "noPseudo"
  | "nth-child(odd)"
  | "nth-child(even)"
  | "first-child"
  | "last-child"
  | "hover"
  | "active"
  | "pressed"
  | "visited"
  | "focus"
  | "focus-visible"
  | "focus-within"
  | "placeholder"
  | "empty"
  | "before"
  | "after";

export interface BreakpointAndPseudo {
  breakpoint?: BreakpointId;
  pseudo?: PseudoStateKey;
}

// Site Types
export interface Site {
  id: string;
  displayName: string;
  createdOn: string;
  lastUpdated: string;
  lastPublished: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

// Custom Code Types
export type ScriptLocation = "header" | "footer";
export type ScriptTargetType = "site" | "page";

/**
 * Data required to register a new script
 * @property {string} sourceCode - An in-line script's source code
 * @property {string} displayName - Display name for the script
 * @property {string} version - Version of the script
 * @property {string} [hostedLocation] - URL for hosted scripts
 */
export interface ScriptData {
  sourceCode?: string;
  displayName: string;
  version: string;
  hostedLocation?: string;
}

/**
 * Request payload for script registration
 * @property {string} siteId - ID of the target Webflow site
 * @property {boolean} isHosted - Whether the script is hosted externally
 * @property {ScriptData} scriptData - The script data to register
 */
export interface ScriptRegistrationRequest {
  siteId: string;
  isHosted: boolean;
  scriptData: ScriptData;
}

/**
 * Represents a registered script in the system
 * @property {string} id - The unique identifier for the script
 * @property {string} displayName - The display name for the script
 * @property {string} hostedLocation - The URL where the script is hosted
 * @property {string} sourceCode - The source code for inline scripts
 * @property {string} version - The version of the script
 * @property {string} createdOn - The date and time when the script was created
 * @property {string} lastUpdated - The date and time when the script was last updated
 */
export interface CustomCode {
  id?: string;
  displayName: string;
  hostedLocation?: string;
  sourceCode?: string;
  version: string;
  createdOn?: string;
  lastUpdated?: string;
}

/**
 * Represents a script application to a specific target (site/page)
 * @property {string} scriptId - The unique identifier for the script
 * @property {ScriptTargetType} targetType - The type of target (site/page)
 * @property {string} targetId - The ID of the target (site/page)
 * @property {string} appliedAt - The date and time when the script was applied
 * @property {string} version - The version of the script
 */
export interface CodeApplication {
  scriptId: string;
  targetType: ScriptTargetType;
  targetId: string;
  appliedAt?: string;
  version: string;
  location: ScriptLocation;
}

/**
 * Interface for tracking script application status per target (site/page)
 * @property {boolean} isApplied - Whether the script is applied to this target
 * @property {ScriptLocation} location - Where the script is applied
 */
export interface ApplicationStatus {
  [pageId: string]: {
    isApplied: boolean;
    location?: "header" | "footer";
  };
}

/**
 * Interface for Webflow's script status response
 * Represents the structure of script data returned from Webflow's API
 * @property {Object} location - The placement of the script
 */
export interface ScriptStatus {
  [scriptId: string]: { location: ScriptLocation };
}

// Environment Variables Type
export interface ImportMetaEnv {
  VITE_NEXTJS_API_URL: string;
  // Add other env variables as needed
}
