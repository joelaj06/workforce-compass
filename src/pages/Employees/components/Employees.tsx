import { useEffect, useState } from "react";
import { ButtonComponent, DialogComponent } from "../../../components";
import CustomInputField from "../../../components/CustomInputField";
import AddEmployeeForm from "./AddEmployeeForm";
import EmployeesTable from "./EmployeeTable";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Employees = () => {
  const [closeDialog, setCloseDialog] = useState<boolean>(false);

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
            suffixIcon={<SearchRoundedIcon sx={{ fontSize: "20px" }} />}
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
              <span className="capitalize text-sm">Add Employee</span>
            </ButtonComponent>
          </DialogComponent>
        </div>
      </div>
      <EmployeesTable />
    </>
  );
};

export default Employees;
