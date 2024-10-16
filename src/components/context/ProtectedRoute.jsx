import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./auth.context.jsx";

const ProtectedRoute = ({ roleRequired, children }) => {
  const { auth, isAdmin, isHost } = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check for role access
  if (roleRequired === "admin" && !isAdmin) {
    return <Navigate to="/notfound" />;
  }

  if (roleRequired === "host" && !isHost) {
    return <Navigate to="/notfound" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
