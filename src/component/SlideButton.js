import React from "react";
import "./slideButton.css";
const SlideButton = () => {
  return (
    <>
      <div className="switch-container">
        <label className="switchBtn">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
    </>
  );
};

export default SlideButton;
