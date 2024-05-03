import DashboardAvgCheckInChart from "./DashboardAvgCheckInChart";
import DashboardAvgCheckoutChart from "./DashboardAvgCheckoutChart";
import DashboardOnTimeChart from "./DashboardOnTimeChart";

const DashboardChartsComponent = () => {
  return (
    <div className="flex flex-col gap-2">
      <DashboardOnTimeChart />
      <DashboardAvgCheckInChart />
      <DashboardAvgCheckoutChart />
    </div>
  );
};

export default DashboardChartsComponent;
