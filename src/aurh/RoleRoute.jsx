// RoleRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const RoleRoute = ({ allowedRoles, children }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   try {
//     const decoded = jwtDecode(token);
//     const userRoles = decoded.role || [];

//     const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

//     return hasAccess ? children : <Navigate to="/unauthorized" />;
//   } catch (err) {
//     return <Navigate to="/login" />;
//   }
// };

// export default RoleRoute;

import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RoleRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    // return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      // return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const userRoles = decoded.role;
    if (!userRoles || !Array.isArray(userRoles)) {
      window.location.href = "/login";
      // return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
    return hasAccess ? children : (window.location.href = "/shopping-cart");
    // return hasAccess ? children : <Navigate to="/unauthorized" replace />;
  } catch (err) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    // return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RoleRoute;
