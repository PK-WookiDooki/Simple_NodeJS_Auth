import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cookie from "cookiejs";
import { useChangeUserNameMutation } from "../../features/apis/usersApi";
import { useDispatch } from "react-redux";
import { removeUser } from "../../features/services/usersSlice";

const ConfirmChangeName = () => {
  const user = JSON.parse(cookie.get("user"));
  const id = user.id;

  const name = useLocation().state;
  const [updatedUser, setUpdatedUser] = useState({
    name,
    password: "",
  });
  const [error, setError] = useState(null);
  const [changeUserName] = useChangeUserNameMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await changeUserName({ id, user: updatedUser });
      console.log(updatedUser);
      console.log(data);
      if (data?.success) {
        dispatch(removeUser());
        nav("/login");
      } else {
        setError(data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-slate-800">
      <div className="w-96 mx-auto border shadow p-5 rounded-sm bg-gray-300">
        <h2 className="text-lg font-semibold mb-5"> Confirm Password </h2>
        {error ? <p className="text-red-600 mb-2 "> {error} </p> : ""}

        <form onSubmit={handleSubmit} action="">
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Enter password to confirm"
              className="w-full h-10 rounded-sm outline-none px-2 border border-black"
              value={updatedUser.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className=" px-5 py-1 rounded-sm bg-red-600 text-yellow-50"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmChangeName;
