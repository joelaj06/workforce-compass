import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getApiHeaders } from "../../../utils/api/auth";

import { IReportRequestParam } from "./reports";

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getDailyAttendanceReport: builder.query<Blob, IReportRequestParam>({
      query: ({ date }) => {
        const url = `/reports/daily-attendance?date=${date}`;
        return {
          url,
          headers: getApiHeaders(),
          responseHandler(response) {
            return response.blob();
          },
        };
      },
    }),
    getAttendanceSummaryReport: builder.query<Blob, IReportRequestParam>({
      query: ({ startDate, endDate }) => {
        const url = `/reports/attendance-summary?startDate=${startDate}&endDate=${endDate}`;
        return {
          url,
          headers: getApiHeaders(),
          responseHandler(response) {
            return response.blob();
          },
        };
      },
    }),
    getGeoloactionReport: builder.query<Blob, IReportRequestParam>({
      query: ({ startDate, endDate }) => {
        const url = `/reports/geolocation?startDate=${startDate}&endDate=${endDate}`;
        return {
          url,
          headers: getApiHeaders(),
          responseHandler(response) {
            return response.blob();
          },
        };
      },
    }),
    getLeaveReport: builder.query<Blob, IReportRequestParam>({
      query: ({ startDate, endDate }) => {
        const url = `/reports/leave-management?startDate=${startDate}&endDate=${endDate}`;
        return {
          url,
          headers: getApiHeaders(),
          responseHandler(response) {
            return response.blob();
          },
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
