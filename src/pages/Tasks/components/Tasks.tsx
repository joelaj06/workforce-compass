import { useEffect, useState } from "react";
import { ButtonComponent, DialogComponent } from "../../../components";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddTaskForm from "./AddTaskForm";

const Tasks = () => {
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
    <>
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
    </>
  );
};

export default Tasks;
