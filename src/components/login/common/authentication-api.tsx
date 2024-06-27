import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequestPayload, ILoginResponse } from "./auth";
import { IUser } from "../../../pages/Employees/common/employee";
import { getApiHeaders } from "../../../utils/api/auth";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequestPayload>({
      query: (payload) => ({
        url: "/users/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["ILoginResponse"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["ILoginResponse"],
    }),
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: "/users/user",
        headers: getApiHeaders(),
      }),
      providesTags: ["IUser"],
    }),
  }),
  tagTypes: ["ILoginResponse", "IUser"],
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
} = authenticationApi;
