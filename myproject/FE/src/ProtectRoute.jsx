import { Navigate, useNavigate } from "react-router-dom";
import React from "react";



const ProtectRoute = ({element:component}) => {
Navigate
      const isAuthentticated = !!localStorage.getItem("access_token");
     return   isAuthentticated ? component : <Navigate to='/Auth' />
}

export default ProtectRoute