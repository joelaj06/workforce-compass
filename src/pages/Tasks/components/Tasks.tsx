import { useEffect, useMemo, useState } from "react";
import { ButtonComponent, DialogComponent } from "../../../components";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddTaskForm from "./AddTaskForm";
import { ITask, dummyTasks } from "../common/task";
import TaskCard from "./TaskCard";

const Tasks = () => {
  const tasks: ITask[] = useMemo(() => dummyTasks, []);
  const [closeDialog, setCloseDialog] = useState<boolean>(false);

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
        <div className="flex flex-row gap-2 items-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
