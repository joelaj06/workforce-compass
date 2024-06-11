import { Avatar, Divider, Tooltip } from "@mui/material";
import { ITask } from "../common/task";
import {
  faCommentDots,
  faCalendarDays,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TaskCardProps {
  task: ITask;
}
const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg shadow p-3 cursor-pointer">
      <div className="flex flex-row gap-1 justify-between items-center">
        <div className="font-semibold text-sm">{task.title}</div>
        <Tooltip
          title={`${task.assignee.first_name} ${task.assignee.last_name}`}
          placement="left"
        >
          <Avatar
            sx={{ height: "30px", width: "30px" }}
            src={task.assignee.image}
          />
        </Tooltip>
      </div>
      <div className="flex flex-col gap-1">
        <Divider />
        <div className="flex flex-row gap-1 justify-between items-center">
          <div className="border p-1 rounded flex flex-row gap-1">
            <FontAwesomeIcon icon={faCalendarDays} />{" "}
            <span className="text-xs">{task.due_date ?? "Not Set"}</span>
          </div>
          <div className="flex flex-row gap-1">
            <FontAwesomeIcon icon={faCommentDots} />
            <span className="text-xs">{task.comments.length ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
