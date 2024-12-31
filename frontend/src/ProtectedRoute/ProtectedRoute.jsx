import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated && allowedRoles.includes("Guest")) {
    if (user.role === "mainAdmin" || user.role === "guestAdmin") {
      return <Navigate to="/" />; // Redirect to home if user has restricted roles
    }
  }
  if(allowedRoles.includes("Guest")){
    return children;
  }

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If the user's role is not included in allowedRoles, redirect to home
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // If authenticated and role is allowed, render the children
  return children;
};

export default ProtectedRoute;
