import { ScriptRegistrationRequest, CodeApplication } from "../../types/types";
import { API_BASE_URL } from "@/config";



async function fetchApi(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
  }
  return response.json();
}
console.log("API Response:", JSON.stringify(Response));

export const customCodeApi = {
  // Register a new script
  registerScript: async (params: ScriptRegistrationRequest) => {
    return fetchApi(`${API_BASE_URL}/api/custom-code/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  },

  // Get list of registered scripts
  getScripts: async (siteId: string) => {
    return fetchApi(`${API_BASE_URL}/api/custom-code/register?siteId=${siteId}`);
  },

  // Apply script to site or page
  applyScript: async (params: CodeApplication) => {
    return fetchApi(`${API_BASE_URL}/api/custom-code/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),

    });
  },



  // Get status for site
  getSiteStatus: async (siteId: string) => {
    return fetchApi(
      `${API_BASE_URL}/api/custom-code/status?targetType=site&targetId=${siteId}`
    );
  },

  // Get status for pages
  getPagesStatus: async (pageIds: string[]) => {
    return fetchApi(
      `${API_BASE_URL}/api/custom-code/status?targetType=page&targetIds=${pageIds.join(
        ","
      )}`
    );
  },


  // Get batch status request
  getBatchStatus: async (
    siteId: string,
    pageIds: string[] = []
  ): Promise<Record<string, unknown>> => {
    try {
      // Validate siteId
      if (!siteId || siteId === "page") {
        console.warn("Invalid siteId provided to getBatchStatus:", siteId);
        return {};
      }

      // Fetch site status once
      const siteStatusResponse = await fetchApi(
        `${API_BASE_URL}/api/custom-code/status?targetType=site&targetId=${siteId}`
      );
      const combinedStatus = siteStatusResponse.result || {};

      // If no pageIds provided, just get site status
      if (!pageIds || pageIds.length === 0) {
        return combinedStatus;
      }

      const batchSize = 5;
      for (let i = 0; i < pageIds.length; i += batchSize) {
        const batch = pageIds.slice(i, i + batchSize);
        const batchStatus = await fetchApi(
          `${API_BASE_URL}/api/custom-code/status?targetType=page&targetIds=${batch.join(
            ","
          )}`
        );
        Object.assign(combinedStatus, batchStatus.result);
      }
      console.log("API Log:",JSON.stringify(combinedStatus));
      return combinedStatus;
    } catch (error) {
      console.error(
        "Error in getBatchStatus:",
        { siteId, pageIdsLength: pageIds?.length },
        error
      );
      return {};
    }

  },
};