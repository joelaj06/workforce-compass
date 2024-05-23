import { useMemo, useState } from "react";
import { ButtonComponent } from "../../../components";
import DropDownComponent from "../../../components/DropDownComponent";
import { dummyUsers } from "../../Employees/common/employee";

interface AddTeamMemberFormProps {
  isSubmitted: (value: boolean) => void;
}
const AddTeamMemberForm = ({ isSubmitted }: AddTeamMemberFormProps) => {
  const users = useMemo(() => dummyUsers, []);
  const [memberId, setMemberId] = useState<string>("");

  const submitTeamData = () => {
    isSubmitted(true);
    console.log(memberId);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <DropDownComponent
        label={"Select User"}
        options={users.map((user) => ({
          label: `${user.first_name} ${user.last_name}`,
          value: user.id,
        }))}
        onChanged={(val) => {
          setMemberId(val != null ? val.value.toString() : "");
        }}
        //width="60%"
      />
      <div className="flex flex-row justify-end">
        <ButtonComponent
          btnHeight="small"
          btnWidth="small"
          bgColor="primary"
          onClick={submitTeamData}
          disabled={memberId == ""}
        >
          <span className="capitalize text-sm">Save</span>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default AddTeamMemberForm;
