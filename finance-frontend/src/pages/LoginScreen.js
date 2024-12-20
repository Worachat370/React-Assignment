import { useState } from 'react';
import { Button, Form, Input, Alert, Checkbox, Typography, Card } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

const URL_AUTH = "/api/auth/local";

const { Title } = Typography;

export default function LoginScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrMsg(null);
      const response = await axios.post(URL_AUTH, { ...formData });
      const token = response.data.jwt;
      axios.defaults.headers.common = { 'Authorization': `bearer ${token}` };

      if (rememberMe) {
        Cookies.set('token', token, { expires: 7 });
      }

      props.onLoginSuccess(token);
    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card 
        style={{ width: 500, padding: '20px'  }}
        title={<Title level={3} style={{ textAlign: 'center' }}>Login</Title>}
        hoverable
      >
        {errMsg && (
          <Form.Item>
            <Alert message={errMsg} type="error" />
          </Form.Item>
        )}
        
        <Form onFinish={handleLogin} autoComplete="off">
          <Form.Item
            label="Username"
            name="identifier"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              Remember me
            </Checkbox>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100%' }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
