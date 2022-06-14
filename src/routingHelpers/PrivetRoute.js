import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivetRoute = ({ component, redirectUrl }) => {
  if (JSON.parse(localStorage.getItem("isAuthenticated")) === true) {
    return component;
  } else {
    return <Navigate to={redirectUrl} />;
  }
};

export default PrivetRoute;
