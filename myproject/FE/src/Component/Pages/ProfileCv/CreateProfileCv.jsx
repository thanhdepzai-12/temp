import React, { useContext, useEffect, useState } from "react";
import "./ProfileCv.scss";

import FillingDetail from "./FillingDetail";
import FillingDetailContent from "./FillingDetailContent";
import MainCv from "./MainCv";
import CvVideo from "../../../assets/videoBird.mp4";
import { MenuOutlined } from "@ant-design/icons";
import SideMenu from "./contentCv/SideMenu";
import { PostCreateProfile, PostUploadImage } from "../../../utils/apiServices";
import { ColorContext, Contact, MainContentCv} from "../../Context/GlobalContext";
import { Avatar, notification } from "antd";
import { useNavigate } from "react-router-dom";

const CreateProfileCv = () => {
  const [nextPage, setNextPage] = useState(true);
  const [checkSideBar, setCheckSidebar] = useState(false);
  const { information, tested, setTested,setInformation } = useContext(MainContentCv);
  const [imageAvatar, setImageAvatar] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const { dataUpLoad } = useContext(Contact);
  const [checkToPage, setCheckToPage] = useState(false);
  const { photo,setPhoto } = useContext(ColorContext);
  const [loadings, setLoadings] = useState([]);
  const { color, setColor, colorText, setColorText } = useContext(ColorContext);
  const navigate = useNavigate();
  const [checkClick,setCheckClick]=useState(false);
  const [shouldCreateProfile, setShouldCreateProfile] = useState(false);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false); // Cờ trạng thái để tránh tạo nhiều profile

  // useEffect để xử lý khi imageAvatar thay đổi
  useEffect(() => {
    if (imageAvatar && shouldCreateProfile && !isCreatingProfile) {
      (async () => {
        try {
          setIsCreatingProfile(true); // Đặt cờ tạo profile đang bật
          if (
            dataUpLoad &&
            information &&
            information.education.length > 0 &&
            information.experience.length > 0 &&
            information.skill.length > 0
          ) {
            const addressInclude = `${dataUpLoad.addressProvince} ${dataUpLoad.addressDistrict} ${dataUpLoad.addressWard}`;
            const res = await PostCreateProfile(
              localStorage.getItem("userId"),
              imageAvatar,
              dataUpLoad.name,
              dataUpLoad.position,
              dataUpLoad.birthString,
              dataUpLoad.gender,
              dataUpLoad.number,
              dataUpLoad.email,
              addressInclude,
              color,
              colorText,
              isPublic,
              information.experience,
              information.education,
              information.skill
            );

            if (res && res.EC === 0) {
              localStorage.removeItem("userContact");
              setColor("#064420");
              setColorText("white");
              setInformation({});
              // Đặt lại cờ
              setShouldCreateProfile(false);
            } else if (res && res.EC < 0) {
              notification.error({
                message: "Error Create",
                description: "Failed to create CV",
              });
            }
          } else {
            notification.error({
              message: "Error Create Profile",
              description: "Experience or Education or Skill have been left",
            });
          }
        } catch (error) {
          notification.error({
            message: "Error Create Profile",
            description: "An error occurred while creating the profile.",
          });
          console.log("error", error);
        } finally {
          setIsCreatingProfile(false); // Reset cờ trạng thái khi quá trình tạo hoàn tất
        }
      })();
    }
  }, [
    imageAvatar,
    dataUpLoad,
    information,
    color,
    colorText,
    isPublic,
    navigate,
    shouldCreateProfile,
    isCreatingProfile, // Thêm vào dependency để theo dõi
  ]);

  // Hàm để tải ảnh và cập nhật imageAvatar
  const handleCreateProfile = async () => {
    if (!isCreatingProfile) { // Kiểm tra cờ trạng thái trước khi cho phép tạo mới
      if (photo) {
        setCheckClick(true);
        setTested(false);
        setTimeout(() => {
          navigate("/Profile");
          setTested(true);
          notification.success({
            message: "Create Profile",
            description: "Create CV Success",
          });
        }, 6000);
        try {
          const resImage = await PostUploadImage(photo);
          if (resImage) {
            setImageAvatar(resImage.url); // Cập nhật imageAvatar
            setShouldCreateProfile(true); // Thiết lập flag để chỉ thực hiện tạo hồ sơ
            setPhoto(""); // Đặt lại giá trị photo
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          notification.error({
            message: "Error",
            description: "Failed to upload image.",
          });
        }
      } else {
        notification.error({
          message: "Error",
          description: "You need to upload your avatar profile.",
        });
      }
    }
  };
  return (
    <div className="profile-container">
      {tested === true ? (
        <div className="container">
          <div className="fill-detail">
            {nextPage === true ? (
              <FillingDetail setCheckSidebar={setCheckSidebar} nextPage={nextPage} setNextPage={setNextPage} />
            ) : (
              <FillingDetailContent
                nextPage={nextPage}
                setNextPage={setNextPage}
              />
            )}
          </div>
          <div className="main-content">
            <video autoPlay loop muted>
              <source src={CvVideo} type="video/mp4" />
            </video>
            <MainCv />
            {checkSideBar === true ? (
              <div className="side-bar">
                <SideMenu
                  setCheckClick={setCheckClick}
                  checkClick={checkClick}
                  loadings={loadings}
                  handleCreateProfile={handleCreateProfile}
                  nextPage={nextPage}
                />
              </div>
            ) : (
              <div></div>
            )}
            <span
              onClick={() => {
                setCheckSidebar(!checkSideBar);
              }}
            >
              <MenuOutlined className="btn-sidebar" />
            </span>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="press">
            <div className="holder"></div>
            <div className="lid"></div>
            <div className="carafe">
              <div className="drop"></div>
              <div className="spout"></div>
              <div className="contents">
                <div className="grounds"></div>
                <div className="water"></div>
              </div>
            </div>
            <div className="plunger">
              <div className="shaft">
                <div className="knob"></div>
              </div>
              <div className="filter"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProfileCv;
