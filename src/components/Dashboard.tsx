import React from 'react';
import { Container, Typography, Box } from "@mui/material";

export function Dashboard() {
  return (
    <Container>
      <Typography variant="h1">Dashboard</Typography>
      <Box sx={{ mt: 2 }}>
        {/* Your dashboard content goes here */}
        <Typography>Welcome to the Webflow Style Merge tool!</Typography>
      </Box>
    </Container>
  );
}