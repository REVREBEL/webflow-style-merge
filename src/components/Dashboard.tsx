import { Container, Typography } from "@mui/material";

export function Dashboard() {
  return (
    <Container>
      <Typography variant="h1">Webflow Style Merge</Typography>
      <Typography variant="h6">
        Welcome to the Webflow Style Merge tool.
      </Typography>
      
      {/* Your non-auth-dependent dashboard content */}
    </Container>
  );
}