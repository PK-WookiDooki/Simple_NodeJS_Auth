import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-800">
      <div className="w-96 mx-auto border shadow p-5 rounded-sm bg-gray-300  text-center">
        <h2 className="text-xl font-bold text-red-900 mb-3"> 404 Page! </h2>
        <Link to={"/"} className="px-5 py-2 rounded bg-red-600 text-white">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
