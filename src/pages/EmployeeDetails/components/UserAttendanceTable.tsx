import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import CustomTableComponent from "../../../components/CustomTableComponent";
import { IAttendanceDate } from "../common/employee_details";
import { getWorkingHours } from "../../../utils/helper";
import { convertDateToString } from "../../../utils/dateTime";
import { Tooltip } from "@mui/material";

interface UserAttendanceTableProps {
  attendanceData: IAttendanceDate[];
}
const UserAttendanceTable = ({ attendanceData }: UserAttendanceTableProps) => {
  const columns = useMemo<ColumnDef<IAttendanceDate>[]>(
    () => [
      {
        header: "Date",
        accessorKey: "createdAt",
        cell: (row) => convertDateToString(row.getValue() as string),
      },

      {
        header: "Check In",
        accessorKey: "check_in",
        cell: ({ row }) => (
          <Tooltip title={row.original.location}>
            <span className="text-sm cursor-default">
              {row.original.check_in}
            </span>
          </Tooltip>
        ),
      },
      {
        header: "Check Out",
        accessorKey: "check_out",
        cell: ({ row }) => (
          <Tooltip title={row.original.location}>
            <span className="text-sm cursor-default">
              {row.original.check_out}
            </span>
          </Tooltip>
        ),
      },
      {
        header: "Working Hrs",
        accessorKey: "",
        cell: ({ row }) => (
          <span className="text-sm text-black font-bold">
            {getWorkingHours(row.original.check_in, row.original.check_out)}
          </span>
        ),
      },
    ],
    []
  );
  return (
    <div>
      <CustomTableComponent
        data={attendanceData}
        columns={columns}
        hidePagination={true}
      />
    </div>
  );
};

export default UserAttendanceTable;
