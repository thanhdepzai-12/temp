import { CloudDownloadOutlined, HomeOutlined, PoweroffOutlined } from '@ant-design/icons';
import React, { useContext, useState } from 'react'
import '../ProfileCv.scss';
import './SideBar.scss';
import { ColorContext, Contact, MainContentCv } from '../../../Context/GlobalContext';
import { HexAlphaColorPicker, HexColorInput, HexColorPicker } from 'react-colorful';
import { BsBackpack2Fill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
const SideMenu = (props) => {
  const { color, setColor, colorText, setColorText } = useContext(ColorContext);
  const { nextPage,loadings, handleCreateProfile, exportPDF ,checkClick} = props;
  const [check, setCheck] = useState(false);
  const {  tested, setTested } = useContext(MainContentCv);
  const [checkText, setCheckText] = useState(false);
  const navigate = useNavigate();
  const handleChangeColorBar = (color) => {
    if (color) {
      setColor(color);
    }
  }
    const handleChangeColorTextBar = (colorFont) => {
      if (colorFont) {
        setColorText(colorFont);
      }
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="btn-menu"></div>
      <div className="Feature-bar gap-3">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="d-flex flex-column justify-content-center align-items-center fs-9 gap-2"
        >
          <HomeOutlined style={{ fontSize: "2.5rem", color: "#064420 " }} />
          Home
        </span>

        <span
          className="d-flex flex-column justify-content-center align-items-center fs-9 gap-2"
          onClick={() => {
            navigate("/Profile");
          }}
        >
          <BsBackpack2Fill style={{ fontSize: "2.5rem", color: "#064420 " }} />
          Package
        </span>

        <div className="d-flex flex-column justify-content-center align-items-center fs-9 gap-2">
          <div
            className="color-option"
            style={{ background: color }}
            onClick={() => {
              setCheck(!check);
              setCheckText(false);
            }}
          >
            {check === true && (
              <div className="sketch-picker">
                <HexAlphaColorPicker
                  onChange={handleChangeColorBar}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
                <span>BackGround Color</span>
                <HexColorInput
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={handleChangeColorBar}
                />
              </div>
            )}
          </div>
          <span>Color Side</span>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center fs-9 gap-2">
          <div
            className="color-option"
            style={{ background: colorText }}
            onClick={() => {
              setCheck(false);
              setCheckText(!checkText);
            }}
          >
            {checkText === true && (
              <div className="sketch-picker">
                <HexAlphaColorPicker
                  onChange={handleChangeColorTextBar}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
                <span>Text Color</span>
                <HexColorInput
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={handleChangeColorTextBar}
                />
              </div>
            )}
          </div>
          <span>Color Text</span>
        </div>
      </div>

      <div>
        {nextPage === true ? (
          <div></div>
        ) : (
          <Button className='btn-create btn btn-success d-flex justify-content-center  align-items-center'
            disabled={checkClick}
            onClick={() => handleCreateProfile()}
          >
            Create
          </Button>
        )}
      </div>
    </div>
  );
}

export default SideMenu