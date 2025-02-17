import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, allowedRoles, userRole }) => {
  // Redirect to login if the user's role is not allowed
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  // Render the component if access is granted
  return <Component />;
};

export default ProtectedRoute;
