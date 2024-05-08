import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { IUser, dummyUsers } from "../common/employee";
import CustomTableComponent from "../../../components/CustomTableComponent";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Avatar } from "@mui/material";

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
        cell: () => (
          <div className="flex flex-row gap-1">
            <LocalPhoneIcon sx={{ fontSize: "16px" }} />
            <EmailOutlinedIcon sx={{ fontSize: "16px" }} />
          </div>
        ),
      },
      {
        header: "Actions",
        accessorKey: "",
        cell: () => (
          <div className="flex flex-row gap-1">
            <DeleteOutlineRoundedIcon sx={{ fontSize: "16px" }} />
            <EditRoundedIcon sx={{ fontSize: "16px" }} />
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
