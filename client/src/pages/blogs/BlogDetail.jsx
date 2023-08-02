import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    useDeleteBlogMutation,
    useGetSingleBlogQuery,
} from "../../features/apis/blogsApi";
import { useGetUsersQuery } from "../../features/apis/usersApi";

const BlogDetail = () => {
    const { id } = useParams();
    const { data: blogData } = useGetSingleBlogQuery(id);
    const { data: userData } = useGetUsersQuery();
    const [deleteBlog] = useDeleteBlogMutation();

    const blog = blogData?.data;
    const users = userData?.data;
    const currentUser = users?.find((user) => user.id === blog?.userId);
    const nav = useNavigate();

    const handleDeleteBlog = async () => {
        try {
            const { data } = await deleteBlog(id);
            data?.success && nav("/blogs");
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="py-5 text-white w-full">
            <article className=" mx-auto max-w-2xl bg-gray-200 p-3 rounded text-black">
                <h2 className="text-xl font-semibold mb-5"> {blog?.title} </h2>
                <p className=" whitespace-pre-line"> {blog?.description} </p>
                <div className="mt-5 flex flex-col gap-2">
                    <p className="italic">
                        {" "}
                        Written By{" "}
                        <span className="underline underline-offset-2">
                            {" "}
                            {currentUser?.name}{" "}
                        </span>
                    </p>
                    <div className="flex items-center gap-5 ">
                        <Link
                            to={".."}
                            className="px-5 py-2 bg-black rounded w-fit text-white hover:bg-black/80 duration-200"
                        >
                            Back{" "}
                        </Link>
                        <Link
                            to={`/blogs/edit_blog/${id}`}
                            className="px-5 py-2 bg-green-500 rounded w-fit text-white hover:bg-green-600 duration-200"
                        >
                            Edit Blog{" "}
                        </Link>
                        <button
                            onClick={handleDeleteBlog}
                            className="px-5 py-2 bg-red-500 rounded w-fit
                        text-white hover:bg-red-600 duration-200 ml-auto"
                        >
                            Delete Blog
                        </button>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default BlogDetail;
