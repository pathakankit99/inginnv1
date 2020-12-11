import React, { useState } from "react";
import "../style/Feedback.css";

function MemberUnderMeCard({ allmember, colorMode }) {
  var style;
  if (allmember.myCoordinator !== localStorage.getItem("UserName")) {
    style = {
      display: "none",
    };
  }
  if (
    allmember.department == localStorage.getItem("UserDepartment") &&
    localStorage.getItem("UserStatus") == "Core"
  ) {
    style = {
      display: "block",
      backgroundColor: "#fff",
      color: "#000",
      padding: "20px",
      boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.4)"
    };
  }
  return (
    <div style={style} className="DisplayFeedback">
      <div className="DisplayFeedbackContent">
        <h3>{allmember.name}</h3>
        {allmember.contact != "" ? (
          <h3>Phone: {allmember.contact}</h3>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default MemberUnderMeCard;
