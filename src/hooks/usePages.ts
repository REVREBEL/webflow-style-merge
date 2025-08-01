
import { useQuery } from "@tanstack/react-query";

interface PageData {
  id: string;
  name: string;
  url: string;
}

interface WebflowPage {
  id: string;
  getName: () => Promise<string>;
  getSlug: () => Promise<string | undefined>;
}


/**
 * Custom hook for fetching pages from Webflow
 * Uses React Query for efficient caching and state management
 */
export function usePages(siteId: string | undefined) {
  return useQuery({
    queryKey: ["pages", siteId],
    queryFn: async (): Promise<PageData[]> => {
      if (!siteId) return [];

      const pagesData: WebflowPage[] = await webflow.getAllPagesAndFolders();
      return Promise.all(
        pagesData.map(async (page: WebflowPage) => ({
          id: page.id,
          name: await page.getName(),
          url: (await page.getSlug()) || "",
        }))
      );
    },
    enabled: Boolean(siteId),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}