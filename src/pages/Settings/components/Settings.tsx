import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LeaveSettings from "./LeaveSettings";
import OfficeDetails from "./OfficeDetails";
import OfficeTimings from "./OfficeTimings";
import { settingsTab } from "../common/settings";
import { ReactNode, SyntheticEvent, useMemo, useState } from "react";

interface TabPanelProps {
  children?: ReactNode;
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
        <Box sx={{ py: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

const Settings = () => {
  const tabs = useMemo(() => settingsTab, []);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-lg font-bold text-black">Reports</div>
      </div>
      <div className="bg-white rounded-sm shadow-sm">
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
        <OfficeDetails />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <OfficeTimings />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <LeaveSettings />
      </TabPanel>
    </>
  );
};

export default Settings;
