import { convertToHM } from "../../../utils";
import { convertToHMInString } from "../../../utils/dateTime";
import { IUserAttendanceSummary } from "../common/employee_details";
import UserAttendanceSummaryCard from "./UserAttendanceSummaryCard";

interface UserAttendanceSummaryProps {
  data?: IUserAttendanceSummary;
}
const UserAttendanceSummary = ({ data }: UserAttendanceSummaryProps) => {
  return (
    <div className="flex flex-row justify-between">
      <UserAttendanceSummaryCard
        title="Avg Clock In"
        value={convertToHM(data?.avgCheckIn ?? 0)}
        icon={"time-in.png"}
      />

      <UserAttendanceSummaryCard
        title="Avg Clock Out"
        value={convertToHM(data?.avgCheckout ?? 0)}
        icon={"time-out.png"}
      />
      <UserAttendanceSummaryCard
        title="Avg Working Hrs"
        value={convertToHMInString((data?.avgWorkingHrs ?? 0).toString())}
        icon={"time-check.png"}
      />
      <UserAttendanceSummaryCard
        title="Total Leaves"
        value={`${data?.totalLeave ?? 0}`}
        icon={"leave.png"}
      />
    </div>
  );
};

export default UserAttendanceSummary;
