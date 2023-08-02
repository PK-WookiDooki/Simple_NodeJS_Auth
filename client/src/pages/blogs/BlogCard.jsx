import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    const modDesc =
        blog.description.length > 100
            ? blog.description.substring(0, 100) + " . . ."
            : blog.description;

    return (
        <article className="p-3 flex flex-col gap-3 border border-gray-500 rounded w-full max-w-sm">
            <h3 className="text-lg font-medium"> {blog.title} </h3>
            <p className="text-gray-400 mb-4"> {modDesc} </p>
            <div className="mt-auto">
                <Link
                    className="px-3 py-2 bg-gray-300 rounded text-black hover:bg-white duration-200"
                    to={`/blogs/${blog.id}`}
                >
                    See More
                </Link>
            </div>
        </article>
    );
};

export default BlogCard;
