import { ChangeEvent, useEffect, useState } from "react";
import {
  ButtonComponent,
  CustomInputField,
  DialogComponent,
} from "../../../components";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddTaskForm from "./AddTaskForm";
import { ITask } from "../common/task";
import TaskCard from "./TaskCard";
import TaskDetails from "./TaskDetails";
import {
  useDeleteTaskMutation,
  useLazyGetTasksWithoutPagingQuery,
} from "../common/tasks-api";
import { IErrorData } from "../../../components/login/common/auth";
import { showToast } from "../../../utils/ui/notifications";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingBox from "../../../components/LoadingBox";
import NoResultsFound from "../../Auth/ErrorHandler/NoResultFound";

const Tasks = () => {
  const [getTasks, { isLoading, isFetching }] =
    useLazyGetTasksWithoutPagingQuery();

  const [deleteTask] = useDeleteTaskMutation();

  const [closeDialog, setCloseDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchTasks = async () => {
    const res = await getTasks({ query: searchQuery });

    if (res && res.data) {
      setTasks(res.data);
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  const handleTaskDelete = async (task: ITask) => {
    try {
      const res = await deleteTask(task);
      if (res && res.data) {
        showToast({ message: "Task deleted successfully", type: "success" });
        fetchTasks();
      } else {
        const error = res.error as IErrorData;
        showToast({ message: error.data.message, type: "error" });
      }
    } catch (e) {
      showToast({ message: "Sorry an error occurred", type: "error" });
    }
  };

  const handleSearchTask = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchTasks();
  }, [searchQuery]);

  useEffect(() => {
    if (closeDialog) {
      setCloseDialog(false);
    }
  }, [closeDialog]);

  const handleCloseDialog = () => {
    setCloseDialog(true);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between mb-4">
        <div className="text-lg font-bold text-black">Tasks</div>
        <div className="flex flex-row gap-2 items-center justify-between">
          <CustomInputField
            placeholder="Search"
            variantSize={"small"}
            backgroundColor="white"
            onChange={handleSearchTask}
            suffixIcon={
              searchQuery.length > 0 ? (
                <CancelIcon
                  sx={{ fontSize: "20px" }}
                  onClick={() => setSearchQuery("")}
                />
              ) : (
                <SearchRoundedIcon sx={{ fontSize: "20px" }} />
              )
            }
          />
          <DialogComponent
            title="Create Task"
            content={<AddTaskForm isSubmitted={handleCloseDialog} />}
            closeDialog={closeDialog}
          >
            <ButtonComponent
              btnHeight="small"
              iconOnLeft={<AddRoundedIcon />}
              bgColor="primary"
            >
              <span className="capitalize text-sm">New Task</span>
            </ButtonComponent>
          </DialogComponent>
        </div>
      </div>
      <div className="container mx-auto p-4">
        {isFetching || isLoading ? (
          <LoadingBox />
        ) : tasks.length === 0 ? (
          <NoResultsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tasks.map((task) => (
              <DialogComponent
                key={task._id}
                maxWidth="lg"
                title={title}
                content={
                  <TaskDetails
                    updateTitle={setTitle}
                    task={task}
                    isSubmitted={handleCloseDialog}
                    onTaskDeleted={() => handleTaskDelete(task)}
                  />
                }
                closeDialog={closeDialog}
              >
                <TaskCard
                  key={task._id}
                  task={task}
                  onTaskDeleted={() => handleTaskDelete(task)}
                />
              </DialogComponent>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
