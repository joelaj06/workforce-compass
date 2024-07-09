import { ChangeEvent, useState } from "react";
import { ButtonComponent, CustomInputField } from "../../../components";
import { useLazyGetUsersQuery } from "../../Employees/common/users-api";
import { IErrorData } from "../../../components/login/common/auth";
import { showToast } from "../../../utils/ui/notifications";
import AsyncMultiSelectorComponent from "../../../components/AsyncMultiSelectComponent";
import { DropDownOption } from "../../../components/DropDownComponent";
import { useAddTeamMutation } from "../common/teams-api";
import { ITeamRequestPayload } from "../common/teams";

interface AddTeamFormProps {
  isSubmitted: (value: boolean) => void;
}
const AddTeamForm = ({ isSubmitted }: AddTeamFormProps) => {
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [teamName, setTeamName] = useState<string>("");

  const [getAllUsers] = useLazyGetUsersQuery();

  const [createTeam, { isLoading }] = useAddTeamMutation();

  const fetchUsers = async (query: string): Promise<DropDownOption[]> => {
    const res = await getAllUsers({ pageIndex: 1, pageSize: 5, query: query });
    if (res && res.data) {
      return res.data.contents.map(
        (user) =>
          ({
            label: `${user.first_name} ${user.last_name}`,
            value: user._id,
          } as DropDownOption)
      );
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
      return Promise.reject(error.data.message);
    }
  };

  const submitTeamData = async () => {
    const data: ITeamRequestPayload = {
      name: teamName,
      members: teamMembers,
      status: "active",
    };
    const res = await createTeam(data);
    if (res && res.data) {
      showToast({ message: "Team created successfully", type: "success" });
      isSubmitted(true);
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };
  return (
    <div className="px-3 flex flex-col gap-3">
      <CustomInputField
        name="name"
        type="text"
        label="Team Name"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTeamName(e.target.value)
        }
      />
      <AsyncMultiSelectorComponent
        label={"Select team members"}
        options={fetchUsers}
        onChanged={(val) => setTeamMembers(val.map((x) => x.value.toString()))}
        //width="60%"
      />
      <div className="flex flex-row justify-end pb-3">
        <ButtonComponent
          btnHeight="small"
          btnWidth="small"
          bgColor="primary"
          onClick={submitTeamData}
          disabled={teamName === "" || teamMembers.length <= 1 || isLoading}
        >
          <span className="capitalize text-sm">Save Team</span>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default AddTeamForm;
