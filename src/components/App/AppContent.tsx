// src/components/App/AppContent.tsx

import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Navigation } from "../Navigation";
import Home from "../Home";
import { CustomCodeDashboard } from "../CustomCode/CustomCodeDashboard";
import { Dashboard } from "../Dashboard";
import { DevTools } from "../DevTools";
import { ElementsDashboard } from "../Elements/ElementsDashboard";
import ComponentExplorer from "../ComponentExplorer";

/**
 * AppContent handles the application's routing and layout structure.
 * It defines the main navigation and content areas of the application.
 */

export function AppContent() {
  return (
    <HashRouter>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Navigation />
        <Box sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/custom-code" element={<CustomCodeDashboard />} />
            <Route path="/elements" element={<ElementsDashboard />} />
            <Route path="/components" element={<ComponentExplorer />} />
            <Route path="/dev-tools" element={<DevTools />} />
          </Routes>
        </Box>
      </Box>
    </HashRouter>
  );
}
