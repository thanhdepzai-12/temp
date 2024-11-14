import React, { useContext, useEffect, useState } from 'react'
import './MainCv.scss';
import photoAvater from '../../../assets/avatar.jpg'
import { ColorContext, Contact, MainContentCv } from '../../Context/GlobalContext';
import { BookOutlined, CrownOutlined, SnippetsOutlined } from '@ant-design/icons';
import SideMenu from './contentCv/SideMenu';
import {PostUploadImage } from '../../../utils/apiServices';

const MainCv = () => {

  const { color } = useContext(ColorContext);
  const { contact } = useContext(Contact);
  const { information } = useContext(MainContentCv);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const { colorText, setColorText,setPhoto} = useContext(ColorContext);



  const handleDisplayPhoto = async(e) => { 
    if (e.target && e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
      setPreviewPhoto(URL.createObjectURL(file));
      setPhoto(file)
    }
    }
  return (
    <div className="container-cv" id="container-cv">
      <div className="Main-right" style={{ background: color }}>
        <label htmlFor="showImage" className="photo">
          {previewPhoto ? (
            <img src={previewPhoto} />
          ) : (
            <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg" />
          )}
        </label>
        <input
          id="showImage"
          type="file"
          hidden
          onChange={(e) => handleDisplayPhoto(e)}
        />
        <div className="Contact " style={{ color: colorText }}>
          <div className="Introduce border-top">
            <h4 className="mt-2">
              <b>INTRODUCE</b>
            </h4>
            <div className="d-flex flex-column align-items-start">
              {contact.birthString ? (
                <span>{contact.birthString}</span>
              ) : (
                <span>DD/MM/YYY</span>
              )}
              {contact.gender ? (
                <span>{contact.gender}</span>
              ) : (
                <span>Gender</span>
              )}
            </div>
          </div>

          <div className="Introduce border-top mt-4">
            <h4 className="mt-2">
              <b>CONTACT</b>
            </h4>
            <div className="d-flex flex-column align-items-start">
              {contact.number ? (
                <span>{contact.number}</span>
              ) : (
                <span>0977633084</span>
              )}
              <span>
                {contact.email ? (
                  <span style={{ fontSize: "0.6rem" }}>{contact.email}</span>
                ) : (
                  <span style={{ fontSize: "0.7rem" }}>example@gmail.com</span>
                )}
              </span>
              <div className="d-flex gap-1" style={{ fontSize: "0.4rem" }}>
                <span>
                  {contact.addressProvince ? (
                    <span>{contact.addressProvince}</span>
                  ) : (
                    <span>Your Province</span>
                  )}
                </span>
                <span>
                  {contact.addressDistrict ? (
                    <span>{contact.addressDistrict}</span>
                  ) : (
                    <span>Your District</span>
                  )}
                </span>
              </div>
              <span style={{ fontSize: "0.6rem" }}>
                {contact.addressWard ? (
                  <span>{contact.addressWard}</span>
                ) : (
                  <span>Your Ward</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="Main-left">
        <div className="Main-top">
          <span style={{ fontSize: "2.2rem" }}>
            {contact.name ? (
              <span>{contact.name}</span>
            ) : (
              <span style={{ color: color }}>Your Name</span>
            )}
          </span>
          <span
            style={{ fontSize: "1.4rem", paddingLeft: "3.5px", color: color }}
          >
            {contact.position ? (
              <span>{contact.position}</span>
            ) : (
              <span>Your Position</span>
            )}
          </span>
        </div>
        <div className="Main-bottom">
          <div>
            <p className="d-flex gap-1">
              <SnippetsOutlined style={{ color: color }} />
              <b style={{ color: color }}>Experience</b>
            </p>
            <div className="mt-2 content-cv">
              {information &&
                information.experience &&
                information.experience.map((items, index) => {
                  return (
                    <p
                      key={index}
                      className="d-flex gap-1 "
                      style={{ fontSize: "0.7rem" }}
                    >
                      {items.experience}
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="content-cv">
            <p className="d-flex gap-1">
              <BookOutlined style={{ color: color }} />
              <b style={{ color: color }}>Education</b>
            </p>
            <div className="mt-2">
              {information &&
                information.education &&
                information.education.map((items, index) => {
                  return (
                    <p
                      key={index}
                      className="d-flex gap-1 "
                      style={{ fontSize: "0.7rem" }}
                    >
                      {items.education}
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="content-cv">
            <p className="d-flex gap-1">
              <CrownOutlined style={{ color: color }} />
              <b style={{ color: color }}>Skill</b>
            </p>
            <div className="mt-2">
              {information &&
                information.skill &&
                information.skill.map((items, index) => {
                  return (
                    <p
                      key={index}
                      className="d-flex gap-1 "
                      style={{ fontSize: "0.7rem" }}
                    >
                      {items.skill}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCv