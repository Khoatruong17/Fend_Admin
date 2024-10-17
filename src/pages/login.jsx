// loginPage.jsx
import React, { useContext, useEffect } from "react";
import { Button, Form, Input, notification, Card } from "antd";
import { loginUserApi } from "../util/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(`/${auth.role}`); // Redirect to the appropriate role path if already authenticated
    }
  }, [auth.isAuthenticated]);

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await loginUserApi(email, password);
    if (res && res.EC === 0) {
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("userId", res.userId);
      notification.success({
        message: `Login successful`,
        description: "Success",
      });
      const rolePath = res.role === "admin" ? "admin" : "host"; // Determine role path
      setAuth({
        isAuthenticated: true,
        role: res?.role ?? "",
        user: {
          email: res?.email ?? "",
          username: res?.username ?? "",
        },
      });
      navigate(`/${rolePath}`);
    } else {
      notification.error({
        message: "Login failed",
        description: res?.EM ?? "error",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card style={{ width: 600, borderRadius: 20 }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "38px",
            fontWeight: "bold",
            marginBottom: "24px",
          }}
        >
          Login
        </h2>
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <p
            style={{
              color: "#1890ff",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "14px",
              marginTop: "8px",
              marginBottom: "20px",
            }}
          >
            Forgot Password?
          </p>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", height: 40 }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
