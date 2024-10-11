import React, { useContext } from "react";
import { Button, Form, Input, notification, Card, Divider } from "antd";
import { loginUserApi } from "../util/api";
import { useNavigate } from "react-router-dom";
import { GoogleOutlined } from '@ant-design/icons';
import { AuthContext } from "../components/context/auth.context";

const loginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
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
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.email ?? "",
          username: res?.name ?? "",
        },
      });
      navigate(`/`);
    } else {
      notification.error({
        message: "Login failed",
        description: res?.EM ?? "error",
      });
    }
  };
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <Card style={{ width: 600, borderRadius: 20 }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '38px',         
          fontWeight: 'bold',       
          marginBottom: '24px'  
        }}>
          Login
        </h2>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" />
          </Form.Item>




          <p style={{
            color: '#1890ff',
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '14px',
            marginTop: '8px',
            marginBottom: '20px'
          }}>
            Forgot Password?
          </p>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', height: 40 }}>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Divider>Or</Divider>

        <Button
          type="default"
          icon={<GoogleOutlined />}
          style={{ width: '100%', height: 40 }}
        >
          Login with Google
        </Button>

        <p style={{
          textAlign: 'center',
          marginTop: '16px',
          color: '#1890ff',
          cursor: 'pointer'
        }}
          onClick={() => navigate('/register')}
        >
          Don't have an account? Register
        </p>
      </Card>
    </div>
  );
};

export default loginPage;
