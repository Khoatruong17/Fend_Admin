import React, { useState, useContext } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const items = [
    
    ...(auth.isAuthenticated
      ? [
          {
            label: "User",
            key: "UserMenu",
            icon: <UserOutlined />,
            children: [
              {
                label: <Link to={"/user"}>All Users</Link>,
                key: "user",
              },
            ],
            style: { marginLeft: "0" }, // Đẩy UserMenu sang phải
          },
        ]
      : [{
        label: <Link to={"/"}>Home Page</Link>,
        key: "home",
        icon: <MailOutlined />,
      },]),

    ...(auth.isAuthenticated
      ? [
          {
            label: (
              <span
                onClick={() => {
                  localStorage.clear("token");
                  setAuth({
                    isAuthenticated: false,
                    user: {
                      email: "",
                      username: "",
                    },
                  });
                  navigate("/");
                }}
              >
                Log out: {auth?.user?.username ?? "User"}
              </span>
            ),
            key: "logout",
            style: { marginLeft: "auto" },
          },
        ]
      : [
          {
            label: <Link to={"/login"}>Login</Link>,
            key: "login",
            style: { marginLeft: "auto" },
          },
        ]),
  ];
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{
        justifyContent: "space-between",
        fontSize: "18px",       
        height: "60px",         
        lineHeight: "60px",     
        padding: "0 20px"       
      }}
    />
  );
};
export default Header;
