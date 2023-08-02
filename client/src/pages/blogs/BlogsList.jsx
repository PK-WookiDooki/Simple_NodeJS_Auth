import React from "react";
import { useGetAllBlogsQuery } from "../../features/apis/blogsApi";
import BlogCard from "./BlogCard";

const BlogsList = () => {
    const { data } = useGetAllBlogsQuery();

    const blogs = data?.data;

    const renderBlogs = blogs ? (
        blogs.map((blog) => {
            return <BlogCard key={blog.id} blog={blog} />;
        })
    ) : (
        <div>
            <h2>There is no blog post for now!</h2>
        </div>
    );

    return (
        <section className="py-3 text-white w-full">
            <h2 className="text-2xl font-bold mb-3 text-center">
                Blogs list page!
            </h2>
            <div className="flex flex-wrap justify-center gap-5 ">
                {" "}
                {renderBlogs}{" "}
            </div>
        </section>
    );
};

export default BlogsList;
