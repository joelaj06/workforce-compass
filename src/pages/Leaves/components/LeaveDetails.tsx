import { useMemo, useState } from "react";
import { ILeave, leaveOptions } from "../common/leaves";
import DropDownComponent from "../../../components/DropDownComponent";
import { ButtonComponent } from "../../../components";
import { useUpdateLeaveStatusMutation } from "../common/leaves-api";
import { showToast } from "../../../utils/ui/notifications";
import { IErrorData } from "../../../components/login/common/auth";

interface LeaveDetailsProps {
  leave: ILeave;
  onClose: (val: boolean) => void;
}

const LeaveDetails = ({ leave, onClose }: LeaveDetailsProps) => {
  const [updateLeaveStatus, { isLoading }] = useUpdateLeaveStatusMutation();

  const [status, setStatus] = useState(leave.status);

  const updateLeave = async () => {
    const res = await updateLeaveStatus({ id: leave._id, status });
    if (res && res.data) {
      onClose(true);
      showToast({ message: "Leave status updated", type: "success" });
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };
  const options = useMemo(() => leaveOptions, []);
  return (
    <div className="flex flex-col gap-2 p-3 ">
      <div className="flex flex-col gap-1">
        <p className="text-black font-bold text-sm">Reason:</p>
        <h2 className="p-2 rounded-xl bg-slate-100 text-sm">{leave.notes}</h2>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-black font-bold text-sm">Status:</p>
        <DropDownComponent
          label={status}
          options={options}
          onChanged={(val) => {
            setStatus(val?.value as "Pending" | "Declined" | "Approved");
          }}
          width="60%"
        />
      </div>
      <div className="py-4 flex flex-row justify-end">
        <ButtonComponent
          // disabled={isSubmitting}
          type="submit"
          btnHeight="small"
          bgColor="primary"
          onClick={() => updateLeave()}
          disabled={isLoading}
        >
          <span className="capitalize text-sm">Update Leave</span>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default LeaveDetails;
