import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { notification } from "antd";
const Education = ({checkInput, education,handleInputEducation,handleAlterEducation }) => {
  return (
    <>

      {education &&
        education.length > 0 &&
        education.map((items) => {
          return (
            <div
              key={items.id}
              className="mt-2 d-flex gap-2 align-items-center"
            >
              <input
                placeholder={items.education}
                className={
                  checkInput === true ? "input-df input-fdc" : "input-error"
                }
                onChange={(e) => handleAlterEducation(e, items.id)}
              />
              <div className="icon-service d-flex gap-1">
                {education && education.length >= 1 && (
                  <span onClick={() => handleInputEducation(items.id, "ADD")}>
                    <PlusCircleOutlined style={{ color: "green" }} />
                  </span>
                )}
                {education && education.length > 1 && (
                  <span
                    onClick={() => handleInputEducation(items.id, "REMOVE")}
                  >
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

export default Education