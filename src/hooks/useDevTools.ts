import { API_BASE_URL } from "../config";

export function useDevTools() {
  const clearEverything = async () => {
    try {
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();

      // Make the API call
      const response = await fetch(`${API_BASE_URL}/api/dev/clear`, { method: "POST" });

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
