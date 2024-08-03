import { useSelector } from "react-redux";
import { IUser } from "../../Employees/common/employee";
import { IMessage } from "../common/chat";
import { RootState } from "../../../app/store";

interface MessageCardProps {
  message: IMessage;
}

const MessageCard = ({ message }: MessageCardProps) => {
  // console.log(message);
  const currentUser: IUser = useSelector(
    (state: RootState) => state.user.user
  ) as IUser;

  const isCurrentUser = message.sender?._id === currentUser.id;

  return (
    <div>
      <p
        className={`text-sm p-2 rounded-lg  w-fit ${
          isCurrentUser
            ? " bg-primary-color text-white float-end"
            : "bg-gray-200 float-start"
        }`}
      >
        {message.content.message_text}
      </p>
    </div>
  );
};

export default MessageCard;
