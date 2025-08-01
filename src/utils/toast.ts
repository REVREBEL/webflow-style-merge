// In src/utils/toast.ts

import { toast, ToastOptions } from 'react-toastify';

// Default configuration for toasts
const defaultOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Helper functions for different toast types
export const showSuccess = (message: string, options?: ToastOptions) => {
  return toast.success(message, { ...defaultOptions, ...options });
};

export const showError = (message: string, options?: ToastOptions) => {
  return toast.error(message, { ...defaultOptions, ...options });
};

export const showInfo = (message: string, options?: ToastOptions) => {
  return toast.info(message, { ...defaultOptions, ...options });
};

export const showWarning = (message: string, options?: ToastOptions) => {
  return toast.warning(message, { ...defaultOptions, ...options });
};

export { toast };