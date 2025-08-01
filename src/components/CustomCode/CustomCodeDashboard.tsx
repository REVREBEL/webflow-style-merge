import React, { useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Container
} from "@mui/material";
import { SiteTab, PagesTab } from "./ApplicationTabs";
// Remove the useAuth import
// import { useAuth } from "../../hooks/useAuth";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function CustomCodeDashboard() {
  const [value, setValue] = useState(0);
  
  // Remove the useAuth hook usage
  // const { user } = useAuth();
  const user = { firstName: "User" }; // Use a mock user instead

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user.firstName}
      </Typography>
      
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="application tabs"
          >
            <Tab label="Sites" {...a11yProps(0)} />
            <Tab label="Pages" {...a11yProps(1)} />
            <Tab label="Scripts" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <SiteTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PagesTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* Your scripts tab content */}
          <Typography>Scripts content goes here</Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
}