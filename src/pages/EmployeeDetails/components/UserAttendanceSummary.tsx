import { convertToHM } from "../../../utils";
import { IAverageAttendanceData } from "../common/employee_details";
import UserAttendanceSummaryCard from "./UserAttendanceSummaryCard";

interface UserAttendanceSummaryProps {
  data: IAverageAttendanceData;
}
const UserAttendanceSummary = ({ data }: UserAttendanceSummaryProps) => {
  return (
    <div className="flex flex-row justify-between">
      <UserAttendanceSummaryCard
        title="Avg Clock In"
        value={convertToHM(data.avgCheckIn)}
        icon={"time-in.png"}
      />

      <UserAttendanceSummaryCard
        title="Avg Clock Out"
        value={convertToHM(data.avgCheckout)}
        icon={"time-out.png"}
      />
      <UserAttendanceSummaryCard
        title="Avg Working Hrs"
        value={convertToHM(data.avgWorkingHrs)}
        icon={"time-check.png"}
      />
      <UserAttendanceSummaryCard
        title="Total Leaves"
        value={data.totalLeave.toString()}
        icon={"leave.png"}
      />
    </div>
  );
};

export default UserAttendanceSummary;
