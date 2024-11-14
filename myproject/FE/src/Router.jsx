// Router.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import User from './Component/Pages/User.jsx';
import HomePage from './Component/Pages/HomePage.jsx';
import Login from './Component/Auth/Login.jsx';
import Register from './Component/Auth/Register.jsx';
import Profile from './Component/Pages/Profile.jsx';
import CreateProfileCv from './Component/Pages/ProfileCv/CreateProfileCv.jsx';
import NotFound from './Component/Layouts/NotFound.jsx';
import ViewProfileCv from './Component/Pages/ProfileCv/ViewProfileCv.jsx';
import Auth from './Component/Auth/Auth.jsx';
import ProtectRoute from './ProtectRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "users",
        element: <ProtectRoute element={<User />} />, // Route được bảo vệ
      },
      {
        path: "Profile",
        element: <ProtectRoute element={<Profile />} />, // Route được bảo vệ
      },
    ],
  },
  {
    path: "/Auth",
    element: <Auth />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "createProfile",
    element: <ProtectRoute element={<CreateProfileCv />} />, // Route được bảo vệ
  },
  {
    path: "viewProfile",
    element: <ProtectRoute element={<ViewProfileCv />} />, // Route được bảo vệ
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
