import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box
} from "@mui/material";
// Replace the useAuth import
// import { useAuth } from "../../../hooks/useAuth";
// You can remove this import completely, or use our mock version

interface Site {
  id: string;
  name: string;
  // Add other site properties as needed
}

export function SiteTab() {
  const [sites, setSites] = useState<Site[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Replace the useAuth hook usage
  // const { sessionToken } = useAuth();
  const sessionToken = "mock-session-token"; // Use a mock token instead

  useEffect(() => {
    // Your existing code for fetching sites, but remove any auth dependencies
    // Example:
    const fetchSites = async () => {
      setIsLoading(true);
      try {
        // Modify your API call to work without real authentication
        // const response = await fetch('/api/sites', {
        //   headers: { Authorization: `Bearer ${sessionToken}` }
        // });
        // const data = await response.json();
        // setSites(data);
        
        // For now, just use mock data
        setSites([
          { id: '1', name: 'My Portfolio' },
          { id: '2', name: 'Client Website' },
          { id: '3', name: 'Blog' }
        ]);
      } catch (err) {
        setError("Failed to fetch sites");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSites();
  }, [sessionToken]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sites.map((site) => (
            <TableRow key={site.id}>
              <TableCell>{site.name}</TableCell>
              <TableCell>
                {/* Your action buttons */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}