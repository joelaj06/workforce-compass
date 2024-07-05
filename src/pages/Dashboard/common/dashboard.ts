import { IUser } from "../../Employees/common/employee";

export interface IDashboardSummary {
  total_users: number;
  total_teams: number;
  total_present: number;
  total_offices: number;
}
export interface ICurrentCheckIn {
  id: number;
  user: IUser;
  check_in: string;
  check_out: string;
  is_late: boolean;
}

export interface IAverageCheck {
  dates: string[];
  avgTimes: number[];
}

export interface IOnTimeWeeklyCheckIn {
  dates: string[];
  onTime: number[];
  late: number[];
}

export const dummyCurrentCheckIn: ICurrentCheckIn[] = [
  {
    id: 1,
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
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "2021-08-01 13:00:00",
    is_late: false,
  },
  {
    id: 2,
    user: {
      id: 1,
      first_name: "Jane",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Admin",
      status: "",
      job_title: "",
      phone: "",
      location: "",
      email: "",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "2021-08-01 13:00:00",
    is_late: false,
  },
  {
    id: 3,
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
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 4,
    user: {
      id: 1,
      first_name: "Jane",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Admin",
      status: "",
      job_title: "",
      phone: "",
      location: "",
      email: "",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 5,
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
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 6,
    user: {
      id: 1,
      first_name: "Jane",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Admin",
      status: "",
      job_title: "",
      phone: "",
      location: "",
      email: "",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 7,
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
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 8,
    user: {
      id: 1,
      first_name: "Jane",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Admin",
      status: "",
      job_title: "",
      phone: "",
      location: "",
      email: "",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 9,
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
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 10,
    user: {
      id: 1,
      first_name: "Jane",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Admin",
      status: "",
      job_title: "",
      phone: "",
      location: "",
      email: "",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
];
