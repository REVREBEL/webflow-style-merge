import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { App } from "./components/App";
import { CapabilitiesProvider } from "./context/CapabilitiesContext";

// Make sure React is available globally for any components that might 
// access it without importing
window.React = React;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      gcTime: 2000,
    },
  },
});

/**
 * Renders the React application into the DOM.
 */
function renderApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <CapabilitiesProvider>
          <App />
        </CapabilitiesProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderApp);
} else {
  renderApp();
}