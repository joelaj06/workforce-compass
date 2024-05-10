import { useMemo } from "react";
import UserAttendanceSummary from "./UserAttendanceSummary";
import { dummyAverageAttendanceData } from "../common/employee_details";
import UserAttendanceTable from "./UserAttendanceTable";
import { Divider } from "@mui/material";

const UserAttendanceRecords = () => {
  const avgData = useMemo(() => dummyAverageAttendanceData, []);
  return (
    <div className="flex flex-col p-3 bg-white rounded-md shadow-sm flex-grow">
      <div className="flex justify-center">
        <p className="font-bold text-primary-color text-lg"> Mar, 2024</p>
      </div>
      <Divider />
      <div>
        <UserAttendanceSummary data={avgData} />
      </div>
      <Divider />
      <div>
        <UserAttendanceTable />
      </div>
    </div>
  );
};

export default UserAttendanceRecords;
