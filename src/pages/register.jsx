import React from "react";
import { Form, Input, Button, Card, Divider } from 'antd';
import { createUserApi } from "../util/api";
import { useNavigate } from "react-router-dom";

const registerPage = () => {
  const navigate = useNavigate();
  const validatePassword = (_, value) => {
    const form = formRef.current;
    if (!value || (form.getFieldValue('password') === value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Passwords do not match!'));
  };

  const formRef = React.useRef(null);
  const onFinish = async (values) => {
    const { name, email, password } = values;
    const res = await createUserApi(name, email, password);
    if (res) {
      notification.success({
        message: `Registered successfully!`,
        type: "success",
      });
      navigate(`/login`);
    } else {
      notification.error({
        message: error,
        type: "error",
      });
    }
    console.log(">> Success:", values);
  };
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <Card style={{ width: 500, borderRadius: 10 }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '38px',         
          fontWeight: 'bold',      
        }}>
          Register
        </h2>
        <Form
          ref={formRef}
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" />
          </Form.Item>
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

          <Form.Item
            label="RePassword"
            name="re_password"
            rules={[
              { required: true, message: 'Please confirm your password!' },
              { validator: validatePassword },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', height: 40 }}>
              Register
            </Button>
          </Form.Item>
        </Form>

        <p style={{
          textAlign: 'center',
          marginTop: '16px',
          color: '#1890ff',
          cursor: 'pointer'
        }}
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </p>
      </Card>
    </div>
  );
};

export default registerPage;
