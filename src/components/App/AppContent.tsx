import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Navigation } from "../Navigation";
import Home from "../Home";
import { CustomCodeDashboard } from "../CustomCode/CustomCodeDashboard";
import { ElementsDashboard } from "../Elements/ElementsDashboard";
import { Dashboard } from "../Dashboard";
import { DevTools } from "../DevTools";

function AppContent() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Navigation />
        <Box sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/custom-code" element={<CustomCodeDashboard />} />
            <Route path="/elements" element={<ElementsDashboard />} />
            <Route path="/dev-tools" element={<DevTools />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export { AppContent };