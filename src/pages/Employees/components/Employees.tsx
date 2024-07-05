import { ChangeEvent, useEffect, useState } from "react";
import { ButtonComponent, DialogComponent } from "../../../components";
import CustomInputField from "../../../components/CustomInputField";
import AddEmployeeForm from "./AddEmployeeForm";
import EmployeesTable from "./EmployeeTable";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import { IUser } from "../common/employee";
import { useLazyGetUsersQuery } from "../common/users-api";
import { showToast } from "../../../utils/ui/notifications";
import { usePagination } from "../../../utils/helper";
import { CircularProgress } from "@mui/material";

const Employees = () => {
  const [closeDialog, setCloseDialog] = useState<boolean>(false);

  const [users, setUsers] = useState<IUser[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [
    getAllUsers,
    { isFetching: usersIsFetching, isLoading: usersIsLoading },
  ] = useLazyGetUsersQuery();

  const { pageSize, pageIndex, onPaginationChange, pagination } =
    usePagination();

  useEffect(() => {
    getAllUsers({
      pageIndex: pageIndex + 1,
      pageSize: pageSize,
      query: searchQuery,
    })
      .then((res) => {
        console.log(res);

        if (res && res.data) {
          setUsers(res.data.contents);
          onPaginationChange({
            ...pagination,
            pageCount: res.data.pagination.totalPages,
            totalCount: res.data.pagination.totalCount,
          });
        } else {
          showToast({ message: "Failed to fetch users.", type: "error" });
        }
      })
      .catch((err) => {
        if (err) {
          showToast({ message: "Failed to fetch users.", type: "error" });
        }
      });
  }, [pageIndex, searchQuery]);

  const handleUserSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (closeDialog) {
      setCloseDialog(false);
    }
  }, [closeDialog]);

  const handleCloseDialog = () => {
    setCloseDialog(true);
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-lg font-bold text-black">Users</div>
        <div className="flex flex-row gap-2 items-center">
          <CustomInputField
            placeholder="Search"
            variantSize={"small"}
            backgroundColor="white"
            onChange={handleUserSearch}
            suffixIcon={
              searchQuery.length > 0 ? (
                <CancelIcon
                  sx={{ fontSize: "20px" }}
                  onClick={() => setSearchQuery("")}
                />
              ) : (
                <SearchRoundedIcon sx={{ fontSize: "20px" }} />
              )
            }
          />
          <DialogComponent
            title="Add Employee"
            content={<AddEmployeeForm isSubmitted={handleCloseDialog} />}
            closeDialog={closeDialog}
          >
            <ButtonComponent
              btnHeight="small"
              iconOnLeft={<AddRoundedIcon />}
              bgColor="primary"
            >
              <span className="capitalize text-sm">Add User</span>
            </ButtonComponent>
          </DialogComponent>
        </div>
      </div>
      {usersIsFetching || usersIsLoading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <EmployeesTable
          usersData={users}
          onPaginationChange={onPaginationChange}
          pagination={pagination}
        />
      )}
    </>
  );
};

export default Employees;
