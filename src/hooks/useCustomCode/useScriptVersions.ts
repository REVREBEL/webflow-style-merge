import { useState, useCallback } from "react";
import { API_BASE_URL } from "@/config";

export function useScriptVersions() {
  const [versions, setVersions] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchVersions = useCallback(
    async (scriptId: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/custom-code/versions/${scriptId}`);
        const { versions: scriptVersions } = await response.json();

        setVersions((prev) => ({
          ...prev,
          [scriptId]: scriptVersions,
        }));

        return scriptVersions;
      } catch (error) {
        console.error("Error fetching versions:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    versions,
    isLoading,
    fetchVersions,
  };
}
