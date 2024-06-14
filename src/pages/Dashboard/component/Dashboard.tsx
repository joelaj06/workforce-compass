import DashboardChartsComponent from "./DashboardChartsComponent";
import DashboardPresentUsersComponent from "./DashboardPresentUsersComponent";
import DashboardSummaryCardsComponent from "./DashboardSummaryCardsComponent";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashboardSummaryCardsComponent />
      <div className="flex flex-row gap-4">
        <DashboardChartsComponent />
        <div className="w-1/4 flex-grow">
          <DashboardPresentUsersComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
