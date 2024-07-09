import { ColumnDef } from "@tanstack/react-table";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import CustomTableComponent, {
  PaginationState,
} from "../../../components/CustomTableComponent";
import { convertDateToString } from "../../../utils/dateTime";
import { ILeave } from "../common/leaves";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { Avatar, IconButton, Tooltip } from "@mui/material";
import classNames from "classnames";
import { DialogComponent } from "../../../components";
import LeaveDetails from "./LeaveDetails";

interface LeavesTableProps {
  leavesData: ILeave[];
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
  pagination: PaginationState;
}
const LeavesTable = ({
  leavesData,
  onPaginationChange,
  pagination,
}: LeavesTableProps) => {
  const [closeDialog, setCloseDialog] = useState<boolean>(false);

  useEffect(() => {
    if (closeDialog) {
      setCloseDialog(false);
    }
  }, [closeDialog]);

  const handleCloseDialog = () => {
    setCloseDialog(true);
  };

  const columns = useMemo<ColumnDef<ILeave>[]>(
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
            className={classNames(
              "text-xs rounded-2xl p-[2px] text-center capitalize truncate",
              {
                "border bg-orange-500  border-orange-600 bg-opacity-10 text-orange-600":
                  row.original.status.toLowerCase() == "pending",
                "border border-green-800 text-green-800 bg-opacity-10 bg-green-500":
                  row.original.status.toLowerCase() == "approved",
                "border bg-red-500 text-red-600 bg-opacity-10 border-red-600":
                  row.original.status.toLowerCase() == "declined",
              }
            )}
          >
            {row.original.status}
          </div>
        ),
      },
      {
        header: "Actions",
        accessorKey: "",
        cell: ({ row }) => (
          <div className="flex flex-row gap-1">
            {/* <AlertDialogComponent
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
            </AlertDialogComponent> */}
            <DialogComponent
              closeDialog={closeDialog}
              title={`${row.original.user.first_name} ${row.original.user.last_name}`}
              content={
                <LeaveDetails
                  onClose={handleCloseDialog}
                  leave={row.original}
                />
              }
            >
              <IconButton onClick={() => {}}>
                <EditRoundedIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            </DialogComponent>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm flex-grow">
        <div className="p-3">
          <div>
            <CustomTableComponent
              data={leavesData}
              columns={columns}
              pagination={pagination}
              onPaginationChange={onPaginationChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeavesTable;
