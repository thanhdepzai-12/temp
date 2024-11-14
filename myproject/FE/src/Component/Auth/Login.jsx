import React, { useContext } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import './Auth.scss';
import { DoingLogin } from '../../utils/apiServices';
import { Contact, MainContentCv } from '../Context/GlobalContext';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Contact);
  const { loadings, enterLoading } = useContext(MainContentCv);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await DoingLogin(email, password);
    if (res && res.EC === 0) {
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('userId', res.data.id);
      navigate('/');
      setIsAuthenticated(true);
      notification.success({
        message: "Login",
        description: res.EM
      });
    } else if (res.EC !== 0) {
      notification.error({
        message: "Login",
        description: res.EM
      });
    }
  };


  return (
    <div>
      <div className="form-login">
        <div className='d-flex gap-4 align-items-center'>
          <div className='LogoLogin'></div>
          <h1 style={{ fontSize: "3.5rem" }}>LOGIN</h1>
        </div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          style={{ width: "100%" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", marginTop: "0.5rem", background: "#064420", padding: "0.5rem" }}
              onClick={() => enterLoading(0)} loading={loadings[0]}
            >
              Submit
            </Button>
            <div className='fs-6 d-flex gap-2 mt-4'>
              <p>Don’t have account?</p>
              <p onClick={() => navigate('/Auth/register')} className='button-register' style={{ color: "#FFCC00" }}>
                Create account
              </p>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
