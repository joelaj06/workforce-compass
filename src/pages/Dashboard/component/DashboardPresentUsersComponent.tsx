import { useMemo } from "react";
import { dummyCurrentCheckIn } from "../common/dashboard";
import DashboardPresentUserCard from "./DashboardPresentUserCard";

const DashboardPresentUsersComponent = () => {
  const currentCheckedInUsers = useMemo(() => dummyCurrentCheckIn, []);
  return (
    <div className="bg-white p-2 h-full rounded-lg">
      <div className="text-sm font-bold py-4">Current Present</div>
      <div>
        {currentCheckedInUsers.map((check) => (
          <DashboardPresentUserCard currentCheckIn={check} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPresentUsersComponent;
