import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import router from './Router';
import './main.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalContext, UserContact, UserMainCv } from './Component/Context/GlobalContext';




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContext>
      <UserContact>
        <UserMainCv>
          <RouterProvider router={router} />
        </UserMainCv>
      </UserContact>
    </GlobalContext>
  </React.StrictMode>
);
