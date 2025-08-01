import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customCodeApi } from "../../services/customCode";
import { CustomCode } from "../../types/types";
import { getApplicationStatusKey } from "./useApplicationStatus";

interface ScriptQueryParams {
  siteId: string;
}

/**
 * Hook for managing script selection and application in the custom code interface
 * Provides functionality to select, fetch, and apply scripts to sites or pages
 *
 * @returns {Object} Object containing:
 *   - selectedScript: Currently selected script
 *   - registeredScripts: Array of available scripts
 *   - isLoading: Loading state for async operations
 *   - selectScript: Function to select a script
 *   - fetchScripts: Function to fetch available scripts
 *   - applyScript: Function to apply selected script to target
 */
export function useScriptSelection() {
  const [selectedScript, setSelectedScript] = useState<CustomCode | null>(null);
  const [queryParams, setQueryParams] = useState<ScriptQueryParams | null>(
    null
  );
  const queryClient = useQueryClient();

  /**
   * Updates the currently selected script
   * @param script - The script to select
   */
  const selectScript = useCallback((script: CustomCode) => {
    setSelectedScript(script);
  }, []);

  /**
   * Query for fetching available scripts
   */
  const { data: registeredScripts = [], isLoading: isLoadingScripts } =
    useQuery({
      queryKey: ["scripts", queryParams?.siteId],
      queryFn: async ({ queryKey }) => {
        const [, siteId] = queryKey;
        if (typeof siteId !== "string") {
          // This path is unreachable due to the `enabled` flag, but adds type safety
          return [];
        }
        const response = await customCodeApi.getScripts(siteId);
        return response.registeredScripts || [];
      },
      enabled: Boolean(queryParams), // Only fetch when we have params
    });

  /**
   * Mutation for applying scripts
   */
  const { mutateAsync: applyScript, isPending: isApplying } = useMutation({
    mutationFn: async ({
      targetType,
      targetId,
      location,
    }: {
      targetType: "site" | "page";
      targetId: string | string[];
      location: "header" | "footer";
    }) => {
      if (!selectedScript?.id) return;

      // For optimistic updates
      const updateKey = getApplicationStatusKey(
        selectedScript.id,
        queryParams?.siteId,
        Array.isArray(targetId) ? targetId : [targetId]
      );

      try {
        if (Array.isArray(targetId)) {
          // Apply to each page with a small delay to avoid rate limits
          for (const id of targetId) {
            await customCodeApi.applyScript({
              scriptId: selectedScript.id,
              targetType: "page",
              targetId: id,
              location,
              version: selectedScript.version,
            });
            // Small delay between requests
            if (targetId.length > 1) {
              await new Promise((resolve) => setTimeout(resolve, 100));
            }
          }
        } else {
          await customCodeApi.applyScript({
            scriptId: selectedScript.id,
            targetType,
            targetId,
            location,
            version: selectedScript.version,
          });
        }

        // Wait a moment for the changes to propagate
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Force a fresh fetch of the application status
        await queryClient.refetchQueries({
          queryKey: updateKey,
          exact: true,
          type: "active",
        });
      } catch (error) {
        console.error("Error applying script:", error);
        throw error;
      }
    },
  });

  /**
   * Wrapper function to fetch scripts with required parameters
   */
  const fetchScripts = useCallback(async (siteId: string) => {
    setQueryParams({ siteId });
  }, []);

  return {
    selectedScript,
    registeredScripts,
    isLoading: isLoadingScripts || isApplying,
    selectScript,
    fetchScripts,
    applyScript,
  };
}
