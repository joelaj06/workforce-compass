import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonComponent, CustomInputField } from "../../../components";
import { useMemo, useState } from "react";
import { dummyUsers } from "../../Employees/common/employee";
import DropDownComponent from "../../../components/DropDownComponent";

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
  const users = useMemo(() => dummyUsers, []);
  const [assignee, setAssigneeId] = useState<string>("");
  const [reviewer, setReviewerId] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskFormFileds>();

  const onSubmit: SubmitHandler<AddTaskFormFileds> = async (data) => {
    //set a timeout for a promise
    const newData = { ...data, assignee, reviewer };
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(newData);
    isSubmitted(true);
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
            <DropDownComponent
              label={"Select User"}
              options={users.map((user) => ({
                label: `${user.first_name} ${user.last_name}`,
                value: user._id,
              }))}
              onChanged={(val) => {
                setAssigneeId(val != null ? val.value.toString() : "");
              }}
              // width="50%"
            />
          </div>
          <div className="flex-1">
            <span className="text-sm">Reviewer</span>
            <DropDownComponent
              label={"Select User"}
              options={users.map((user) => ({
                label: `${user.first_name} ${user.last_name}`,
                value: user._id,
              }))}
              onChanged={(val) => {
                setReviewerId(val != null ? val.value.toString() : "");
              }}
              // width="50%"
            />
          </div>
        </div>

        <div className="flex flex-row justify-between">Location</div>

        <div className="py-4 flex flex-row justify-end">
          <ButtonComponent
            disabled={isSubmitting}
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
