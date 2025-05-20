import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface AuthorizeUserProps {
  children: JSX.Element;
}

const AuthorizeUser: React.FC<AuthorizeUserProps> = ({ children }) => {
  const stored = localStorage.getItem("credentials");
  const isAuthenticated = !!stored;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default AuthorizeUser;
