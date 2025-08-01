const base_url = import.meta.env.VITE_NEXTJS_API_URL;
import { ScriptRegistrationRequest, CodeApplication } from "../../types/types";

export const customCodeApi = {
  // Register a new script
  registerScript: async (params: ScriptRegistrationRequest) => {
    const response = await fetch(`${base_url}/api/custom-code/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return response.json();
  },

  // Get list of registered scripts
  getScripts: async (siteId: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/register?siteId=${siteId}`
    );
    return response.json();
  },

  // Apply script to site or page
  applyScript: async (params: CodeApplication) => {
    const response = await fetch(`${base_url}/api/custom-code/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    console.log(params);
    return response.json();
  },

  // Get status for site
  getSiteStatus: async (siteId: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/status?targetType=site&targetId=${siteId}`
    );
    return response.json();
  },

  // Get status for pages
  getPagesStatus: async (pageIds: string[]) => {
    const response = await fetch(
      `${base_url}/api/custom-code/status?targetType=page&targetIds=${pageIds.join(
        ","
      )}`
    );
    return response.json();
  },

  // Get batch status request
  getBatchStatus: async (
    siteId: string,
    pageIds: string[] = []
  ) => {
    try {
      // Validate siteId
      if (!siteId || siteId === "page") {
        console.warn("Invalid siteId provided to getBatchStatus:", siteId);
        return {};
      }

      // If no pageIds provided, just get site status
      if (!pageIds || pageIds.length === 0) {
        const siteStatus = await customCodeApi.getSiteStatus(siteId);
        return siteStatus.result || {};
      }

      const batchSize = 5;
      const pagesBatches = [];

      for (let i = 0; i < pageIds.length; i += batchSize) {
        pagesBatches.push(pageIds.slice(i, i + batchSize));
      }

      // Get site status
      const siteStatus = await customCodeApi.getSiteStatus(siteId);

      // Get pages status in batches
      const pagesStatus = { result: {} };
      for (const batch of pagesBatches) {
        const batchStatus = await customCodeApi.getPagesStatus(batch);
        pagesStatus.result = { ...pagesStatus.result, ...batchStatus.result };
      }

      return {
        ...siteStatus.result,
        ...pagesStatus.result,
      };
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