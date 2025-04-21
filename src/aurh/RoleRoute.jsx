// RoleRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

const RoleRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRoles = decoded.role || [];

    const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

    return hasAccess ? children : <Navigate to="/unauthorized" />;
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default RoleRoute;
