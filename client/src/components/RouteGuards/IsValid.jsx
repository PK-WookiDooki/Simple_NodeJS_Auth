import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const IsAuth = ({ children }) => {
  const name = useLocation().state;
  // console.log(name);

  if (name) {
    return children;
  } else {
    return <Navigate to={"/change_name"} />;
  }
};

export default IsAuth;
