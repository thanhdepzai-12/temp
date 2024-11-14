import React, { useContext, useEffect, useState } from "react";
import { DeleteProfile, getAllProfile, getAllUser } from "../../utils/apiServices";
import defaultImage from '../../assets/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'
import errorVideo from '../../assets/CvVideo.mp4';
import { DropboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { message, notification, Spin } from "antd";
import { MainContentCv } from "../Context/GlobalContext";
import './Profile.scss'
import { MdDeleteSweep } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import ModalsDelete from "./ProfileCv/Modals/ModalsDelete";
const Profile = () => {
  const navigate = useNavigate();
  const [profileList, setProfileList] = useState([]);
  const [deleteCV, setDeleteCV] = useState();
  const [Avatar, setAvatar] = useState(false);
  const [load, setLoad] = useState(true);
  const { setDataProfile, dataProfile } = useContext(MainContentCv);
  const [isModalOpen, setIsModalOpen] = useState(false);




      const fetchListUser = async() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        let res = await getAllProfile(userId);
        if (res && res.EC === 0) {
          setProfileList(res.profile);
          setAvatar(true);
        }
      }
    };
  useEffect(() => {

    fetchListUser();
  }, []);
  console.log("check cvform", profileList);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    },3000)
  },[]);

  const handleDeleteProfile = (dataDelete)=>{

    if(dataDelete && dataDelete._id){
      setDeleteCV(dataDelete._id)
        setIsModalOpen(true);
    }else {
      setIsModalOpen(false)
      alert("You can not delete this profile");
    }
  }
console.log("check data delete",deleteCV)



  const handleOk = async() => {
    if(deleteCV)
    setIsModalOpen(false);
    const res = await DeleteProfile(deleteCV);
    if(res && res.EC===0){
      notification.success({
        message:"Delete",
        description:"remove profile successful"
      });
      fetchListUser();
    }else {
        alert("error");
    } 
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {load === true ? (
        <div
          style={{ height: "80vh" }}
          className="d-flex justify-content-center align-items-center "
        >
          <Spin
            indicator={
              <LoadingOutlined
                spin
                style={{ fontSize: "10rem", color: "#064420" }}
              />
            }
          />
        </div>
      ) : (
        <div>
          {profileList && profileList.length > 0 && (
            <div
              className="card-container py-3 d-flex justify-content-end"
              style={{ paddingRight: "7rem" }}
            >
              <button
                className="btn btn-success"
                onClick={() => {
                  navigate("/createProfile");
                }}
              >
                Create New Profile +
              </button>
            </div>
          )}
          <div className="card-container d-flex flex-wrap gap-3 mt-3  d-flex justify-content-center">
            {profileList &&
    profileList.length > 0 &&
    [...profileList].reverse().map((data) => {
       return(
              <React.Fragment key={data._id}>
                    {data && data.photo &&
                  <div
                  key={data._id}
                    className="card card-profile"
                    style={{ width: "18rem" , height:"24rem",backgroundImage:`url(${data.photo})`}}


                  >


                    <div className="card-body">
                      <div className="card-feature">
                        <div className="d-flex flex-column gap-2 align-items-center" style={{width:"3.5rem",height:"100%"}}>
                        <div className="logo-card"></div>
                        <div className="card-delete" onClick={()=> handleDeleteProfile(data)}>
                        <AiFillDelete style={{fontSize:"2.5rem",color:"#C64756"}} />
                        </div>
                        </div>
                      </div>
                      <div className="card-view">
                       <h6                     onClick={() => {
                           sessionStorage.setItem('dataProfile', JSON.stringify(data));
                      navigate('/viewProfile'); 
                    
                    }}>View More</h6> 
                      </div>
                      <div className="card-detail">
                       <h3>Profile</h3>
                      <h4>{data.name}</h4>
                      <p>{data.Birth}</p>
                      <p > {data.Position}</p>
                      <span>
                        Tạo vào lúc{" "}
                        {moment(data.createdAt).format(`HH:MM A DD-MM-YYYY`)}
                      </span>
                      </div>

                    </div>
                  </div>













        
                  }
             </React.Fragment>

       )
              })}
          </div>
















          {profileList.length === 0 && (
            <div className=" w-100 d-flex justify-content-center align-items-center">
            <div className="container-error d-flex flex-column justify-content-center align-items-center">
              <video width="900" height="500" autoPlay loop muted>
                <source src={errorVideo} type="video/mp4" />
              </video>
              <div
                className="d-flex flex-column justify-content-between align-items-center py-4"
                style={{ height: "10rem" }}
              >
                <h1 className="fs-1">You Haven't Own Your CV Yet !!</h1>
                <button
                  onClick={() => {
                    navigate("/createProfile");
                  }}
                  className="btn btn-success rounded-2"
                  style={{ background: "#064420 !important", width: "100%",zIndex:"40" }}
                >
                  Make Your Own Profile
                </button>
              </div>
            </div>
            </div>
          )}
        </div>
      )}
  
        <ModalsDelete isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} />
    </>
  );
};

export default Profile;