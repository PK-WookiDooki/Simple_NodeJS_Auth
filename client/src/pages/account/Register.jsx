import React, { useState } from "react";
import { useCreateUserMutation } from "../../features/apis/usersApi";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  const [createUser] = useCreateUserMutation();
  const nav = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      if (user) {
        const { data } = await createUser(user);
        console.log(data);
        setError(data?.message);
        data?.success && nav("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full p-10 min-h-screen bg-slate-800 flex items-center justify-center">
      <div className="w-96 mx-auto border shadow p-5 rounded-sm bg-gray-300">
        <h2 className="text-lg font-semibold mb-5"> Register Account </h2>

        {error ? <p className="text-red-600 mb-2 "> {error} </p> : ""}
        <form onSubmit={handleSubmit} action="">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full h-10 rounded-sm outline-none px-2 border border-black"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full h-10 rounded-sm outline-none px-2 border border-black"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full h-10 rounded-sm outline-none px-2 border border-black"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-1 mb-3">
            <p> Already have an account ? </p>
            <Link to={"/login"} className="text-blue-500">
              {" "}
              Login
            </Link>
          </div>
          <button
            type="submit"
            className=" px-5 py-1 rounded-sm bg-blue-600 text-yellow-50"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
