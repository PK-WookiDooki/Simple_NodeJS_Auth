import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9990" }),
  tagTypes: ["api"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/",
      }),
      providesTags: ["api"],
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["api"],
    }),

    loginAccount: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["api"],
    }),

    logoutAccount: builder.mutation({
      query: (id) => ({
        url: `/logout/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["api"],
    }),

    remove: builder.mutation({
      query: ({ id, password }) => ({
        url: `/remove/${id}`,
        method: "DELETE",
        body: { password },
      }),
      invalidatesTags: ["api"],
    }),

    changePassword: builder.mutation({
      query: ({ id, passwords }) => ({
        url: `/change_password/${id}`,
        method: "POST",
        body: passwords,
      }),
      invalidatesTags: ["api"],
    }),

    changeUserName: builder.mutation({
      query: ({ id, user }) => ({
        url: `/update_profile/${id}`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["api"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useLoginAccountMutation,
  useLogoutAccountMutation,
  useRemoveMutation,
  useChangePasswordMutation,
  useChangeUserNameMutation,
} = usersApi;
