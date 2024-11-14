import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  // Check for token in localStorage
  const token = localStorage.getItem("token");

  // If there’s no token or isAuthenticated is false, redirect
  if (!token || !isAuthenticated) {
    return <Navigate to="/error" replace />;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
