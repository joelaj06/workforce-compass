import ButtonComponent from "../../components/ButtonComponent";
import CustomInputField from "../../components/CustomInputField";
import EmployeesTable from "./EmployeeTable";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Employees = () => {
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
          <ButtonComponent
            btnHeight="small"
            iconOnLeft={<AddRoundedIcon />}
            bgColor="primary"
          >
            <span className="capitalize text-sm">Add Employee</span>
          </ButtonComponent>
        </div>
      </div>
      <EmployeesTable />
    </>
  );
};

export default Employees;
