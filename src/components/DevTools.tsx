import { Box, Button } from "@mui/material";

export function DevTools() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        bgcolor: "#f5f5f5",
        p: 1,
        borderTop: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Button 
        variant="outlined"
        onClick={() => console.log("Reset app state")}
      >
        Reset Data
      </Button>
    </Box>
  );
}