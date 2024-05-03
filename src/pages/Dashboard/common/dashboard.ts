import { User } from "../../Employees/common/employee";

export interface ICurrentCheckIn {
  id: number;
  user: User;
  check_in: string;
  check_out: string;
  is_late: boolean;
}

export const dummyCurrentCheckIn: ICurrentCheckIn[] = [
  {
    id: 1,
    user: {
      first_name: "John",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Admin",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "2021-08-01 13:00:00",
    is_late: false,
  },
  {
    id: 2,
    user: {
      first_name: "Jane",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Admin",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "2021-08-01 13:00:00",
    is_late: false,
  },
  {
    id: 3,
    user: {
      first_name: "John",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Admin",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 4,
    user: {
      first_name: "Jane",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Admin",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 5,
    user: {
      first_name: "John",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Admin",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 6,
    user: {
      first_name: "Jane",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Admin",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 7,
    user: {
      first_name: "John",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Admin",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 8,
    user: {
      first_name: "Jane",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Admin",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 9,
    user: {
      first_name: "John",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Admin",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
  {
    id: 10,
    user: {
      first_name: "Jane",
      last_name: "Doe",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Admin",
    },
    check_in: "2021-08-01 12:00:00",
    check_out: "",
    is_late: false,
  },
];
