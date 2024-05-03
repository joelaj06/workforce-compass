import DashboardChartsComponent from "./DashboardChartsComponent";
import DashboardPresentUsersComponent from "./DashboardPresentUsersComponent";
import DashboardSummaryCardsComponent from "./DashboardSummaryCardsComponent";

const Dashboard = () => {
  return (
    <div className="flex gap-4">
      <div className="">
        <DashboardChartsComponent />
      </div>
      <div className="w-1/4 flex-grow">
        <DashboardPresentUsersComponent />
      </div>
      <div className="w-1/6 ">
        <DashboardSummaryCardsComponent />
      </div>
    </div>
  );
};

export default Dashboard;
