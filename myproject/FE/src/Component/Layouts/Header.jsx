import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
import '../../main.scss'
import { IoHome } from 'react-icons/io5';
import { PiReadCvLogo } from 'react-icons/pi';
import { FaUser } from 'react-icons/fa';
import { Contact } from '../Context/GlobalContext';

const Header = () => {
  const navigate = useNavigate();
  const {admin}=useContext(Contact);
  console.log("admin",admin)
  const items = [
    {
      label: (
        <Link className="text-decoration fs-6" to="/">
          Home
        </Link>
      ),
      key: "homepage",
      icon: <IoHome style={{ color: "white" }} />,
    },
    ...(admin === true ? [
      {
        label: (
          <Link className="text-decoration fs-6" to="/users">
            User
          </Link>
        ),
        key: "user",
        icon: <FaUser style={{ color: "white" }} />,
      }
    ] : []), 
    
  
    {
      label: (
        <Link className="text-decoration fs-6" to="/Profile">
          Your Profile
        </Link>
      ),
      key: "profile",
      icon: <PiReadCvLogo style={{ color: "white" }} />,
    },
  ];

  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{background:"#064420", color:"white"}}  />;
};



export default Header;