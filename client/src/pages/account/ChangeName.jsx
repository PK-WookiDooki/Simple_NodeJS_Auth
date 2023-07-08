import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ChangeName = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name.trim() || name.trim().length < 5) {
        setError("Please provide valid name!");
      } else {
        nav("confirmation", { state: name });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-slate-800">
      <div className="w-96 mx-auto border shadow p-5 rounded-sm bg-gray-300">
        <h2 className="text-lg font-semibold mb-5"> Change Name </h2>
        {error ? <p className="text-red-600 mb-2 "> {error} </p> : ""}

        <form onSubmit={handleSubmit} action="">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Enter New Name"
              className="w-full h-10 rounded-sm outline-none px-2 border border-black"
              value={name}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className=" px-5 py-1 rounded-sm bg-red-600 text-yellow-50"
          >
            Change Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeName;
