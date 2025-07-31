// src/context/CapabilitiesContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface Capabilities {
  hasComponents: boolean;
  hasStyles: boolean;
  hasElements: boolean;
  isLoading: boolean;
}

const initialCapabilities: Capabilities = {
  hasComponents: false,
  hasStyles: false,
  hasElements: false,
  isLoading: true
};

// Create the context with the initial value
const CapabilitiesContext = createContext<Capabilities>(initialCapabilities);

// Hook to use the context
export const useCapabilities = () => useContext(CapabilitiesContext);

// Define the CapabilitiesProvider props
interface CapabilitiesProviderProps {
  children: ReactNode;
}

// Create the provider component
export const CapabilitiesProvider: React.FC<CapabilitiesProviderProps> = ({ children }) => {
  const [capabilities, setCapabilities] = useState<Capabilities>(initialCapabilities);

  useEffect(() => {
    const checkCapabilities = () => {
      // Check if webflow object exists
      if (typeof webflow === 'undefined') {
        console.error('Webflow object is not defined');
        setCapabilities({
          ...initialCapabilities,
          isLoading: false
        });
        return;
      }

      // Get available methods
      const methods = Object.getOwnPropertyNames(webflow);
      
      // Update capabilities based on available methods
      setCapabilities({
        hasComponents: methods.includes('getAllComponents'),
        hasStyles: methods.includes('getAllStyles'),
        hasElements: methods.includes('getAllElements'),
        isLoading: false
      });
      
      console.log('Webflow API Capabilities:', {
        hasComponents: methods.includes('getAllComponents'),
        hasStyles: methods.includes('getAllStyles'),
        hasElements: methods.includes('getAllElements'),
      });
    };

    // Check capabilities after a small delay to ensure API is loaded
    const timer = setTimeout(checkCapabilities, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CapabilitiesContext.Provider value={capabilities}>
      {children}
    </CapabilitiesContext.Provider>
  );
};