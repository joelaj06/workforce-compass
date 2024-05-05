import ButtonComponent from "../../components/ButtonComponent";
import EmployeesTable from "./EmployeeTable";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const Employees = () => {
  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-lg font-bold text-black">Users</div>
        <ButtonComponent
          btnHeight="small"
          iconOnLeft={<AddRoundedIcon />}
          bgColor="primary"
        >
          <span className="capitalize text-sm">Add Employee</span>
        </ButtonComponent>
      </div>
      <EmployeesTable />
    </>
  );
};

export default Employees;
