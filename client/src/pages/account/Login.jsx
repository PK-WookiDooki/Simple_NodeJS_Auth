import React, { useState } from "react";
import { useLoginAccountMutation } from "../../features/apis/usersApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/services/usersSlice";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loginAccount] = useLoginAccountMutation();
  const nav = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginAccount(user);
      //console.log(data);
      dispatch(addUser({ user: data?.user, token: data?.token }));
      if (data?.success) {
        nav("/");
      } else {
        setError(data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-slate-800">
      <div className="w-96 mx-auto border shadow p-5 rounded-sm bg-gray-300">
        <h2 className="text-lg font-semibold mb-5"> Login Account </h2>
        {error ? <p className="text-red-600 mb-2 "> {error} </p> : ""}

        <form onSubmit={handleSubmit} action="">
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
            <p> Don't have an account ? </p>
            <Link to={"/register"} className="text-blue-500">
              {" "}
              Register
            </Link>
          </div>

          <button
            type="submit"
            className=" px-5 py-1 rounded-sm bg-blue-600 text-yellow-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
