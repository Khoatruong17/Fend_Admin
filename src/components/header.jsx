import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  const items = [
    {
      label: <Link to={"/"}>Home Page</Link>,
      key: "home",
      icon: <MailOutlined />,
    },
    {
      label: "User",
      key: "UserMenu",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link to={"/user"}>Users</Link>,
          key: "user",
        },
        {
          label: <Link to={"/login"}>Login</Link>,
          key: "login",
        },
        {
          label: "Logout",
          key: "logout",
        },
      ],
      style: { marginLeft: "auto" }, // Đẩy UserMenu sang phải
    },
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
    />
  );
};
export default Header;
