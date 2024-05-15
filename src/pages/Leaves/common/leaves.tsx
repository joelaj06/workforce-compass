import { IUser } from "../../Employees/common/employee";

export interface ILeaves {
  _id: string;
  user: IUser;
  status: "Pending" | "Declined" | "Approved";
  notes: string;
  from_date?: string;
  to_date?: string;
  days?: string;
  updatedAt: string;
  date: string;
  createdAt: string;
  title: string;
  approved_by?: string;
}

export const dummyLeaves: ILeaves[] = [
  {
    _id: "34432222222222",
    user: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Admin",
      status: "",
      job_title: "",
      phone: "",
      location: "",
      email: "",
      address: "",
    },
    title: "Break Leave",
    status: "Pending",
    notes: "I need to take a break",
    updatedAt: "2021-09-01T00:00:00.000Z",
    date: "2021-09-01T00:00:00.000Z",
    createdAt: "2021-09-01T00:00:00.000Z",
    from_date: "2021-09-01T00:00:00.000Z",
    to_date: "2021-09-01T00:00:00.000Z",
    days: "1",
    approved_by: "John Doe",
  },
  {
    _id: "34432222222222",
    user: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Admin",
      status: "",
      job_title: "",
      phone: "",
      location: "",
      email: "",
      address: "",
    },
    title: "Break Leave",
    status: "Pending",
    notes: "I need to take a break",
    updatedAt: "2021-09-01T00:00:00.000Z",
    date: "2021-09-01T00:00:00.000Z",
    createdAt: "2021-09-01T00:00:00.000Z",
    from_date: "2021-09-01T00:00:00.000Z",
    to_date: "2021-09-01T00:00:00.000Z",
    days: "1",
    approved_by: "John Doe",
  },
  {
    _id: "34432222222222",
    user: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Admin",
      status: "",
      job_title: "",
      phone: "",
      location: "",
      email: "",
      address: "",
    },
    title: "Break Leave",
    status: "Declined",
    notes: "I need to take a break",
    updatedAt: "2021-09-01T00:00:00.000Z",
    date: "2021-09-01T00:00:00.000Z",
    createdAt: "2021-09-01T00:00:00.000Z",
    from_date: "2021-09-01T00:00:00.000Z",
    to_date: "2021-09-01T00:00:00.000Z",
    days: "1",
    approved_by: "John Doe",
  },
];
