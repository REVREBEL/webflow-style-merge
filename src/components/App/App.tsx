import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import "./App.css";
import { AppContent } from "./AppContent";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
