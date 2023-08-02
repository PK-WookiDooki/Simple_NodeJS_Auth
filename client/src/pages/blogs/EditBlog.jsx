import cookie from "cookiejs";
import React, { useState } from "react";
import {
    useGetSingleBlogQuery,
    useUpdateExistingBlogMutation,
} from "../../features/apis/blogsApi";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
    const { id } = useParams();
    const { data } = useGetSingleBlogQuery(id);
    const currentBlog = data?.data;

    const [blog, setBlog] = useState({
        title: currentBlog?.title,
        description: currentBlog?.description,
        userId: currentBlog?.userId,
    });

    const nav = useNavigate();

    const [updateExistingBlog] = useUpdateExistingBlogMutation();

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await updateExistingBlog({ id, blog });
            data?.success && nav("/blogs");
            setBlog({ title: "", description: "" });
        } catch (error) {
            console.error(error);
        }
    };

    if (!currentBlog) {
        return <h2> Loading . . . please wait a few second! </h2>;
    }

    return (
        <section className=" max-w-lg w-full mx-auto mt-5 shadow-md p-5">
            <h2 className="text-2xl mb-3 text-white">Create New Blog</h2>

            <form onSubmit={handleSubmit} action="#">
                <div className="mb-3">
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Blog title"
                        className="w-full h-10 rounded outline-none px-2 border border-black caret-black"
                        value={blog.title}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        name="description"
                        rows="6"
                        onChange={handleChange}
                        placeholder="Blog Content"
                        value={blog.description}
                        className="w-full rounded outline-none p-2 border border-black caret-black"
                    ></textarea>
                </div>
                <div className="flex gap-5">
                    <Link
                        to={`/blogs/${id}`}
                        className="px-5 py-2 bg-black rounded w-fit text-white hover:bg-black/80 duration-200"
                    >
                        Back{" "}
                    </Link>
                    <button
                        type="submit"
                        className=" px-5 py-2 rounded bg-green-600 text-yellow-50 hover:bg-green-700 duration-200z"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditBlog;
