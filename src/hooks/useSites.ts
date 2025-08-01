import { useState, useEffect } from 'react';

export interface Site {
  id: string;
  name: string;
  // Add other site properties as needed
}

export function useSites(shouldFetch: boolean = true) {
  const [sites, setSites] = useState<Site[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSites = async () => {
    // Skip if we shouldn't fetch yet
    if (!shouldFetch) return;
    
    setIsLoading(true);
    setIsError(false);
    setError(null);
    
    try {
      // Using mock data since we're removing authentication
      // In a real implementation, you might fetch from an unauthenticated API endpoint
      const mockSites: Site[] = [
        { id: '1', name: 'Example Site 1' },
        { id: '2', name: 'Example Site 2' },
        { id: '3', name: 'Example Site 3' },
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
  };

  useEffect(() => {
    fetchSites();
  }, [shouldFetch]);

  return { sites, isLoading, isError, error, fetchSites };
}