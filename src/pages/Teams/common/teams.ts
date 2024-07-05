import { IUser } from "../../Employees/common/employee";

export interface ITeam {
  _id: string;
  name: string;
  team_leader?: string;
  members: IUser[];
  createdAt?: string;
  status: "active" | "inactive";
  notes?: string;
  code?: string;
}

export const dummyTeams: ITeam[] = [
  {
    _id: "22222222222222",
    name: "Team 1",
    members: [
      {
        _id: 1,
        first_name: "John",
        last_name: "Doe",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        role: "admin",
        status: "active",
        job_title: "CEO",
        phone: "1234567890",
        location: "New York",
        email: "email",
        address: "address",
      },
      {
        _id: 2,
        first_name: "Jane",
        last_name: "Doe",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        role: "admin",
        status: "active",
        job_title: "CEO",
        phone: "1234567890",
        location: "New York",
        email: "email",
        address: "address",
      },
      {
        _id: 3,
        first_name: "Millicent",
        last_name: "Adkins",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        role: "admin",
        status: "active",
        job_title: "CEO",
        phone: "1234567890",
        location: "New York",
        email: "email",
        address: "address",
      },
    ],
    status: "active",
    notes: "Team 1 is active",
  },
  {
    _id: "33333333333333",
    name: "Team 2",
    members: [
      {
        _id: 1,
        first_name: "John",
        last_name: "Doe",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        role: "admin",
        status: "active",
        job_title: "CEO",
        phone: "1234567890",
        location: "New York",
        email: "email",
        address: "address",
      },
      {
        _id: 2,
        first_name: "Jane",
        last_name: "Doe",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        role: "admin",
        status: "active",
        job_title: "CEO",
        phone: "1234567890",
        location: "New York",
        email: "email",
        address: "address",
      },
    ],
    status: "active",
    notes: "Team 2 is active",
  },
];
