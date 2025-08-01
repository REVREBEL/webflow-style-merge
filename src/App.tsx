/** @format */

// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";
import { Navigation } from "./components/Navigation";
import Home from "./components/Home";
import { CustomCodeDashboard } from "./components/CustomCode/CustomCodeDashboard";
import { Dashboard } from "./components/Dashboard";
import { DevTools } from "./components/DevTools";
import { theme } from "./components/theme";
import "./App.css";
import { ElementsDashboard } from "./components/Elements/ElementsDashboard";

/**
 * App.tsx serves as the main entry point and demonstrates:
 * 1. Authentication flow with Webflow's Designer and Data APIs
 * 2. Data fetching patterns using React Query
 * 3. State management for user sessions
 * 4. Development tools for testing
 *
 * The code is intentionally verbose to show common patterns
 * you might need when building your own Webflow App.
 */

// This is the main App Component. It handles the initial setup and rendering of the Dashboard.
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
