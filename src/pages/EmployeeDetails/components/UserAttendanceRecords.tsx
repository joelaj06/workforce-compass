import { useEffect, useState } from "react";
import UserAttendanceSummary from "./UserAttendanceSummary";
import {
  IAttendanceDate,
  IUserAttendanceSummary,
} from "../common/employee_details";
import UserAttendanceTable from "./UserAttendanceTable";
import { Divider } from "@mui/material";
import {
  useLazyGetUserAttendanceDateQuery,
  useLazyGetUserAttendanceSummaryQuery,
} from "../../Employees/common/users-api";
import { IErrorData } from "../../../components/login/common/auth";
import { showToast } from "../../../utils/ui/notifications";
import LoadingBox from "../../../components/LoadingBox";

interface UserAttendanceRecordProps {
  userId: string;
}
const UserAttendanceRecords = ({ userId }: UserAttendanceRecordProps) => {
  const [getUserAttendanceDates, { isLoading: isUserAttendanceDatesLoading }] =
    useLazyGetUserAttendanceDateQuery();
  const [getUserAttendanceSummary] = useLazyGetUserAttendanceSummaryQuery();

  const [attendanceDates, setAttendanceDates] = useState<IAttendanceDate[]>([]);
  const [attendanceSummary, setAttendanceSummary] =
    useState<IUserAttendanceSummary>();

  const fetchUserAttendanceSummary = async () => {
    try {
      const res = await getUserAttendanceSummary(userId);
      if (res && res.data) setAttendanceSummary(res.data);
      else {
        const error = res.error as IErrorData;
        showToast({ message: error.data.message, type: "error" });
      }
    } catch (e) {
      if (e) showToast({ message: "Sorry an error occured", type: "error" });
    }
  };
  const fetchUserAttendanceDates = async () => {
    try {
      const res = await getUserAttendanceDates(userId);
      if (res && res.data) setAttendanceDates(res.data);
      else {
        const error = res.error as IErrorData;
        showToast({ message: error.data.message, type: "error" });
      }
    } catch (error) {
      if (error)
        showToast({ message: "Sorry an error occured", type: "error" });
    }
  };

  useEffect(() => {
    if (userId != "") {
      fetchUserAttendanceDates();
      fetchUserAttendanceSummary();
    }
  }, []);

  return (
    <div className="flex flex-col p-3 bg-white rounded-md shadow-sm flex-grow">
      <div className="flex justify-center">
        <p className="font-bold text-primary-color text-lg"> Mar, 2024</p>
      </div>
      <Divider />
      <div>
        <UserAttendanceSummary data={attendanceSummary} />
      </div>
      <Divider />
      <div>
        {isUserAttendanceDatesLoading ? (
          <LoadingBox />
        ) : (
          <UserAttendanceTable attendanceData={attendanceDates} />
        )}
      </div>
    </div>
  );
};

export default UserAttendanceRecords;
