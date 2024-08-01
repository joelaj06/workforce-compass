import { IUser } from "../../Employees/common/employee";

export interface IMessage {
  content: IMessageContent;
  _id: string;
  recipient: IUser;
  chat: string;
  sender?: IUser;
  createdAt?: string;
}

export interface IChat {
  _id: string;
  initiator: IUser;
  user: IUser;
  createadAt: string;
}

export interface IInitiateChat {
  isNew: string;
  message: string;
  chat_room_id: string;
}

export interface InitiateChatRequestPayload {
  user: string;
}

interface IMessageContent {
  message_text: string;
}

export interface IMessageRequestPayload {
  recipient: string;
  message: IMessageContent;
  chatId: string;
}
