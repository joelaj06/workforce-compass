export interface ILoggedInUser {
  user: IUser;
}
export interface IUser {
  _id: string;
  id?: string;
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
