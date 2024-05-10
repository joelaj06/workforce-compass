import { Divider } from "@mui/material";
import UserLeaveQuotaTable from "./UserLeaveQuotaTable";

const LeaveQuota = () => {
  return (
    <div className="flex flex-col p-3 bg-white rounded-md shadow-sm flex-grow">
      <div className="flex justify-center">
        <p className="font-bold text-primary-color text-lg"> Mar, 2024</p>
      </div>
      <Divider />

      <div>
        <UserLeaveQuotaTable />
      </div>
    </div>
  );
};

export default LeaveQuota;
