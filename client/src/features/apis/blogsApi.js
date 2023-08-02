import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const blogsApi = createApi({
    reducerPath: "blogs",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9990/blogs" }),
    tagTypes: ["blogs"],
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => ({
                url: "/",
            }),
            providesTags: ["blogs"],
        }),
        createNewBlog: builder.mutation({
            query: (blog) => ({
                url: "/",
                method: "POST",
                body: blog,
            }),
            invalidatesTags: ["blogs"],
        }),
        getSingleBlog: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: ["blogs"],
        }),
        updateExistingBlog: builder.mutation({
            query: ({ id, blog }) => ({
                url: `/${id}`,
                method: "PUT",
                body: blog,
            }),
            invalidatesTags: ["blogs"],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["blogs"],
        }),
    }),
});

export const {
    useGetAllBlogsQuery,
    useCreateNewBlogMutation,
    useGetSingleBlogQuery,
    useUpdateExistingBlogMutation,
    useDeleteBlogMutation,
} = blogsApi;
