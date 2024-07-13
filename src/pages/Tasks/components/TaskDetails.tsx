import { ChangeEvent, ForwardedRef, useEffect, useState } from "react";
import { ButtonComponent, CustomInputField } from "../../../components";
import {
  IComment,
  ICommentRequestPayload,
  ITask,
  ITaskRequestPayload,
} from "../common/task";
import { Avatar, CircularProgress, Divider } from "@mui/material";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertDateToString } from "../../../utils/dateTime";
import {
  useAddCommentMutation,
  useUpdateTaskMutation,
} from "../common/tasks-api";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { IUser } from "../../Employees/common/employee";
import { showToast } from "../../../utils/ui/notifications";
import { IErrorData } from "../../../components/login/common/auth";
import DatePicker from "react-datepicker";
import { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface TaskDetailsProps {
  isSubmitted: (value: boolean) => void;
  task: ITask;
  updateTitle: (val: string) => void;
}

const TaskDetails = ({ task, updateTitle }: TaskDetailsProps) => {
  const [createComment, { isLoading }] = useAddCommentMutation();

  const [updateTask] = useUpdateTaskMutation();

  const user: IUser = useSelector(
    (state: RootState) => state.user.user
  ) as IUser;

  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<IComment[]>(task.comments);
  const [dueDate, setDuedate] = useState<string | undefined>(task.due_date);

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateTitle(e.target.value);
    setComments([]);
  };

  const onTaskUpdate = async () => {
    const payload: ITaskRequestPayload = {
      id: task._id,
      title: title,
      description: description,
      due_date: dueDate,
    };

    const res = await updateTask(payload);
    if (res && res.data) {
      // showToast({ message: "Task updated successfully", type: "success" });
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  const addComment = async () => {
    const payload: ICommentRequestPayload = {
      taskId: task._id,
      comment: comment,
      user: user._id,
    };

    const res = await createComment(payload);

    if (res && res.data) {
      setComments([...comments, res.data]);
      setComment("");
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  const handleCommentSubmit = () => {
    addComment();
  };

  useEffect(() => {
    updateTitle(task.title);
  }, []);

  useEffect(() => {
    onTaskUpdate();
  }, [dueDate]);

  const now = Date.now();
  const date = dueDate ? new Date(dueDate ?? now) : null;

  const CustomDateInput = forwardRef(
    (
      { value, onClick }: { value: string; onClick: () => void },
      ref: ForwardedRef<HTMLDivElement>
    ) => (
      <div className="cursor-pointer" ref={ref} onClick={onClick}>
        <FontAwesomeIcon icon={faCalendarDays} />{" "}
        <span className="text-xs">{value ?? "Not Set"}</span>
      </div>
    )
  );

  return (
    <div className="flex flex-row justify-between">
      <div className="flex-grow flex flex-col gap-2 h-full shadow-md p-2 bg-white">
        <div className="flex flex-col gap-1 border rounded-lg ">
          <CustomInputField
            name="title"
            type="text"
            defaultValue={title}
            customClass="font-semibold"
            hideBorder={true}
            // label="Title"
            onChange={onTitleChanged}
            onBlur={() => {
              if (task.title !== title) onTaskUpdate();
            }}
          />

          <CustomInputField
            name="description"
            type="text"
            defaultValue={description}
            multipleLines={true}
            hideBorder={true}
            // label="Title"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            onBlur={() => {
              if (task.description !== description) onTaskUpdate();
            }}
          />
        </div>
        <div>
          <p className="text-sm">Location</p>
          <div className="h-60 border rounded-xl"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Avatar sx={{ height: "30px", width: "30px" }} src={user.image} />
            <div className="flex-grow flex flex-row items-end justify-between gap-2">
              <div className="flex-grow">
                <CustomInputField
                  name="comment"
                  type="text"
                  placeholder="Add a comment"
                  defaultValue={comment}
                  multipleLines={true}
                  hideBorder={true}
                  // label="Title"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setComment(e.target.value)
                  }
                />
              </div>
              <ButtonComponent
                btnHeight="small"
                minWidth="fit-content"
                btnWidth="80px"
                //bgColor="info"
                variantType="outlined"
                disabled={isLoading || comment.length == 0}
                onClick={handleCommentSubmit}
              >
                <span className="capitalize text-xs">
                  {isLoading ? <CircularProgress size={15} /> : "Send"}
                </span>
              </ButtonComponent>
            </div>
          </div>

          <div className="p-2">
            {comments.map((comment) => (
              <div key={comment._id} className="flex flex-row gap-1">
                <Avatar
                  sx={{ height: "28px", width: "28px" }}
                  src={comment.user.image}
                />
                <p className="text-sm">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-4 p-3 bg-background justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 ">
            <p className="text-sm font-semibold">Reviewer</p>
            <div className="flex flex-row gap-1 items-center">
              <Avatar
                sx={{ height: "28px", width: "28px" }}
                src={task.reviewer.image}
              />
              <p className="text-sm">
                {task.reviewer.first_name + " " + task.reviewer.last_name}
              </p>
            </div>
            <Divider />
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="text-sm font-semibold">Assignee</p>
            <div className="flex flex-row gap-1 items-center">
              <Avatar
                sx={{ height: "28px", width: "28px" }}
                src={task.assignee.image}
              />
              <p className="text-sm">
                {task.assignee.first_name + " " + task.assignee.last_name}
              </p>
            </div>
            <Divider />
          </div>
          <div className="flex flex-col gap-1  ">
            <p className="text-sm font-semibold">Due Date</p>
            <div className="flex flex-row gap-1 items-center">
              <div className="border p-1 rounded flex flex-row gap-1">
                <DatePicker
                  selected={date}
                  onSelect={(date) => {
                    if (date) onTaskUpdate();
                  }}
                  onChange={(date) => setDuedate(date?.toISOString() ?? "")}
                  customInput={
                    <CustomDateInput value={"Not Set"} onClick={() => {}} />
                  }
                />
              </div>
            </div>
            <Divider />
          </div>
        </div>
        <>
          <div className="flex flex-col gap-1 ">
            <p className="text-sm font-semibold">Created</p>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-sm">{convertDateToString(task.createdAt)}</p>
            </div>
            <Divider />
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="text-sm font-semibold">Updated</p>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-sm">{convertDateToString(task.updatedAt)}</p>
            </div>
            <Divider />
          </div>
        </>
      </div>
    </div>
  );
};

export default TaskDetails;
