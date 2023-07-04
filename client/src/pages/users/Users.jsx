import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useLogoutAccountMutation,
} from "../../features/apis/usersApi";
import cookie from "cookiejs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../features/services/usersSlice";

const Users = () => {
  const { data } = useGetUsersQuery();
  const token = cookie.get("token");
  const user = JSON.parse(cookie.get("user"));

  const users = data?.data;

  const [logoutAccount] = useLogoutAccountMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { data } = await logoutAccount(user.id);
      console.log(data);
      if (data?.success) {
        dispatch(removeUser());
        nav("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full mx-auto text-white">
      <div className="p-5">
        <h2 className="text-xl font-bold text-center">User Lists</h2>
        <div className=" my-5">
          {users?.map((user) => {
            return (
              <h2 key={user.id} className="text-lg font-bold">
                {" "}
                {user.name}{" "}
              </h2>
            );
          })}
        </div>
        <button
          onClick={handleLogout}
          className="text-white bg-red-600 px-5 py-1 rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Users;
