import { Box, Tabs, Tab } from "@mui/material";
import { SyntheticEvent, useState } from "react";

export interface TabData {
  label: string;
  content: React.ReactNode;
}

interface CustomTabComponentProps {
  tabs: TabData[];
}

function CustomTabComponent({ tabs }: CustomTabComponentProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#e7e7e7",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tab"
          TabIndicatorProps={{ style: { background: "var(--primary-color)" } }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              {...a11yProps(index)}
              sx={{
                fontSize: "12px",
                textTransform: "capitalize",
                // color: "var(--primary-color)",
              }}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

export default CustomTabComponent;
