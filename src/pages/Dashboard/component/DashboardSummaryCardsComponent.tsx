import { useEffect, useState } from "react";
import { IDashboardSummary } from "../common/dashboard";
import { useLazyGetDashboardSummaryQuery } from "../common/dashboard-api";
import DashboardSummaryCard from "./DashboardSummaryCard";
import { showToast } from "../../../utils/ui/notifications";

const DashboardSummaryCardsComponent = () => {
  //hooks
  const [getDashboardSummary] = useLazyGetDashboardSummaryQuery();

  //state variables
  const [dashboardData, setDashboardData] = useState<IDashboardSummary>();

  const fetchDasbhoardSummary = async () => {
    const res = await getDashboardSummary();
    if (res && res.data) {
      setDashboardData(res.data);
    } else {
      showToast({ message: "Something went wrong", type: "error" });
    }
  };

  useEffect(() => {
    fetchDasbhoardSummary();
  }, []);
  return (
    <div className="flex flex-row gap-2">
      <DashboardSummaryCard
        title={"Users"}
        total={dashboardData?.total_users ?? 0}
        image="person.png"
      />
      <DashboardSummaryCard
        title={"Teams"}
        total={dashboardData?.total_teams ?? 0}
        image="team.png"
      />
      <DashboardSummaryCard
        title={"Offices"}
        total={dashboardData?.total_offices ?? 0}
        image="office.png"
      />
      <DashboardSummaryCard
        title={"Present"}
        total={dashboardData?.total_present ?? 0}
        image="ontime.png"
      />
    </div>
  );
};

export default DashboardSummaryCardsComponent;
