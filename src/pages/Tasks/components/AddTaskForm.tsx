import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonComponent, CustomInputField } from "../../../components";
import { useState } from "react";
import { DropDownOption } from "../../../components/DropDownComponent";
import { useLazyGetUsersQuery } from "../../Employees/common/users-api";
import { IErrorData } from "../../../components/login/common/auth";
import { showToast } from "../../../utils/ui/notifications";
import AsyncDropDownComponent from "../../../components/AsyncDropDownComponent";
import { useAddTaskMutation } from "../common/tasks-api";
import { ITaskRequestPayload } from "../common/task";

interface AddTaskFormProps {
  isSubmitted: (value: boolean) => void;
}

type AddTaskFormFileds = {
  title: string;
  description: string;
  assignee: string;
  reviewer: string;
};
const AddTaskForm = ({ isSubmitted }: AddTaskFormProps) => {
  const [getAllUsers] = useLazyGetUsersQuery();
  const [addNewTask, { isLoading }] = useAddTaskMutation();

  const [assignee, setAssigneeId] = useState<string>("");
  const [reviewer, setReviewerId] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskFormFileds>();

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

  const addTask = async (payload: ITaskRequestPayload) => {
    const res = await addNewTask(payload);
    if (res && res.data) {
      showToast({ message: "Task created successfully", type: "success" });
      isSubmitted(true);
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  const onSubmit: SubmitHandler<AddTaskFormFileds> = async (data) => {
    //set a timeout for a promise
    const newData: ITaskRequestPayload = { ...data, assignee, reviewer };
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(newData);
    addTask(newData);
  };
  return (
    <div className="p-3">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="p-3">
        <div className="flex gap-1 justify-between items-end">
          <div className="flex-1">
            <CustomInputField<AddTaskFormFileds>
              register={register}
              name="title"
              customClass="flex-1"
              type="text"
              label="Title"
              rules={{ required: "Field required" }}
              errors={errors}
            />
          </div>
        </div>

        <CustomInputField<AddTaskFormFileds>
          register={register}
          {...register("description")}
          customClass="flex-1"
          name="description"
          type="text"
          label="Description"
          rules={{ required: "Field required" }}
          errors={errors}
          multipleLines={true}
          rows={10}
          cols={50}
        />

        <div className="flex gap-1 justify-between items-center py-2">
          <div className="flex-1">
            <span className="text-sm">Assignee</span>
            <AsyncDropDownComponent
              label={"Select user"}
              options={fetchUsers}
              onChanged={(val) => setAssigneeId(val?.value as string)}
              //width="60%"
            />
          </div>
          <div className="flex-1">
            <span className="text-sm">Reviewer</span>
            <AsyncDropDownComponent
              label={"Select user"}
              options={fetchUsers}
              onChanged={(val) => setReviewerId(val?.value as string)}
              //width="60%"
            />
          </div>
        </div>

        {/* TODO: Add location */}
        <div className="flex flex-row justify-between">Location</div>

        <div className="py-4 flex flex-row justify-end">
          <ButtonComponent
            disabled={isSubmitting || isLoading}
            type="submit"
            btnHeight="small"
            bgColor="primary"
          >
            <span className="capitalize text-sm">Create Task</span>
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
