import React from 'react'
import './Auth.scss'
import { Outlet } from 'react-router-dom'
const Auth = () => {
  return (
    <div className="login-container">
        <Outlet />
    </div>
  )
}

export default Auth