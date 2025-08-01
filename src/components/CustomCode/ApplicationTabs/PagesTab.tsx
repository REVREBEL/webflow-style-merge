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

interface Page {
  id: string;
  name: string;
  url: string;
  // Add other page properties as needed
}

export function PagesTab() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Replace the useAuth hook usage
  // const { sessionToken } = useAuth();
  const sessionToken = "mock-session-token"; // Use a mock token instead

  useEffect(() => {
    // Your existing code for fetching pages, but remove any auth dependencies
    // Example:
    const fetchPages = async () => {
      setIsLoading(true);
      try {
        // Modify your API call to work without real authentication
        // const response = await fetch('/api/pages', {
        //   headers: { Authorization: `Bearer ${sessionToken}` }
        // });
        // const data = await response.json();
        // setPages(data);
        
        // For now, just use mock data
        setPages([
          { id: '1', name: 'Home', url: '/home' },
          { id: '2', name: 'About', url: '/about' },
          { id: '3', name: 'Contact', url: '/contact' }
        ]);
      } catch (err) {
        setError("Failed to fetch pages");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
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
            <TableCell>URL</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.id}>
              <TableCell>{page.name}</TableCell>
              <TableCell>{page.url}</TableCell>
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