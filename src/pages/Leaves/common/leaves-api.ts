import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getApiHeaders } from "../../../utils/api/auth";

import { getPaginationMetaData } from "../../../utils/helper";
import { ILeave } from "../../Leaves/common/leaves";
import {
  IRequestParams,
  PaginatedResponse,
  XPagination,
} from "../../Employees/common/employee";

export const leavesApi = createApi({
  reducerPath: "leavesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getLeaves: builder.query<PaginatedResponse<ILeave[]>, IRequestParams>({
      query: ({ userId, endDate, startDate, status, pageIndex, pageSize }) => {
        let url = `/leaves?page=${pageIndex}&limit=${pageSize}`;
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

      transformResponse: (response, meta) => ({
        pagination: getPaginationMetaData(meta) as XPagination,
        contents: response as ILeave[],
      }),
      providesTags: ["ILeave"],
    }),

    updateLeaveStatus: builder.mutation<ILeave, { id: string; status: string }>(
      {
        query: ({ id, status }) => ({
          url: `/leaves/${id}`,
          method: "PUT",
          headers: getApiHeaders(),
          body: {
            status,
          },
        }),
        //invalidatesTags: ["ILeave"],
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          const { data: updatedLeave } = await queryFulfilled;
          const patchResult = dispatch(
            leavesApi.util.updateQueryData(
              "getLeaves",
              {} as IRequestParams,
              (draft) => {
                Object.assign(draft, updatedLeave);
              }
            )
          );
          try {
            await queryFulfilled;
          } catch (error) {
            patchResult.undo();
          }
        },
      }
    ),
  }),
  tagTypes: ["ILeave"],
});

export const {
  useGetLeavesQuery,
  useLazyGetLeavesQuery,
  useUpdateLeaveStatusMutation,
} = leavesApi;
