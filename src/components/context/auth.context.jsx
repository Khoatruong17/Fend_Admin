import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  role: "",
  user: {
    email: "",
    username: "",
  },
  isAdmin: () => false,
  isHost: () => false,
});

export const AuthWrapper = (props) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: "",
    user: {
      email: "",
      username: "",
    },
  });

  const isAdmin = auth.role === "admin";
  const isHost = auth.role === "host";

  const [appLoading, setAppLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, appLoading, setAppLoading, isAdmin, isHost }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
