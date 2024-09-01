import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getApiHeaders } from "../../../utils/api/auth";

import { IRequestParams } from "../../Employees/common/employee";
import { ICommentRequestPayload, ITask, ITaskRequestPayload } from "./task";
import { IComment } from "./task";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getTasksWithoutPaging: builder.query<ITask[], IRequestParams>({
      query: ({ query }) => {
        const url = query ? `/tasks?search=${query}` : `/tasks`;
        return {
          url,
          headers: getApiHeaders(),
        };
      },

      providesTags: ["ITask"],
    }),
    getTask: builder.query<ITask, string>({
      query: (id) => {
        const url = `/tasks/${id}`;
        return {
          url,
          headers: getApiHeaders(),
        };
      },

      providesTags: ["ITask"],
    }),

    addTask: builder.mutation<ITask, ITaskRequestPayload>({
      query: (payload) => ({
        url: "/tasks",
        method: "POST",
        headers: getApiHeaders(),
        body: payload,
      }),

      //TODO fix cache update on team mutation events
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data: newTeam } = await queryFulfilled;
        const patchResult = dispatch(
          taskApi.util.updateQueryData(
            "getTasksWithoutPaging",
            { query: undefined },
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

    updateTask: builder.mutation<ITask, ITaskRequestPayload>({
      query: (payload) => ({
        url: `/tasks/${payload.id}`,
        method: "PUT",
        headers: getApiHeaders(),
        body: payload,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data: updatedLeave } = await queryFulfilled;
        const patchResult = dispatch(
          taskApi.util.updateQueryData(
            "getTasksWithoutPaging",
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
    deleteTask: builder.mutation<ITask, ITask>({
      query: (payload) => ({
        url: `/tasks/${payload._id}`,
        method: "DELETE",
        headers: getApiHeaders(),
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData(
            "getTasksWithoutPaging",
            { query: undefined } as IRequestParams,
            (draft) => {
              return draft.filter((task: ITask) => task._id !== args._id);
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
    //add comment to task
    addComment: builder.mutation<IComment, ICommentRequestPayload>({
      query: (payload) => ({
        url: `/tasks/${payload.taskId}/comments`,
        method: "POST",
        headers: getApiHeaders(),
        body: payload,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData(
            "getTasksWithoutPaging",
            {} as IRequestParams,
            (draft) => {
              Object.assign(draft, args);
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

    updateComment: builder.mutation<IComment, IComment>({
      query: (payload) => ({
        url: `/tasks/comments/${payload._id}`,
        method: "PUT",
        headers: getApiHeaders(),
        body: payload,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData(
            "getTasksWithoutPaging",
            {} as IRequestParams,
            (draft) => {
              Object.assign(draft, args);
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

  tagTypes: ["ITask"],
});

export const {
  useGetTasksWithoutPagingQuery,
  useLazyGetTasksWithoutPagingQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useGetTaskQuery,
  useLazyGetTaskQuery,
} = taskApi;
