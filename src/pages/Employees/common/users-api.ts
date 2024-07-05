import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getApiHeaders } from "../../../utils/api/auth";
import {
  IRequestParams,
  IUser,
  PaginatedResponse,
  XPagination,
} from "./employee";
import { getPaginationMetaData } from "../../../utils/helper";
import {
  IAttendanceDate,
  IUserAttendanceSummary,
} from "../../EmployeeDetails/common/employee_details";
import { ILeave } from "../../Leaves/common/leaves";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedResponse<IUser[]>, IRequestParams>({
      query: ({ pageIndex, pageSize, query }) => ({
        url: query
          ? `/users?search_filter=true&query=${query}&page=${pageIndex}&limit=${pageSize}`
          : `/users?page=${pageIndex}&limit=${pageSize}`,
        headers: getApiHeaders(),
      }),
      transformResponse: (response, meta) => ({
        pagination: getPaginationMetaData(meta) as XPagination,
        contents: response as IUser[],
      }),
    }),
    getUserDetails: builder.query<IUser, string>({
      query: (id) => ({
        url: `/users/${id}`,
        headers: getApiHeaders(),
      }),
      providesTags: ["IUser"],
    }),
    getUserAttendanceDate: builder.query<IAttendanceDate[], string>({
      query: (id) => ({
        url: `/attendance_dates/${id}`,
        headers: getApiHeaders(),
      }),
      providesTags: ["IAttendanceDate"],
    }),
    getUserAttendanceSummary: builder.query<IUserAttendanceSummary, string>({
      query: (id) => ({
        url: `/attendance_dates/summary?userId=${id}`,
        headers: getApiHeaders(),
      }),
      providesTags: ["IUserAttendanceSummary"],
    }),
    getUserLeaves: builder.query<ILeave[], IRequestParams>({
      query: ({ userId, endDate, startDate, status }) => ({
        url: status
          ? `leaves/user/${userId}?date_filter=true&start_date=${startDate}&end_date=${endDate}&status_filter=true&status=${status}`
          : !startDate
          ? `leaves/user/${userId}`
          : `leaves/user/${userId}?date_filter=true&start_date=${startDate}&end_date=${endDate}&status_filter=true&status=approved`,
        headers: getApiHeaders(),
      }),
      providesTags: ["ILeaves"],
    }),
  }),
  tagTypes: ["IUser", "IAttendanceDate", "IUserAttendanceSummary", "ILeaves"],
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserDetailsQuery,
  useGetUserAttendanceDateQuery,
  useGetUserAttendanceSummaryQuery,
  useGetUserLeavesQuery,
  useLazyGetUserDetailsQuery,
  useLazyGetUserAttendanceDateQuery,
  useLazyGetUserAttendanceSummaryQuery,
  useLazyGetUserLeavesQuery,
} = usersApi;
