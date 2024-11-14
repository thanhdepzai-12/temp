import React from 'react'
import { v4 as uuidv4 } from "uuid";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { notification } from "antd";
const Skill = ({ checkInput, skill, handleInputSkill, handleAlterSkill } ) => {
  return (
    <>
      {skill &&
        skill.length > 0 &&
        skill.map((items) => {
          return (
            <div
              key={items.id}
              className="mt-2 d-flex gap-2 align-items-center"
            >
              <input
                placeholder={items.skill}
                className={
                  checkInput === true ? "input-df input-fdc" : "input-error"
                }
                onChange={(e) => handleAlterSkill(e, items.id)}
              />
              <div className="icon-service d-flex gap-1">
                {skill && skill.length >= 1 && (
                  <span onClick={() => handleInputSkill(items.id, "ADD")}>
                    <PlusCircleOutlined style={{ color: "green" }} />
                  </span>
                )}
                {skill && skill.length > 1 && (
                  <span onClick={() => handleInputSkill(items.id, "REMOVE")}>
                    <MinusCircleOutlined style={{ color: "red" }} />
                  </span>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Skill