import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

const Settings = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };

  const tabs = [
    { label: "Office Details", value: 0 },
    { label: "Office Timings", value: 1 },
    { label: "Leaves", value: 2 },
  ];

  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-lg font-bold text-black">Reports</div>
      </div>
      <div className="bg-white rounded-md">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          aria-label="full width tabs example"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              className="capitalize"
              style={{ textTransform: "capitalize" }}
            />
          ))}
        </Tabs>
      </div>

      <TabPanel value={value} index={0} dir={theme.direction}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
    </>
  );
};

export default Settings;
