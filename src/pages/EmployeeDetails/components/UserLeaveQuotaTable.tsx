import { ColumnDef } from "@tanstack/react-table";

import { useMemo } from "react";
import CustomTableComponent from "../../../components/CustomTableComponent";
import { convertDateToString } from "../../../utils/dateTime";
import { ILeaves, dummyLeaves } from "../../Leaves/common/leaves";
import { Tooltip } from "@mui/material";
import DropDownComponent from "../../../components/DropDownComponent";

const UserLeaveQuotaTable = () => {
  const data = useMemo<ILeaves[]>(() => dummyLeaves, []);

  const options = useMemo(
    () => [
      { value: "Approved", label: "Approved" },
      { value: "Declined", label: "Declined" },
      { value: "Pending", label: "Pending" },
    ],
    []
  );

  const columns = useMemo<ColumnDef<ILeaves>[]>(
    () => [
      {
        header: "Title",
        accessorKey: "title",
        cell: (row) => row.getValue() as string,
      },

      {
        header: "Issued",
        accessorKey: "createdAt",
        cell: ({ row }) => (
          <span className="text-sm cursor-default">
            {convertDateToString(row.original.createdAt)}
          </span>
        ),
      },
      {
        header: "Reqested Date",
        accessorKey: "date",
        cell: ({ row }) => (
          <span className="text-sm cursor-default">
            {convertDateToString(row.original.date)}
          </span>
        ),
      },
      {
        header: "Notes",
        accessorKey: "notes",
        cell: ({ row }) => (
          <Tooltip title={row.original.notes}>
            <span className="text-sm cursor-default">{row.original.notes}</span>
          </Tooltip>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <DropDownComponent
            label={row.original.status}
            options={options}
            onChanged={() => {}}
          />
        ),
      },
    ],
    [options]
  );
  return (
    <div>
      <CustomTableComponent
        data={data}
        columns={columns}
        hidePagination={true}
      />
    </div>
  );
};

export default UserLeaveQuotaTable;
