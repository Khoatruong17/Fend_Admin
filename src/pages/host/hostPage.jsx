import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  DashboardOutlined,
  LineChartOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import InforHoster from "./inforHosterPage";
import Dashboard from "./dashBroadHostComponent";
import AddPropertiesFrom from "./addPropertyComponent";
import PropertiesPage from "./propertiesComponent"

const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "sub1",
    icon: <HomeOutlined />,
    label: "Properties",
    children: [
      { key: "1", label: "Add Properties" },
      { key: "2", label: "List Properties" },
      { key: "3", label: "List Order" },
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
      { key: "8", label: "Account" },
      { key: "9", label: "Payment" },
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
            <h1>Add Properties</h1>
            <AddPropertiesFrom />
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
            <PropertiesPage/>
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
      case "8":
        return (
          <motion.div
            key="8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
          >
            <h1>Account</h1>
            <InforHoster />
          </motion.div>
        );
      case "9":
        return (
          <motion.div
            key="9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
          >
            <h1>Setting payment page</h1>
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
    <Layout>
      <Content
        style={{
          padding: "1px 1px",
          background: colorBgContainer,
        }}
      >
        <Layout
          style={{
            padding: "24px ",
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
              minHeight: 280,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        RentNest ©{new Date().getFullYear()} Created by Khoa Truong
      </Footer>
    </Layout>
  );
};

export default App;
