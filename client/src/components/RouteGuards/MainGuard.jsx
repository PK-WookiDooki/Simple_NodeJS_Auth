import cookie from "cookiejs";
import React from "react";
import { Navigate } from "react-router-dom";

const MainGuard = ({ children }) => {
  const token = cookie.get("token");
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default MainGuard;
