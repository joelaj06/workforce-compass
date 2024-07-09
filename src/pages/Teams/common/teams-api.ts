import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getApiHeaders } from "../../../utils/api/auth";

import { IRequestParams } from "../../Employees/common/employee";
import { ITeam, ITeamRequestPayload } from "./teams";

export const teamsApi = createApi({
  reducerPath: "teamsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getTeamsWithoutPaging: builder.query<ITeam[], IRequestParams>({
      query: ({ query }) => {
        const url = query ? `/teams?search=${query}` : `/teams`;
        return {
          url,
          headers: getApiHeaders(),
        };
      },

      providesTags: ["ITeam"],
    }),

    addTeam: builder.mutation<ITeam, ITeamRequestPayload>({
      query: (payload) => ({
        url: "/teams",
        method: "POST",
        headers: getApiHeaders(),
        body: payload,
      }),

      //TODO fix cache update on team mutation events
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data: newTeam } = await queryFulfilled;
        const patchResult = dispatch(
          teamsApi.util.updateQueryData(
            "getTeamsWithoutPaging",
            {} as IRequestParams,
            (draft) => {
              draft.push(newTeam);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    updateTeam: builder.mutation<ITeam, ITeamRequestPayload>({
      query: (payload) => ({
        url: `/teams/${payload.id}`,
        method: "PUT",
        headers: getApiHeaders(),
        body: payload,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data: updatedLeave } = await queryFulfilled;
        const patchResult = dispatch(
          teamsApi.util.updateQueryData(
            "getTeamsWithoutPaging",
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
    }),
    deleteTeam: builder.mutation<ITeam, string>({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
        headers: getApiHeaders(),
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          teamsApi.util.updateQueryData(
            "getTeamsWithoutPaging",
            {} as IRequestParams,
            (draft) => {
              draft.filter((team) => team._id !== args);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),

  tagTypes: ["ITeam"],
});

export const {
  useGetTeamsWithoutPagingQuery,
  useUpdateTeamMutation,
  useLazyGetTeamsWithoutPagingQuery,
  useDeleteTeamMutation,
  useAddTeamMutation,
} = teamsApi;
