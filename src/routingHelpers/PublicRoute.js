// Authorization: 'Bearer ' + auth.token
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ component, _key, redirectUrl, children }) => {
  if (JSON.parse(localStorage.getItem("isAuthenticated")) === true) {
    return <Navigate to={redirectUrl} />;
  } else {
    return component;
  }
};

export default PublicRoute;
