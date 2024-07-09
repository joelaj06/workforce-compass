import { useState } from "react";
import { ButtonComponent } from "../../../components";
import { DropDownOption } from "../../../components/DropDownComponent";
import { useLazyGetUsersQuery } from "../../Employees/common/users-api";
import { IErrorData } from "../../../components/login/common/auth";
import { showToast } from "../../../utils/ui/notifications";
import AsyncDropDownComponent from "../../../components/AsyncDropDownComponent";

interface AddTeamMemberFormProps {
  isSubmitted: (value: boolean) => void;
  setNewMember: (memberId: string) => void;
}
const AddTeamMemberForm = ({
  isSubmitted,
  setNewMember,
}: AddTeamMemberFormProps) => {
  const [memberId, setMemberId] = useState<string>("");

  const [getAllUsers] = useLazyGetUsersQuery();

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

  const submitTeamData = () => {
    isSubmitted(true);
    setNewMember(memberId);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <AsyncDropDownComponent
        label={"Select team members"}
        options={fetchUsers}
        onChanged={(val) => setMemberId(val?.value as string)}
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
