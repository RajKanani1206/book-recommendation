import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import "./style.css";

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (): void => {
    if (username && password) {
      localStorage.setItem("credentials", JSON.stringify({ username, password }));
      navigate("/books");
    }
  };

  return (
    <div className="min-h-screen py-40">
      <div className="border border-slate-200 rounded-lg shadow-xl max-w-sm mx-auto p-4">
        <h3 className="text-3xl font-medium text-center pb-10">Sign In</h3>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item className="login-btn-wrapper">
            <Button type="primary" htmlType="submit" block className="login-btn">
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
