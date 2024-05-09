import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { IUser, dummyUsers } from "../common/employee";
import CustomTableComponent from "../../../components/CustomTableComponent";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import AlertDialogComponent from "../../../components/AlertDialogComponent";

const EmployeesTable = () => {
  const data = useMemo<IUser[]>(() => dummyUsers, []);
  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "first_name",
        cell: ({ row }) => (
          <div className="capitalize  flex items-center gap-1">
            <Avatar
              sx={{ height: "30px", width: "30px" }}
              src={row.original.image}
            />{" "}
            <span className="text-sm">
              {row.original.first_name} {row.original.last_name}
            </span>
          </div>
        ),
      },

      {
        header: "Job Title",
        accessorKey: "job_title",
        cell: (row) => (
          <span className="text-sm">{row.renderValue() as string}</span>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (row) => (
          <span className="text-sm">{row.renderValue() as string}</span>
        ),
      },
      {
        header: "Contact Info",
        accessorKey: "email",
        cell: ({ row }) => (
          <div className="flex flex-row gap-1">
            <Tooltip title={row.original.phone}>
              <LocalPhoneIcon sx={{ fontSize: "16px" }} />
            </Tooltip>
            <Tooltip title={row.original.email}>
              <EmailOutlinedIcon sx={{ fontSize: "16px" }} />
            </Tooltip>
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
                  Are you sure you want to delete this account?
                </p>
              }
            >
              <IconButton>
                {" "}
                <DeleteOutlineRoundedIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            </AlertDialogComponent>
            <IconButton>
              <EditRoundedIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm flex-grow">
        <div className="p-3">
          <div>
            <CustomTableComponent data={data} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesTable;
