import { useState, useEffect, useCallback } from 'react';
import type { Site } from '@/types/webflow-designer-extensions';


export function useSites(shouldFetch: boolean = true) {
  const [sites, setSites] = useState<Site[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSites = useCallback(async () => {
    // Skip if we shouldn't fetch yet
    if (!shouldFetch) return;
    
    setIsLoading(true);
    setIsError(false);
    setError(null);
    
    try {
      // Using mock data since we're removing authentication
      // In a real implementation, you might fetch from an unauthenticated API endpoint
      const mockSites: Site[] = [
        { id: '1', displayName: 'Example Site 1', createdOn: new Date().toISOString(), lastUpdated: new Date().toISOString(), lastPublished: new Date().toISOString() },
        { id: '2', displayName: 'Example Site 2', createdOn: new Date().toISOString(), lastUpdated: new Date().toISOString(), lastPublished: new Date().toISOString() },
        { id: '3', displayName: 'Example Site 3', createdOn: new Date().toISOString(), lastUpdated: new Date().toISOString(), lastPublished: new Date().toISOString() },
      ];
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSites(mockSites);
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [shouldFetch]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  return { sites, isLoading, isError, error, fetchSites };
}