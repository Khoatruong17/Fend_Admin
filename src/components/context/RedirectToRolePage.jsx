// RedirectToRolePage.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth.context";

const RedirectToRolePage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.isAuthenticated) {
      // Redirect to the correct role path
      const rolePath = auth.role === "admin" ? "/admin" : "/host";
      navigate(rolePath);
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [auth, navigate]);

  return null;
};

export default RedirectToRolePage;
