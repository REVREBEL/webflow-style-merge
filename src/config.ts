/**
 * @file config.ts
 * @description Centralized configuration for the application.
 */

console.log('process.env:', process.env);
console.log('VITE_NEXTJS_API_URL:', process.env.VITE_NEXTJS_API_URL);

export const API_BASE_URL = process.env.VITE_NEXTJS_API_URL || "http://localhost:3000";