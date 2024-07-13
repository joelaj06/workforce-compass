import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getApiHeaders } from "../../../utils/api/auth";

import { IReportRequestParam } from "./reports";

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getDailyAttendanceReport: builder.query<void, IReportRequestParam>({
      query: ({ date }) => {
        const url = `/reports/daily-attendance?date=${date}`;
        return {
          url,
          headers: getApiHeaders(),
        };
      },
    }),
    getAttendanceSummaryReport: builder.query<void, IReportRequestParam>({
      query: ({ startDate, endDate }) => {
        const url = `/reports/attendance-summary?startDate=${startDate}&endDate=${endDate}`;
        return {
          url,
          headers: getApiHeaders(),
        };
      },
    }),
    getGeoloactionReport: builder.query<void, IReportRequestParam>({
      query: ({ startDate, endDate }) => {
        const url = `/reports/geolocation?startDate=${startDate}&endDate=${endDate}`;
        return {
          url,
          headers: getApiHeaders(),
        };
      },
    }),
    getLeaveReport: builder.query<void, IReportRequestParam>({
      query: ({ startDate, endDate }) => {
        const url = `/reports/leave-management?startDate=${startDate}&endDate=${endDate}`;
        return {
          url,
          headers: getApiHeaders(),
        };
      },
    }),
  }),
});

export const {
  useGetDailyAttendanceReportQuery,
  useLazyGetDailyAttendanceReportQuery,
  useGetAttendanceSummaryReportQuery,
  useGetGeoloactionReportQuery,
  useGetLeaveReportQuery,
  useLazyGetLeaveReportQuery,
  useLazyGetAttendanceSummaryReportQuery,
  useLazyGetGeoloactionReportQuery,
} = reportsApi;
