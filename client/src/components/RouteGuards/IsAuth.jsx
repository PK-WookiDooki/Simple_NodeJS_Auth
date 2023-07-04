import cookie from "cookiejs";
import React from "react";
import { Navigate } from "react-router-dom";

const IsAuth = ({ children }) => {
  const token = cookie.get("token") ? cookie.get("token") : false;
  if (!token) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default IsAuth;
