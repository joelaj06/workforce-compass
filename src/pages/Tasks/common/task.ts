import { IUser } from "../../Employees/common/employee";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  assignee: IUser;
  reviewer: IUser;
  status: string;
  createdAt: string;
  updatedAt: string;
  comments: IComment[];
  attachments: string[];
  location: ILocation;
  start_date?: string;
  due_date?: string;
}

export interface ITaskRequestPayload {
  id?: string;
  title: string;
  description: string;
  assignee: string;
  reviewer: string;
  status?: string;
  start_date?: string;
  due_date?: string;
  location?: ILocation;
  comments?: string[];
  attachments?: string[];
}

export interface IComment {
  _id: string;
  comment: string;
  user: IUser;
  createdAt?: string;
}

export interface ICommentRequestPayload {
  taskId: string;
  comment: string;
  user: string;
}

export interface ILocation {
  long: string;
  lat: string;
  radius?: string;
}

export const dummyTasks: ITask[] = [];
