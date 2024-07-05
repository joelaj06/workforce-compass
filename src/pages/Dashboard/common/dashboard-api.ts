import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAverageCheck,
  ICurrentCheckIn,
  IDashboardSummary,
  IOnTimeWeeklyCheckIn,
} from "./dashboard";
import { getApiHeaders } from "../../../utils/api/auth";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<IDashboardSummary, void>({
      query: () => ({
        url: "/dashboard/dashboard_summary",
        headers: getApiHeaders(),
      }),
      providesTags: ["IDashboardSummary"],
    }),
    getAverageCheckInOfTheWeek: builder.query<IAverageCheck, void>({
      query: () => ({
        url: "/averageChecksOfTheWeek/checkIn",
        headers: getApiHeaders(),
      }),
      providesTags: ["IAverageCheck"],
    }),
    getAverageCheckOutOfTheWeek: builder.query<IAverageCheck, void>({
      query: () => ({
        url: "/averageChecksOfTheWeek/checkOut",
        headers: getApiHeaders(),
      }),
      providesTags: ["IAverageCheck"],
    }),
    getOnTimeCheckInOfTheWeek: builder.query<IOnTimeWeeklyCheckIn, void>({
      query: () => ({
        url: "/dashboard/onTimeRecordOfTheWeek",
        headers: getApiHeaders(),
      }),
      providesTags: ["IOnTimeWeeklyCheckIn"],
    }),
    getCurrentPresentUsers: builder.query<ICurrentCheckIn[], string>({
      query: (query) => ({
        url:
          query != null && query != undefined && query != ""
            ? `/dashboard/currentPresentUsers?query=${query}`
            : "/dashboard/currentPresentUsers",
        headers: getApiHeaders(),
      }),
      providesTags: ["ICurrentCheckIn"],
    }),
  }),
  tagTypes: [
    "IDashboardSummary",
    "IAverageCheck",
    "IOnTimeWeeklyCheckIn",
    "ICurrentCheckIn",
  ],
});

export const {
  useGetDashboardSummaryQuery,
  useLazyGetDashboardSummaryQuery,
  useGetAverageCheckInOfTheWeekQuery,
  useGetAverageCheckOutOfTheWeekQuery,
  useLazyGetAverageCheckInOfTheWeekQuery,
  useLazyGetAverageCheckOutOfTheWeekQuery,
  useGetOnTimeCheckInOfTheWeekQuery,
  useLazyGetOnTimeCheckInOfTheWeekQuery,
  useGetCurrentPresentUsersQuery,
  useLazyGetCurrentPresentUsersQuery,
} = dashboardApi;
