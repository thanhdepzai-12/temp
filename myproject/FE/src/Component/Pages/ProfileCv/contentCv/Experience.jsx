import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { notification } from "antd";
const Experience = (props) => {
    const { checkInput,experience,hanldeAlter,handleInput } = props;

  return (
    <>
      {experience &&
        experience.length > 0 &&
        experience.map((items) => {
          return (
            <div
              key={items.id}
              className="mt-2 d-flex gap-2 align-items-center"
            >
              <input
                placeholder={items.experience}
                className={
                  checkInput === true ? "input-df input-fdc" : "input-error"
                }
                onChange={(e) => hanldeAlter(e, items.id)}
              />
              <div className="icon-service d-flex gap-1">
                {experience && experience.length >= 1 && (
                  <span onClick={() => handleInput(items.id, "ADD")}>
                    <PlusCircleOutlined style={{ color: "green" }} />
                  </span>
                )}
                {experience && experience.length > 1 && (
                  <span onClick={() => handleInput(items.id, "REMOVE")}>
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

export default Experience