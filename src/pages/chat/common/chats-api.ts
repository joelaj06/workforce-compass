import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getApiHeaders } from "../../../utils/api/auth";
import {
  IChat,
  IInitiateChat,
  IMessage,
  IMessageRequestPayload,
  InitiateChatRequestPayload,
} from "./chat";

export const chatsApi = createApi({
  reducerPath: "chatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getChats: builder.query<IChat[], void>({
      query: () => {
        const url = "/chats";

        return {
          url,
          headers: getApiHeaders(),
        };
      },

      providesTags: ["IChat"],
    }),
    getMessages: builder.query<IMessage[], string>({
      query: (chatId) => {
        const url = `/chats/${chatId}/messages`;
        return {
          url,
          headers: getApiHeaders(),
        };
      },

      providesTags: ["IChat"],
    }),

    initiateChat: builder.mutation<IInitiateChat, InitiateChatRequestPayload>({
      query: (payload) => ({
        url: `/chats/initiate`,
        method: "POST",
        headers: getApiHeaders(),
        body: payload,
      }),
      //invalidatesTags: ["ILeave"],
    }),

    sendMessage: builder.mutation<IMessage, IMessageRequestPayload>({
      query: (payload) => ({
        url: `/chats/${payload.chatId}/message`,
        method: "POST",
        headers: getApiHeaders(),
        body: payload,
      }),
      //invalidatesTags: ["ILeave"],
    }),
  }),
  tagTypes: ["IChat"],
});

export const {
  useGetChatsQuery,
  useGetMessagesQuery,
  useInitiateChatMutation,
  useSendMessageMutation,
  useLazyGetChatsQuery,
  useLazyGetMessagesQuery,
} = chatsApi;
