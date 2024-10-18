import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  DashboardOutlined,
  LineChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import HostTable from "./hostComponent";
import Dashboard from "./dashBroadAdminComponent";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "sub1",
    icon: <UserOutlined />,
    label: "User Management",
    children: [
      { key: "1", label: "List Hosts" },
      { key: "2", label: "List Users" },
      { key: "3", label: "Manage Bans" },
    ],
  },
  {
    key: "sub3",
    icon: <NotificationOutlined />,
    label: "Comments",
    children: [
      { key: "4", label: "Comment List" },
      { key: "5", label: "Moderate Comments" },
    ],
  },
  {
    key: "sub4",
    icon: <LineChartOutlined />,
    label: "Statistics",
    children: [
      { key: "6", label: "Revenue Reports" },
      { key: "7", label: "User Statistics" },
    ],
  },
  {
    key: "sub5",
    icon: <SettingOutlined />,
    label: "Settings",
    children: [
      { key: "8", label: "System Settings" },
      { key: "9", label: "Manage Promotions" },
    ],
  },
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("dashboard");

  const onSelect = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
          >
            <Dashboard />
          </motion.div>
        );
      case "1":
        return (
          <motion.div
            key="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
          >
            <h1>Host Management</h1>
            <HostTable />
          </motion.div>
        );
      case "2":
        return (
          <motion.div
            key="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
          >
            <h1>User Management</h1>
          </motion.div>
        );
      case "3":
        return (
          <motion.div
            key="3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
          >
            <h1>Manage Bans</h1>
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
          >
            Select an option from the menu.
          </motion.div>
        );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          padding: "1px 1px",
          background: colorBgContainer,
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            textAlign: "left",
            margin: "5px 5px 1px 50px",
            padding: "15px 0",
          }}
        >
          Admin Manager
        </h1>
        <Layout
          style={{
            padding: "24px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["dashboard"]}
              onSelect={onSelect}
              style={{
                height: "100%",
              }}
              items={items}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              background: colorBgContainer,
            }}
          >
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: colorBgContainer,
        }}
      >
        RentNest ©{new Date().getFullYear()} Created by Khoa Truong
      </Footer>
    </Layout>
  );
};

export default App;
