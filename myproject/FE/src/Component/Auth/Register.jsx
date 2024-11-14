import React, { useContext, useState } from 'react'
 import { Button,  Form, Input, notification } from 'antd';
import { DoingRegister } from '../../utils/apiServices';
import { useNavigate } from 'react-router-dom';
import { MainContentCv } from '../Context/GlobalContext';
const Register = () => {

  const navigate = useNavigate();
const {loadings,enterLoading} = useContext(MainContentCv);
  const onFinish = async (values) => {
    const { email, username, password } = values;

    // Hàm kiểm tra tính hợp lệ của email
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    // Kiểm tra email có hợp lệ không
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
        // Hiển thị thông báo lỗi nếu email không hợp lệ
        notification.error({
            message: "VALIDATION ERROR",
            description: "Vui lòng nhập một địa chỉ email hợp lệ.",
        });
        return; // Dừng lại nếu email không hợp lệ
    }

    try {
        // Gọi API DoingRegister với email hợp lệ
        const res = await DoingRegister(email, username, password);
        console.log("check res: ", res);

        if (res && res.EC === 0) {
            // Hiển thị thông báo thành công nếu tạo người dùng thành công

            setTimeout(()=>{
              notification.success({
                message: "CREATE USER",
                description: "CREATE USER SUCCESS",
            });
              navigate("/Auth");
            },2000)
            // Điều hướng đến trang đăng nhập
        } else {
            // Hiển thị thông báo lỗi nếu có lỗi từ server
            notification.error({
                message: "CREATE USER",
                description: res?.EM ?? "CREATE USER FAILED",
            });
        }
    } catch (error) {
        // Xử lý ngoại lệ nếu xảy ra lỗi trong quá trình gọi API
        console.error("Error during registration:", error);
        notification.error({
            message: "CREATE USER",
            description: "An unexpected error occurred. Please try again.",
        });
    }
};


  return (
    <div>
    <div className='Form-register'>
    <div className='d-flex align-items-center gap-3'>
      <div className='LogoLogin'></div>
      <h1 style={{fontSize:"2.5rem"}}>Create Account</h1>
      </div>
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
        autoComplete="off"
        layout='vertical'
      >
          <Form.Item
        label="Email"
        name="email"

        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
        style={{
          width: "100%",
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
        style={{
          width: "100%",
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>



      <Form.Item>
        <Button type="primary" htmlType="submit"                 style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  background: "#064420",
                  padding:"1rem"
                }}  onClick={() => enterLoading(0)} loading={loadings[0]}>
          Submit
        </Button>
      </Form.Item>
      <span className='fs-6 d-flex gap-2 mt-4'>Already have an account ? 
                <p onClick={()=>{
                    navigate('/Auth')
              }} className='button-register' style={{color:"#FFCC00"}}> back to login</p> 
              </span>
    </Form>
    </div>
    </div>
  );


}

export default Register