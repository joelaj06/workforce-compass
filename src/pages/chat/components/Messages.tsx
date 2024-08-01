import { Avatar, Divider } from "@mui/material";
import { IUser } from "../../Employees/common/employee";
import { CustomInputField } from "../../../components";
import { useEffect, useState } from "react";
import {
  IMessage,
  IMessageRequestPayload,
  InitiateChatRequestPayload,
} from "../common/chat";
import MessageCard from "./MessageCard";
import {
  useInitiateChatMutation,
  useLazyGetMessagesQuery,
} from "../common/chats-api";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { showToast } from "../../../utils/ui/notifications";
import LoadingBox from "../../../components/LoadingBox";

interface MessagesProps {
  user: IUser;
}
const Messages = ({ user }: MessagesProps) => {
  //hooks
  const currentUser: IUser = useSelector(
    (state: RootState) => state.user.user
  ) as IUser;
  const [initiateChat, { isLoading: isLoadingChats }] =
    useInitiateChatMutation();
  const [getMessages, { isLoading: isLoadingMessages }] =
    useLazyGetMessagesQuery();

  //state variables
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  //  const [chatId, setChatId] = useState<string>();

  const initiateNewChat = async () => {
    const payload: InitiateChatRequestPayload = {
      user: user._id,
    };
    try {
      await initiateChat(payload)
        .unwrap()
        .then((res) => {
          if (res) {
            //setChatId(res.chat_room_id);
            fetchMessages(res.chat_room_id);
          }
        })
        .catch(() => {
          showToast({ message: "Failed to initiate chat", type: "error" });
        });
    } catch (error) {
      if (error)
        showToast({ message: "Failed to initiate chat", type: "error" });
    }
  };

  const fetchMessages = async (chatId: string) => {
    if (chatId) {
      await getMessages(chatId).then((res) => {
        if (res && res.data) setMessages(res.data);
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleMessageSubmit();
    }
  };
  const handleMessageSubmit = () => {
    if (messageInput.trim() !== "") {
      setMessageInput("");

      const payload: IMessageRequestPayload = {
        recipient: user._id,
        chatId: "",
        message: {
          message_text: messageInput,
        },
      };

      const message: IMessage = {
        content: payload.message,
        _id: "",
        recipient: user,
        chat: "",
        sender: currentUser,
        createdAt: Date.now().toString(),
      };

      setMessages([...messages, message]);
    }
  };

  useEffect(() => {
    initiateNewChat();
  }, [user]);
  return (
    <div className="flex flex-col h-full">
      <div className="py-1 flex flex-row gap-2 items-start">
        <Avatar src={user.image} sx={{ width: "30px", height: "30px" }} />
        <div className="flex flex-col justify-start items-start">
          <p className="text-sm">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-[8px]">Offline</p>
        </div>
      </div>
      <Divider sx={{ padding: "0px 4px" }} />

      {/* Messages list */}
      <div className="flex-grow flex flex-col overflow-y-auto p-2">
        {isLoadingChats || isLoadingMessages ? (
          <LoadingBox />
        ) : messages.length === 0 ? (
          <p>No messages</p>
        ) : (
          messages.map((message) => (
            <MessageCard key={message._id} message={message} />
          ))
        )}
      </div>

      {/* Text composer */}
      <div className="p-2 border-t">
        <CustomInputField
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Messages;
