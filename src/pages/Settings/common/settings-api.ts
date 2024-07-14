import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getApiHeaders } from "../../../utils/api/auth";

import { IOrganization, IOrganizationRequestPayload } from "./settings";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getOrganizations: builder.query<IOrganization[], void>({
      query: () => {
        const url = "/organization";

        return {
          url,
          headers: getApiHeaders(),
        };
      },

      providesTags: ["IOrganization"],
    }),

    updateOrganization: builder.mutation<
      IOrganization,
      IOrganizationRequestPayload
    >({
      query: (payload) => ({
        url: `/organization/${payload._id}`,
        method: "PUT",
        headers: getApiHeaders(),
        body: payload,
      }),
      //invalidatesTags: ["ILeave"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data: updatedLeave } = await queryFulfilled;
        const patchResult = dispatch(
          settingsApi.util.updateQueryData(
            "getOrganizations",
            undefined,
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
  }),
  tagTypes: ["IOrganization"],
});

export const {
  useGetOrganizationsQuery,
  useUpdateOrganizationMutation,
  useLazyGetOrganizationsQuery,
} = settingsApi;
