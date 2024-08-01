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
import LoadingBox from "../../../components/LoadingBox";
import Messages from "../../chat/components/Messages";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Employees = () => {
  const [closeDialog, setCloseDialog] = useState<boolean>(false);

  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openMessages, setOpenMessages] = useState<boolean>(false);

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

  //initiate chat on user select
  useEffect(() => {
    if (selectedUser) {
      setOpenMessages(true);
    }
    //  setOpenMessages(false);
  }, [selectedUser]);

  return (
    <>
      <div className="flex flex-row gap-3 justify-between">
        <div className="flex-grow flex flex-col gap-3">
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
              <div className="hidden">
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
          </div>
          {usersIsFetching || usersIsLoading ? (
            <LoadingBox />
          ) : (
            <EmployeesTable
              usersData={users}
              onPaginationChange={onPaginationChange}
              pagination={pagination}
              getUser={(user) => setSelectedUser(user)}
            />
          )}
        </div>
        {/* Chat box */}
        {openMessages && (
          <div className="bg-white rounded-lg p-2 shadow-sm w-1/4 h-[calc(100vh-100px)]">
            <div className="flex flex-row justify-end">
              <CloseRoundedIcon
                onClick={() => {
                  setOpenMessages(false);
                  setSelectedUser(undefined);
                }}
              />
            </div>
            <Messages user={selectedUser ?? ({} as IUser)} />
          </div>
        )}
      </div>
    </>
  );
};

export default Employees;
