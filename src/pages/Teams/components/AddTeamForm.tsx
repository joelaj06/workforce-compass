import { ChangeEvent, useMemo, useState } from "react";
import { dummyUsers } from "../../Employees/common/employee";
import { ButtonComponent, CustomInputField } from "../../../components";
import MultiSelectorComponent from "../../../components/MultiSelectorComponent";

interface AddTeamFormProps {
  isSubmitted: (value: boolean) => void;
}
const AddTeamForm = ({ isSubmitted }: AddTeamFormProps) => {
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const users = useMemo(() => dummyUsers, []);

  //handle the name of the team
  const [teamName, setTeamName] = useState<string>("");

  const submitTeamData = () => {
    const data = { name: teamName, members: teamMembers };
    console.log(data);
    isSubmitted(true);
  };
  return (
    <div className="px-3 flex flex-col gap-3">
      <CustomInputField
        name="first_name"
        type="text"
        label="First Name"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTeamName(e.target.value)
        }
      />
      <MultiSelectorComponent
        label={"Select team members"}
        options={users.map((user) => ({
          label: `${user.first_name} ${user.last_name}`,
          value: user.id,
        }))}
        onChanged={(val) => setTeamMembers(val.map((x) => x.value.toString()))}
        //width="60%"
      />
      <div className="flex flex-row justify-end pb-3">
        <ButtonComponent
          btnHeight="small"
          btnWidth="small"
          bgColor="primary"
          onClick={submitTeamData}
          disabled={teamName === "" || teamMembers.length == 0}
        >
          <span className="capitalize text-sm">Save Team</span>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default AddTeamForm;
