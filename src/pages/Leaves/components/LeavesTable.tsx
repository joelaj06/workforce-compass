import { ColumnDef } from "@tanstack/react-table";

import { useMemo } from "react";
import CustomTableComponent from "../../../components/CustomTableComponent";
import { convertDateToString } from "../../../utils/dateTime";
import { ILeaves, dummyLeaves } from "../common/leaves";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { Avatar, IconButton, Tooltip } from "@mui/material";
import AlertDialogComponent from "../../../components/AlertDialogComponent";
import classNames from "classnames";

const LeavesTable = () => {
  const data = useMemo<ILeaves[]>(() => dummyLeaves, []);

  const columns = useMemo<ColumnDef<ILeaves>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "first_name",
        cell: ({ row }) => (
          <div className="capitalize  flex items-center gap-1">
            <Avatar
              sx={{ height: "30px", width: "30px" }}
              src={row.original.user.image}
            />{" "}
            <span className="text-sm">
              {row.original.user.first_name} {row.original.user.last_name}
            </span>
          </div>
        ),
      },

      {
        header: "From",
        accessorKey: "from_date",
        cell: ({ row }) => (
          <span className="text-sm cursor-default">
            {convertDateToString(row.original.date)}
          </span>
        ),
      },
      {
        header: "To",
        accessorKey: "to_date",
        cell: ({ row }) => (
          <span className="text-sm cursor-default">
            {convertDateToString(row.original.date)}
          </span>
        ),
      },
      {
        header: "Days",
        accessorKey: "days",
        cell: ({ row }) => (
          <span className="text-sm cursor-default">{row.original.days}</span>
        ),
      },
      {
        header: "Reason",
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
          <div
            className={classNames("text-xs rounded-2xl p-[2px] text-center", {
              "border bg-orange-500  border-orange-600 bg-opacity-10 text-orange-600":
                row.original.status == "Pending",
              "border border-green-800 text-green-800 bg-opacity-10 bg-green-500":
                row.original.status == "Approved",
              "border bg-red-500 text-red-600 bg-opacity-10 border-red-600":
                row.original.status == "Declined",
            })}
          >
            {row.original.status}
          </div>
        ),
      },
      {
        header: "Actions",
        accessorKey: "",
        cell: () => (
          <div className="flex flex-row gap-1">
            <AlertDialogComponent
              title={"Delete User"}
              content={
                <p className="text-center">
                  Are you sure you want to delete this?
                </p>
              }
            >
              <IconButton>
                {" "}
                <DeleteOutlineRoundedIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            </AlertDialogComponent>
            <IconButton onClick={() => {}}>
              <EditRoundedIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          </div>
        ),
      },
    ],
    []
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

export default LeavesTable;
