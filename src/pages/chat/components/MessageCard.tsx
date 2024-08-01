import { useSelector } from "react-redux";
import { IUser } from "../../Employees/common/employee";
import { IMessage } from "../common/chat";
import { RootState } from "../../../app/store";

interface MessageCardProps {
  message: IMessage;
}

const MessageCard = ({ message }: MessageCardProps) => {
  const currentUser: IUser = useSelector(
    (state: RootState) => state.user.user
  ) as IUser;
  return (
    <div>
      <p
        className={`text-sm p-2 rounded-lg  m-2 w-fit ${
          message.sender?._id === currentUser._id
            ? "bg-gray-200 float-end"
            : " bg-primary-color text-white float-start"
        }`}
      >
        {message.content.message_text}
      </p>
    </div>
  );
};

export default MessageCard;
