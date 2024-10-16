import React, { useState, useContext } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const items2 = [
  {
    key: "sub1",
    icon: <UserOutlined />,
    label: "User Admin",
    children: [
      { key: "1", label: "User Information" },
      { key: "2", label: "Address" },
    ],
  },
  {
    key: "sub2",
    icon: <LaptopOutlined />,
    label: "Manager",
    children: [
      { key: "3", label: "Add Property" },
      { key: "4", label: "Property List" },
    ],
  },
  {
    key: "sub3",
    icon: <NotificationOutlined />,
    label: "Comment",
    children: [
      { key: "5", label: "Comment List" },
      { key: "6", label: "Moderate Comments" },
    ],
  },
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("1");

  const onSelect = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <div>User Roles Content</div>;
      case "2":
        return <div>User Roles Content</div>;
      case "3":
        return <div>Property List Content</div>;
      case "4":
        return <div>Add Property Content</div>;
      case "5":
        return <div>Comment List Content</div>;
      case "6":
        return <div>Moderate Comments Content</div>;
      default:
        return <div>Select an option from the menu.</div>;
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
              defaultSelectedKeys={["1"]}
              onSelect={onSelect}
              style={{
                height: "100%",
              }}
              items={items2}
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
