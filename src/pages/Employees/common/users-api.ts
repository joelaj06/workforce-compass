import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getApiHeaders } from "../../../utils/api/auth";
import {
  IRequestParams,
  IUser,
  PaginatedResponse,
  XPagination,
} from "./employee";
import { getPaginationMetaData } from "../../../utils/helper";

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
  }),
  tagTypes: ["IUser"],
});

export const { useGetUsersQuery, useLazyGetUsersQuery } = usersApi;
