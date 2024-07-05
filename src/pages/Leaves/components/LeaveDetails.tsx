import { useMemo } from "react";
import { ILeave, leaveOptions } from "../common/leaves";
import DropDownComponent from "../../../components/DropDownComponent";
import { ButtonComponent } from "../../../components";

interface LeaveDetailsProps {
  leave: ILeave;
}

const LeaveDetails = ({ leave }: LeaveDetailsProps) => {
  const options = useMemo(() => leaveOptions, []);
  return (
    <div className="flex flex-col gap-2 p-3 ">
      <div className="flex flex-col gap-1">
        <p className="text-black font-bold text-sm">Reason:</p>
        <h2 className="p-2 rounded-xl bg-slate-100">{leave.notes}</h2>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-black font-bold text-sm">Status:</p>
        <DropDownComponent
          label={leave.status}
          options={options}
          onChanged={() => {}}
          width="60%"
        />
      </div>
      <div className="py-4 flex flex-row justify-end">
        <ButtonComponent
          // disabled={isSubmitting}
          type="submit"
          btnHeight="small"
          bgColor="primary"
        >
          <span className="capitalize text-sm">Update Leave</span>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default LeaveDetails;
