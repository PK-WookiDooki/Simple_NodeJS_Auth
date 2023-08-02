import cookie from "cookiejs";
import React, { useState } from "react";
import { useCreateNewBlogMutation } from "../../features/apis/blogsApi";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const user = cookie.get("user") ? JSON.parse(cookie.get("user")) : null;

    const [blog, setBlog] = useState({
        title: "",
        description: "",
        userId: user?.id,
    });

    const nav = useNavigate();

    const [createNewBlog] = useCreateNewBlogMutation();

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await createNewBlog(blog);
            data?.success && nav("/blogs");
            setBlog({ title: "", description: "" });
        } catch (error) {
            console.error(error);
        }
    };

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
                <button
                    type="submit"
                    className=" px-5 py-2 rounded bg-blue-600 text-yellow-50"
                >
                    Create Now
                </button>
            </form>
        </section>
    );
};

export default CreateBlog;
