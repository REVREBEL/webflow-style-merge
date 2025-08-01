export function useDevTools({ setHasClickedFetch }: { setHasClickedFetch: (value: boolean) => void }) {
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

  const getStorageItems = (storage: Storage): Record<string, string> => {
    return Object.keys(storage).reduce((acc, key) => {
      acc[key] = storage.getItem(key) || "";
      return acc;
    }, {} as Record<string, string>);
  };

  const logStorage = () => {
    // Log with better formatting
    console.group("Storage Contents");
    console.log("Local Storage:", getStorageItems(localStorage));
    console.log("Session Storage:", getStorageItems(sessionStorage));
    console.groupEnd();
  };

  return {
    clearSession: clearEverything,
    logStorage,
  };
}
