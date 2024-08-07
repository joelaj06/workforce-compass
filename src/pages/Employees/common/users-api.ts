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
    getUserLeavesWithoutPaging: builder.query<ILeave[], IRequestParams>({
      query: ({ userId, endDate, startDate, status }) => {
        let url = `/leaves`;
        const params = new URLSearchParams();

        if (userId) {
          url += `/user/${userId}`;
        }

        if (startDate) {
          params.append("date_filter", "true");
          params.append("start_date", startDate);
        }

        if (endDate) {
          params.append("end_date", endDate);
        }

        if (status) {
          params.append("status_filter", "true");
          params.append("status", status);
        } else if (startDate) {
          params.append("status_filter", "true");
          params.append("status", "approved");
        }

        const queryString = params.toString();
        if (queryString) {
          url += `?${queryString}`;
        }

        return {
          url,
          headers: getApiHeaders(),
        };
      },
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
  useGetUserLeavesWithoutPagingQuery,
  useLazyGetUserLeavesWithoutPagingQuery,
  useLazyGetUserDetailsQuery,
  useLazyGetUserAttendanceDateQuery,
  useLazyGetUserAttendanceSummaryQuery,
} = usersApi;
