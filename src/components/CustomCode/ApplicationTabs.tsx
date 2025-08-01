import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

// Define your tab components
export const SiteTab: React.FC = () => {
  return (
    <div>
      {/* Site tab content */}
    </div>
  );
};

export const PagesTab: React.FC = () => {
  return (
    <div>
      {/* Pages tab content */}
    </div>
  );
};

interface ApplicationTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: string[];
}

export function ApplicationTabs({ value, onChange, tabs }: ApplicationTabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={onChange} aria-label="application tabs">
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} id={`tab-${index}`} />
        ))}
      </Tabs>
    </Box>
  );
}