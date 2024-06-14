import DashboardSummaryCard from "./DashboardSummaryCard";

const DashboardSummaryCardsComponent = () => {
  return (
    <div className="flex flex-row gap-2">
      <DashboardSummaryCard title={"Employees"} total={90} image="person.png" />
      <DashboardSummaryCard title={"Teams"} total={12} image="team.png" />
      <DashboardSummaryCard title={"Offices"} total={3} image="office.png" />
      <DashboardSummaryCard title={"Present"} total={75} image="ontime.png" />
    </div>
  );
};

export default DashboardSummaryCardsComponent;
