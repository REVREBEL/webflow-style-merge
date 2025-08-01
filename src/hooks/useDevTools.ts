interface UseDevToolsProps {
  logout: () => void;
  setHasClickedFetch?: (value: boolean) => void;
}

export function DevTools({ setHasClickedFetch }: { setHasClickedFetch: (value: boolean) => void }) {
  const clearEverything = async () => {
    try {

      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();

      // Reset React state
      setHasClickedFetch?.(false);

      // Make the API call
      const base_url = import.meta.env.VITE_NEXTJS_API_URL;
      const response = await fetch(`${base_url}/api/dev/clear`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to clear database");
      console.log("Everything cleared successfully");
      return true;
      
    } catch (error) {
      console.error("Error clearing everything:", error);
      return false;
    }
  };

  const logStorage = () => {
    // Create objects to store all storage items
    const localStorageItems: Record<string, string> = {};
    const sessionStorageItems: Record<string, string> = {};

    // Get all localStorage items
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        localStorageItems[key] = localStorage.getItem(key) || "";
      }
    }

    // Get all sessionStorage items
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        sessionStorageItems[key] = sessionStorage.getItem(key) || "";
      }
    }

    // Log with better formatting
    console.group("Storage Contents");
    console.log("Local Storage:", localStorageItems);
    console.log("Session Storage:", sessionStorageItems);
    console.groupEnd();

    // Log with better formatting
    console.group("Storage Contents");
    console.log("Local Storage:", localStorageItems);
    console.log("Session Storage:", sessionStorageItems);
    console.groupEnd();
  };

  return {
    clearSession: clearEverything,
    logStorage,
  };
}
