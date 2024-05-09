export interface IUser {
  id: number | string;
  first_name: string;
  last_name: string;
  image?: string;
  role: string;
  status: string;
  job_title: string;
  phone: string;
  location: string;
  email: string;
  address?: string;
}

export const dummyUsers: IUser[] = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "Admin",
    status: "Active",
    job_title: "CEO",
    phone: "123-456-7890",
    location: "New York, NY",
    address: "New York, NY",
    email: " john@example.com ",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Doe",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    role: "Admin",
    status: "Active",
    job_title: "CEO",
    phone: "123-456-7890",
    location: "New York, NY",
    address: "New York, NY",
    email: " jane@example.com ",
  },
  {
    id: 3,
    first_name: "Millicent",
    last_name: "Adkins",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "Admin",
    status: "Active",
    job_title: "CEO",
    phone: "123-456-7890",
    location: "New York, NY",
    address: "New York, NY",
    email: " millicent@example.com ",
  },
  {
    id: 4,
    first_name: "Ellen",
    last_name: "White",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    role: "Admin",
    status: "Active",
    job_title: "CEO",
    phone: "123-456-7890",
    location: "New York, NY",
    address: "New York, NY",
    email: " jane@example.com ",
  },
  {
    id: 5,
    first_name: "Jane",
    last_name: "Doe",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    role: "Admin",
    status: "Active",
    job_title: "CEO",
    phone: "123-456-7890",
    location: "New York, NY",
    address: "New York, NY",
    email: " jane@example.com ",
  },
];
