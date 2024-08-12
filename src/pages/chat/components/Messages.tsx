import { Avatar, Divider } from "@mui/material";
import { IUser } from "../../Employees/common/employee";
import { CustomInputField } from "../../../components";
import { useEffect, useRef, useState } from "react";
import {
  IMessage,
  IMessageRequestPayload,
  InitiateChatRequestPayload,
  OnlineUser,
} from "../common/chat";
import MessageCard from "./MessageCard";
import {
  useInitiateChatMutation,
  useLazyGetMessagesQuery,
  useSendMessageMutation,
} from "../common/chats-api";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { showToast } from "../../../utils/ui/notifications";
import LoadingBox from "../../../components/LoadingBox";
import { socketIO } from "../../../app/socket";
import { IErrorData } from "../../../components/login/common/auth";

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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [sendMessage, { isLoading: isLoadingSendMessage }] =
    useSendMessageMutation();

  //state variables
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(socketIO);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [userStatus, setUserStatus] = useState<string>("offline");
  const [chatId, setChatId] = useState<string>("");

  const date = new Date();

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initiateNewChat = async () => {
    const payload: InitiateChatRequestPayload = {
      user: user._id,
    };
    try {
      await initiateChat(payload)
        .unwrap()
        .then((res) => {
          if (res) {
            setChatId(res.chat_room_id);
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
        else {
          const error = res.error as IErrorData;
          showToast({ message: error.data.message, type: "error" });
        }
      });
    }
  };

  const sendMessageHandler = async (payload: IMessageRequestPayload) => {
    await sendMessage(payload)
      .unwrap()
      .then((res) => {
        if (res) {
          fetchMessages(res.chat);
          socket.emit("send-message", payload);
        }
      })
      .catch(() => {
        showToast({ message: "Failed to send message", type: "error" });
      });
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
        chatId: chatId,
        message: {
          message_text: messageInput,
        },
      };

      const message: IMessage = {
        content: payload.message,
        _id: "",
        recipient: user,
        chat: chatId,
        sender: currentUser,
        createdAt: date.toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      //send message to server
      sendMessageHandler(payload);
    }
  };

  useEffect(() => {
    initiateNewChat();
  }, [user]);

  //initialize socket
  useEffect(() => {
    socket.on("connection", () => {});
    socket.on("disconnect", () => {});
    //register user on socket

    return () => {
      socket.off("connect", () => {});
      socket.off("disconnect", () => {});
    };
  }, [currentUser]);

  useEffect(() => {
    socket.emit("register", currentUser.id);
    //listen to new messages
    socket.on("registered-users", (data) => {
      setOnlineUsers(data);

      setUserStatus(
        onlineUsers.map((user) => user.userId).includes(currentUser.id!)
          ? "online"
          : "offline"
      );
    });
    socket.on("receive-message", (data) => {
      const newMessage: IMessage = {
        content: data.message,
        _id: Date.now().toLocaleString(),
        recipient: data.sender,
        chat: data.chat_room_id,
        sender: currentUser,
        createdAt: date.toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      // socket.off("registered-users");
      socket.off("receive-message");
    };
  }, [socket]);
  return (
    <div className="flex flex-col h-full">
      {/* Header: User info */}
      <div className="py-1 flex flex-row gap-2 items-start">
        <Avatar src={user.image} sx={{ width: "30px", height: "30px" }} />
        <div className="flex flex-col justify-start items-start">
          <p className="text-sm">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-[8px]">{userStatus}</p>
        </div>
      </div>
      <Divider sx={{ padding: "0px 4px" }} />

      {/* Messages list */}
      <div className="flex-grow flex flex-col overflow-y-auto pt-2 min-h-0">
        {isLoadingChats || isLoadingMessages ? (
          <LoadingBox />
        ) : messages.length === 0 ? (
          <p>No messages</p>
        ) : (
          sortedMessages.map((message) => (
            <MessageCard key={message._id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Text composer */}
      <div className="flex-shrink-0">
        <CustomInputField
          disabled={isLoadingChats || isLoadingMessages || isLoadingSendMessage}
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
