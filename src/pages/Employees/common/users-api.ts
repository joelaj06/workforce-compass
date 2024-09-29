import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getApiHeaders } from "../../../utils/api/auth";
import {
  AddUserReqeustPayload,
  IRequestParams,
  IRole,
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
      providesTags: ["IUser"],
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

    updateUser: builder.mutation<IUser, IUser>({
      query: (payload) => ({
        url: `/users/${payload._id}`,
        method: "PUT",
        headers: getApiHeaders(),
        body: payload,
      }),
      invalidatesTags: ["IUser"],
    }),

    deleteUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: getApiHeaders(),
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        if (args) console.log(args);
        const { data: deletedUser } = await queryFulfilled;
        // dispatch(
        //   usersApi.endpoints.getUsers.initiate(
        //     { pageIndex: 1, pageSize: 10 },
        //     { forceRefetch: true }
        //   )
        // );

        dispatch(
          usersApi.util.updateQueryData(
            "getUsers",
            { pageIndex: 1, pageSize: 10 } as IRequestParams,
            (draft) => {
              console.log(JSON.stringify(draft.contents));
              console.log("someh");
              const paginatedRes: PaginatedResponse<IUser[]> = {
                contents: (draft.contents = draft?.contents.filter(
                  (user) => user._id !== deletedUser._id
                )),
                pagination: {
                  totalPages: 0,
                  pageCount: 0,
                },
              };
              return paginatedRes;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          //  patchResult.undo();
        }
      },
      // invalidatesTags: ["IUser"],
    }),

    addUser: builder.mutation<IUser, AddUserReqeustPayload>({
      query: (payload) => ({
        url: `/users`,
        method: "POST",
        headers: getApiHeaders(),
        body: payload,
      }),
      invalidatesTags: ["IUser"],
    }),

    getRoles: builder.query<IRole[], void>({
      query: () => ({
        url: `/roles`,
        headers: getApiHeaders(),
      }),
      providesTags: ["IRole"],
    }),
  }),

  tagTypes: [
    "IUser",
    "IAttendanceDate",
    "IUserAttendanceSummary",
    "ILeaves",
    "IRole",
  ],
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
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAddUserMutation,
  useGetRolesQuery,
  useLazyGetRolesQuery,
} = usersApi;
