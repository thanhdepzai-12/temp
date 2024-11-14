import React from 'react'
import error from '../../assets/404error.png'
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center p-3">
      <div>
        <img style={{ width: "25rem" }} src={error} />
      </div>
      <div>
        <span className="d-flex flex-column justify-content-center align-items-center">
          <b style={{ fontSize: "3.4rem", color: "#064420" }}>
            OOSP ! NOT FOUND PAGE
          </b>
          <p style={{fontSize:"1.2rem"}}>
            This page you are looking for may have bee removed or never existed
                  </p>
                  <button onClick={()=>{navigate('/')}} className='btn btn-success mt-3'>return to the Homepage</button>
        </span>
      </div>
    </div>
  );
}

export default NotFound