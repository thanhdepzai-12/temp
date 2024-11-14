import React, { useState } from "react";
import { Button, Modal } from "antd";
import logo from "../../../../assets/LogoGreen.png";
import './Modal.scss'
const ModalsDelete = (props) => {
  const { isModalOpen, handleCancel, handleOk } = props;

  return (
    <>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <div className="main-modal d-flex flex-column justify-content-between">
          <div className="d-flex gap-3 align-items-center">
            <div
              className="logo-modal"
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                backgroundImage: `url(${logo})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <div  className="detail fs-5">DELETE PROFILE </div>
            
          </div>
          <div className="title-modal"> Are you sure about removing this profile? </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalsDelete;
