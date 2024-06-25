export interface ILoginRequestPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
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
  token: string;
}

export interface IErrorResponse {
  message: string;
  status?: string;
  status_code?: number;
  stack?: string;
}

export interface IErrorData {
  data: IErrorResponse;
}
