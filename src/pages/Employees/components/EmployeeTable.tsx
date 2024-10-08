import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IUser } from "../common/employee";
import CustomTableComponent, {
  PaginationState,
} from "../../../components/CustomTableComponent";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import AlertDialogComponent from "../../../components/AlertDialogComponent";
import { useNavigate } from "react-router-dom";
import { AppPages } from "../../../routes/appPages";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { useDeleteUserMutation } from "../common/users-api";
import { showToast } from "../../../utils/ui/notifications";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

interface EmployeesTableProps {
  usersData: IUser[];
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
  pagination: PaginationState;
  getUser: (user: IUser) => void;
}
const EmployeesTable = ({
  usersData,
  onPaginationChange,
  pagination,
  getUser,
}: EmployeesTableProps) => {
  const [deleteUser] = useDeleteUserMutation();

  const navigate = useNavigate();

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId).then((res) => {
      if (res && res.data) {
        showToast({ message: "User deleted successfully", type: "success" });
      } else {
        showToast({ message: "Failed to delete user", type: "error" });
      }
    });
  };
  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "first_name",
        cell: ({ row }) => (
          <div className="capitalize  flex items-center gap-1">
            <Avatar
              sx={{ height: "30px", width: "30px" }}
              src={row.original?.imgUrl}
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
        header: "Role",
        accessorKey: "role",
        cell: ({ row }) => (
          <span className="text-sm capitalize">{row.original.role?.name}</span>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (row) => (
          <span className="text-sm capitalize">
            {row.renderValue() as string}
          </span>
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
        cell: ({ row }) => (
          <div className="flex flex-row gap-1 items-center">
            <AlertDialogComponent
              title={"Delete User"}
              onRightButtonClicked={() => handleDeleteUser(row.original._id)}
              content={
                <p className="text-center">
                  Are you sure you want to delete this account?
                </p>
              }
            >
              <IconButton sx={{ borderRadius: "4px", padding: "4px" }}>
                {" "}
                <DeleteOutlineRoundedIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            </AlertDialogComponent>
            <IconButton
              onClick={() =>
                navigate(AppPages.employeeDetails(row.original._id.toString()))
              }
            >
              <ManageAccountsIcon sx={{ fontSize: "16px" }} />
            </IconButton>
            <IconButton onClick={() => getUser(row.original)}>
              <ChatRoundedIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm flex-grow">
        <div className="p-3">
          <div>
            <CustomTableComponent
              data={usersData}
              columns={columns}
              pagination={pagination}
              onPaginationChange={onPaginationChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesTable;
