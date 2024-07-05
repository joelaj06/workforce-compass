import { Divider } from "@mui/material";
import UserLeaveQuotaTable from "./UserLeaveQuotaTable";
import { useLazyGetUserLeavesQuery } from "../../Employees/common/users-api";
import { useEffect, useState } from "react";
import { IErrorData } from "../../../components/login/common/auth";
import { ILeave } from "../../Leaves/common/leaves";
import { showToast } from "../../../utils/ui/notifications";
import LoadingBox from "../../../components/LoadingBox";

interface LeaveQuotaProps {
  userId: string;
}
const LeaveQuota = ({ userId }: LeaveQuotaProps) => {
  const [getLeaves, { isLoading: isLeavesLoading }] =
    useLazyGetUserLeavesQuery();

  const [leaves, setLeaves] = useState<ILeave[]>([]);

  const fetchUserLeaves = async () => {
    try {
      const res = await getLeaves({ userId: userId });
      if (res && res.data) setLeaves(res.data);
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
    if (userId) fetchUserLeaves();
  }, []);

  return (
    <div className="flex flex-col p-3 bg-white rounded-md shadow-sm flex-grow">
      <div className="flex justify-center">
        <p className="font-bold text-primary-color text-lg"> Mar, 2024</p>
      </div>
      <Divider />

      <>
        {isLeavesLoading ? (
          <LoadingBox />
        ) : (
          <UserLeaveQuotaTable leaves={leaves} />
        )}
      </>
    </div>
  );
};

export default LeaveQuota;
