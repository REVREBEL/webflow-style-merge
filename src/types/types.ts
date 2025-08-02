/**
 * @file types.ts
 * @description Centralized type definitions for the application.
 */

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

export interface ScriptData {
  sourceCode?: string;
  displayName: string;
  version: string;
  hostedLocation?: string;
}

export interface ScriptRegistrationRequest {
  siteId: string;
  isHosted: boolean;
  scriptData: ScriptData;
}

export interface CustomCode {
  id?: string;
  displayName: string;
  hostedLocation?: string;
  sourceCode?: string;
  version: string;
  createdOn?: string;
  lastUpdated?: string;
}

export interface CodeApplication {
  scriptId: string;
  targetType: ScriptTargetType;
  targetId: string;
  appliedAt?: string;
  version: string;
  location: ScriptLocation;
}

export interface ApplicationStatus {
  [pageId: string]: {
    isApplied: boolean;
    location?: "header" | "footer";
  };
}

export interface ScriptStatus {
  [scriptId:string]: { location: ScriptLocation };
}

// Environment Variables Type
export interface ImportMetaEnv {
  VITE_NEXTJS_API_URL: string;
}