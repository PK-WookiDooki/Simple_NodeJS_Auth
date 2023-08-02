import cookie from "cookiejs";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    const token =
        cookie.get("token") !== undefined ? cookie.get("token") : null;
    const user =
        cookie.get("user") !== undefined
            ? JSON.parse(cookie.get("user"))
            : null;
    return (
        <section className="w-full bg-gray-200 shadow-md">
            <div className="py-5 w-[85%] mx-auto flex items-center justify-between flex-col gap-3 md:flex-row ">
                <nav className=" ">
                    {token ? (
                        <div className="flex gap-3 items-center">
                            <NavLink
                                className=" nav-link font-medium text-gray-500 px-5 py-2 hover:bg-black hover:text-white rounded duration-200"
                                to={"/"}
                            >
                                {" "}
                                Home{" "}
                            </NavLink>
                            <NavLink
                                className=" nav-link font-medium text-gray-500 px-5 py-2 hover:bg-black hover:text-white rounded duration-200"
                                to={"blogs"}
                            >
                                {" "}
                                Blogs{" "}
                            </NavLink>
                            <NavLink
                                className=" nav-link font-medium text-gray-500 px-5 py-2 hover:bg-black hover:text-white rounded duration-200"
                                to={"add_blog"}
                            >
                                Create Blog
                            </NavLink>
                            {/*<Link to={"about"}> About </Link>
                            <Link to={"contact"}> Contact </Link>*/}
                        </div>
                    ) : (
                        <div className="flex gap-3 items-center">
                            <Link
                                className=" nav-link font-medium text-gray-500 px-3 py-1 hover:bg-black hover:text-white rounded duration-200"
                                to={"/register"}
                            >
                                {" "}
                                Register{" "}
                            </Link>
                            <Link
                                className=" nav-link font-medium text-gray-500 px-3 py-1 hover:bg-black hover:text-white rounded duration-200"
                                to={"/login"}
                            >
                                {" "}
                                Login{" "}
                            </Link>
                        </div>
                    )}
                </nav>
                {token ? (
                    <div className="p-2 border bg-white border-gray-400 rounded-md shadow-md cursor-pointer relative group">
                        <h2 className="font-medium"> {user?.name} </h2>
                        <p className="text-sm"> {user?.email} </p>

                        <div className="absolute hidden hover:flex group-hover:flex flex-col top-16 bg-gray-200 shadow p-1 rounded drop-shadow-md left-1/2 -translate-x-1/2 border">
                            <Link
                                to={"change_name"}
                                className=" min-w-max px-3 py-1 rounded hover:bg-blue-600 text-blue-600 hover:text-white duration-200"
                            >
                                Change Name
                            </Link>
                            <Link
                                to={"change_password"}
                                className=" min-w-max px-3 py-1 rounded hover:bg-green-600 text-green-600 hover:text-white duration-200"
                            >
                                Change Password
                            </Link>
                            <Link
                                to={"remove_account"}
                                className=" min-w-max px-3 py-1 rounded hover:bg-red-600 text-red-600 hover:text-white duration-200"
                            >
                                Delete Account
                            </Link>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </section>
    );
};

export default Navbar;
