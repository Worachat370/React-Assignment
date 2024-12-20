import { useState } from 'react';
import { Button, Form, Input, Alert, Checkbox } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie'; 

const URL_AUTH = "/api/auth/local";

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
    <Form onFinish={handleLogin} autoComplete="off">
      {errMsg && (
        <Form.Item>
          <Alert message={errMsg} type="error" />
        </Form.Item>
      )}
      <h1>Login</h1>
      <Form.Item
        label="Username"
        name="identifier"
        rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Checkbox
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}>
          Remember me
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
