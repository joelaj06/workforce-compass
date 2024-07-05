export interface ILoggedInUser {
  user: IUser;
}
export interface IUser {
  _id: number | string;
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
  token?: string;
}

export interface IRequestParams {
  pageIndex?: number;
  pageSize?: number;
  query?: string;
  startDate?: string;
  endDate?: string;
  userId?: string;
  status?: string;
}

export interface PaginatedResponse<T> {
  contents: T;
  pagination: XPagination;
}

export interface XPagination {
  totalPages: number;
  pageCount: number;
  totalCount?: number;
}

export const dummyUsers: IUser[] = [
  {
    _id: 1,
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
    _id: 2,
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
    _id: 3,
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
    _id: 4,
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
    _id: 5,
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
