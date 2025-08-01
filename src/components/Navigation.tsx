import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Webflow Style Merge
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/custom-code">
            Custom Code
          </Button>
          <Button color="inherit" component={Link} to="/elements">
            Elements
          </Button>
          <Button color="inherit" component={Link} to="/dev-tools">
            Dev Tools
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}