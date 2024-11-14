import React, { useContext, useEffect, useRef } from "react";
import { ColorContext, MainContentCv } from "../../Context/GlobalContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./ViewCv.scss";
import { BookOutlined, CrownOutlined, SnippetsOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ViewProfileCv = () => {
  const { setDataProfile,dataProfile } = useContext(MainContentCv);
  const { color } = useContext(ColorContext);
  const navigate = useNavigate();
  const viewCvRef = useRef(null);

  const handleDownloadPdf = async () => {
    if (!viewCvRef.current) {
      console.error("Element with ref 'viewCvRef' not found");
      return;
    }

    try {
      const element = viewCvRef.current;
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/jpeg");
      const pageWidth = 210;
      const pageHeight = 297;
      const pdf = new jsPDF({
        unit: "mm",
        format: [pageWidth, pageHeight],
        orientation: "portrait",
      });

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let finalImgWidth = imgWidth;
      let finalImgHeight = imgHeight;

      if (imgHeight > pageHeight) {
        const ratio = pageHeight / imgHeight;
        finalImgWidth = imgWidth * ratio;
        finalImgHeight = pageHeight;
      }

      pdf.addImage(imgData, "PNG", 0, 0, finalImgWidth, finalImgHeight);
      pdf.save("profile.pdf");
      alert("Download successful");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  useEffect(() => {
    // Khôi phục dữ liệu từ sessionStorage khi trang được tải lại
    const storedDataProfile = sessionStorage.getItem('dataProfile');
    if (storedDataProfile) {
      setDataProfile(JSON.parse(storedDataProfile));
    } else {
      navigate('/Profile');
    }
  }, [navigate, setDataProfile]);
console.log("CHECK DAta",dataProfile)
  return (
    <div  className="view-main-container vh-100 w-100 p-1 d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center gap-4">
        <div className="feature-cv px-2" >
          <div style={{fontSize:"4rem",color:"#FFCOO",display:"flex",justifyContent:"center",alignItems:"center"}}>View CV</div>
      <button onClick={handleDownloadPdf} className="mt-2 w-100 btn btn-success">
        Download
      </button>
      </div>

      <div className="include-cv">
      {dataProfile && (
        <div className="view-cv" ref={viewCvRef}>
          <div
            className="Main-right"
            style={{ background: dataProfile.colorSide }}
          >
            <label htmlFor="showImage" className="photo">
              {dataProfile.photo ? (
                <div className="photoProfile" style={{backgroundImage:`url(${dataProfile.photo})`}}></div>
              ) : (
                <img
                  src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                  alt="Default Avatar"
                />
              )}
            </label>

            <div className="Contact" style={{ color: dataProfile.colorText }}>
              <div className="Introduce border-top">
                <h4 className="mt-2">
                  <b>INTRODUCE</b>
                </h4>
                <div
                  className="d-flex flex-column align-items-start"
                  style={{ fontSize: "1.5rem" }}
                >
                  <span>{dataProfile.Birth || "DD/MM/YYYY"}</span>
                  <span>{dataProfile.Gender || "Gender"}</span>
                </div>
              </div>

              <div className="Introduce border-top mt-4">
                <h4 className="mt-2">
                  <b>CONTACT</b>
                </h4>
                <div
                  className="d-flex gap-2 flex-column align-items-start"
                  style={{ fontSize: "1.1rem" }}
                >
                  <span>{dataProfile.number || "0977633084"}</span>
                  <span style={{ fontSize: "0.9rem" }}>
                    {dataProfile.Email || "example@gmail.com"}
                  </span>
                  <span style={{ fontSize: "1rem" }}>
                    {dataProfile.Address || "Your Address"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="Main-left">
            <div className="Main-top">
              <span style={{ fontSize: "4rem", color: dataProfile.colorSide }}>
                {dataProfile.name || "Your Name"}
              </span>
              <span style={{ fontSize: "2.4rem", color: dataProfile.colorSide }}>
                {dataProfile.Position || "Your Position"}
              </span>
            </div>
            <div className="Main-bottom">
              <div>
                <p className="d-flex gap-1">
                  <SnippetsOutlined style={{ color: dataProfile.colorSide }} />
                  <b style={{ color: dataProfile.colorSide }}>Experience</b>
                </p>
                <div className="mt-2 content-cv">
                  {dataProfile.experience &&
                    dataProfile.experience.map((item, index) => (
                      <p
                        key={index}
                        className="d-flex gap-1"
                        style={{ fontSize: "1rem" }}
                      >
                        {item.experience}
                      </p>
                    ))}
                </div>
              </div>
              <div className="content-cv">
                <p className="d-flex gap-1">
                  <BookOutlined style={{ color: dataProfile.colorSide }} />
                  <b style={{ color: dataProfile.colorSide }}>Education</b>
                </p>
                <div className="mt-2">
                  {dataProfile.education &&
                    dataProfile.education.map((item, index) => (
                      <p
                        key={index}
                        className="d-flex gap-1"
                        style={{ fontSize: "1rem" }}
                      >
                        {item.education}
                      </p>
                    ))}
                </div>
              </div>
              <div className="content-cv">
                <p className="d-flex gap-1">
                  <CrownOutlined style={{ color: dataProfile.colorSide }} />
                  <b style={{ color: dataProfile.colorSide }}>Skill</b>
                </p>
                <div className="mt-2">
                  {dataProfile.skill &&
                    dataProfile.skill.map((item, index) => (
                      <p
                        key={index}
                        className="d-flex gap-1"
                        style={{ fontSize: "1rem" }}
                      >
                        {item.skill}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

        </div>

      </div>
    </div>
  );
};

export default ViewProfileCv;
