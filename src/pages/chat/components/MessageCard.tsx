import { useSelector } from "react-redux";
import { IUser } from "../../Employees/common/employee";
import { IMessage } from "../common/chat";
import { RootState } from "../../../app/store";
import { DateTime } from "luxon";

interface MessageCardProps {
  message: IMessage;
}

const MessageCard = ({ message }: MessageCardProps) => {
  // console.log(message);
  const currentUser: IUser = useSelector(
    (state: RootState) => state.user.user
  ) as IUser;

  const isCurrentUser =
    message.sender?._id == currentUser.id ||
    message.sender?.id == currentUser.id;

  return (
    <div
      className={`m-1 flex flex-col ${
        isCurrentUser ? "items-end" : "items-start"
      }`}
    >
      <p
        className={`text-sm p-2 rounded-lg  w-fit ${
          isCurrentUser
            ? " bg-primary-color text-white float-end"
            : "bg-gray-200 float-start"
        }`}
      >
        {message.content.message_text}
      </p>
      <span className="text-[8px]">
        {DateTime.fromISO(message.createdAt!).toLocaleString({
          weekday: "short",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

export default MessageCard;
