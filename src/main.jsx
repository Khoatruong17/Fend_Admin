import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/register.jsx";
import LoginPage from "./pages/login.jsx";
import UserPage from "./pages/user.jsx";
import HostPage from "./pages/host/hostPage.jsx";
import AdminPage from "./pages/admin/adminPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RedirectToRolePage from "./components/context/RedirectToRolePage.jsx";

import ProtectedRoute from "./components/context/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", // Root path redirects based on role
        element: <RedirectToRolePage />,
      },
      {
        path: "host",
        element: (
          <ProtectedRoute roleRequired="host">
            <HostPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute roleRequired="admin">
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/notfound",
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>
);
