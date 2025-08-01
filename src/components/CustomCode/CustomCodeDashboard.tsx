/** @format */

import React, { useState } from "react";
import { Box, Paper, Tabs, Tab, Typography, Container } from "@mui/material";

import { SiteTab, PagesTab } from "./ApplicationTabs";
import { ScriptRegistration } from "./ScriptRegistration";

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
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function CustomCodeDashboard() {
  const [value, setValue] = useState(0);
  const [isRegisteringScript, setIsRegisteringScript] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleScriptRegistration = async (code: string, isHosted: boolean) => {
    setIsRegisteringScript(true);
    try {
      console.log("Script registration requested:", {
        code,
        isHosted,
        // Note: name and version are not collected by the current form.
        // This would be the place to call your API service.
      });
    } catch (error) {
      console.error("Error registering script:", error);
    } finally {
      setIsRegisteringScript(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
      >
        Custom Code Management
      </Typography>
      <Paper sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="application tabs">
            <Tab
              label="Sites"
              {...a11yProps(0)}
            />
            <Tab
              label="Pages"
              {...a11yProps(1)}
            />
            <Tab
              label="Scripts"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <TabPanel
          value={value}
          index={0}>
          <SiteTab />
        </TabPanel>
        <TabPanel
          value={value}
          index={1}>
          <PagesTab />
        </TabPanel>
        <TabPanel
          value={value}
          index={2}>
          <ScriptRegistration
            onRegister={handleScriptRegistration}
            isRegistering={isRegisteringScript}
          />
        </TabPanel>
      </Paper>
    </Container>
  );
}
