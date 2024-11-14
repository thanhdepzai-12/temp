import React, { useEffect, useState, useContext } from "react";
import "./ProfileCv.scss";
import { Accordion } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import Experience from "./contentCv/Experience";
import Education from "./contentCv/Education";
import Skill from "./contentCv/Skill";
import { MainContentCv } from "../../Context/GlobalContext";


const FillingDetailContent = (props) => {
  const { nextPage, setNextPage } = props;
  const [checkInput, setCheckInput] = useState(true);
  const [valueEducation, setValueEducation] = useState([]);
  const [valueSkill, setValueSkill] = useState([]);
  const [valueExperience, setValueExperience] = useState([]);



  const { information, setInformation } = useContext(MainContentCv);

  useEffect(() => {
    if (valueEducation, valueSkill, valueExperience) {
      setInformation({
        education: valueEducation,
        experience: valueExperience,
        skill:valueSkill,
    })
    }
  },[valueEducation,valueSkill,valueExperience])



























  const [experience, setExperience] = useState([
    {
      id: uuidv4(),
     experience:"experience",
    },
  ]);

  const handleInput = (id, type) => {
    if (type === "ADD") {
      if (experience.length >= 5) {
        // Hiển thị thông báo lỗi nếu đã có 5 mục
        notification.error({
          message: "Error",
          description: "You can only add up to 5 experiences.",
        });
        return;
      }
      const newImput = {
        id: uuidv4(),
        experience: `experience`,
      };
      setExperience((prev) => [...prev, newImput]);
    }
    if (type === "REMOVE") {
      let dataClone = experience.filter((item) => item.id !== id);
      setExperience(dataClone);
    }
  };
  const hanldeAlter = (e, id) => {
    const newExperience = experience.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          experience: e.target.value,
        };
      }
      return item;
    });
    setExperience(newExperience); 
    setValueExperience(newExperience);
  };
  const [education, setEducation] = useState([
    {
      id: uuidv4(),
      education: "your education",
    },
  ]);
  const [skill, setSkill] = useState([
    {
      id: uuidv4(),
      skill: "your skill",
    },
  ]);

  const handleInputEducation = (id, type) => {
    if (type === "ADD") {
      if (education.length >= 5) {
        // Hiển thị thông báo lỗi nếu đã có 5 mục
        notification.error({
          message: "Error",
          description: "You can only add up to 5 experiences.",
        });
        return;
      }
      const newImput = {
        id: uuidv4(),
        education: `education`,
      };
      setEducation((prev) => [...prev, newImput]);
    }
    if (type === "REMOVE") {
      let dataClone = education.filter((item) => item.id !== id);
      setEducation(dataClone);
    }
  };
  const handleInputSkill = (id, type) => {
    if (type === "ADD") {
      if (skill.length >= 5) {
        // Hiển thị thông báo lỗi nếu đã có 5 mục
        notification.error({
          message: "Error",
          description: "You can only add up to 5 experiences.",
        });
        return;
      }
      const newImput = {
        id: uuidv4(),
        skill: "Your Skill",
      };
      setSkill((prev) => [...prev, newImput]);
    }
    if (type === "REMOVE") {
      let dataClone = skill.filter((item) => item.id !== id);
      setSkill(dataClone);
    }
  };

  const handleAlterEducation = (e, id) => {
    const newEducation = education.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          education: e.target.value,
        };
      }
      return item;
    });
      setEducation(newEducation);
    setValueEducation(newEducation);
 
  };
  useEffect(() => {
    
  },[valueEducation])
  const handleAlterSkill = (e, id) => {
    const newSkill = skill.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          skill: e.target.value,
        };
      }
      return item;
    });
    setSkill(newSkill)
    setValueSkill(newSkill);
    console.log("check value skill", valueSkill);
  };

  return (
    <>
      <div className="Main-info d-flex flex-column justify-content-between ">
        <div>
          <h1>More Information</h1>
          <Accordion defaultActiveKey="0" className="mt-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Experience</Accordion.Header>
              <Accordion.Body>
                <Experience
                  checkInput={checkInput}
                  experience={experience}
                  hanldeAlter={hanldeAlter}
                  handleInput={handleInput}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="mt-3">
              <Accordion.Header>Education Level</Accordion.Header>
              <Accordion.Body>
                <Education
                  checkInput={checkInput}
                  education={education}
                  setEducation={setEducation}
                  valueEducation={valueEducation}
                  setValueEducation={setValueEducation}
                  handleAlterEducation={handleAlterEducation}
                  handleInputEducation={handleInputEducation}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="mt-3">
              <Accordion.Header>Skill</Accordion.Header>
              <Accordion.Body>
                <Skill
                  checkInput={checkInput}
                  skill={skill}
                  setSkill={setSkill}
                  valueSkill={valueSkill}
                  setValueSkill={setValueSkill}
                  handleAlterSkill={handleAlterSkill}
                  handleInputSkill={handleInputSkill}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div></div>
        <div className="btn-back">
          <span
            className="fs-2"
            onClick={() => {
              setNextPage(true);
            }}
          >
            <ArrowLeftOutlined />
          </span>
        </div>
      </div>
    </>
  );
};

export default FillingDetailContent;
