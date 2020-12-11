import React from "react";
import MemberUnderMeCard from "./MemberUnderMeCard";

function MembersUnderMe({ allMembers, colorMode, calledBy }) {
  var styleMember;
  if (localStorage.getItem("UserStatus") == "Member") {
    styleMember = {
      display: "none",
    };
  }
  return (
    <div style={styleMember}>
      <h3 className="DisplayPanelHeading">Members Under Me</h3>
      <div className="DisplayPanelCardContainer">
        {allMembers.map(({ id, allmember }) => (
          <MemberUnderMeCard
            colorMode={colorMode}
            key={id}
            memberId={id}
            allmember={allmember}
          />
        ))}
      </div>
    </div>
  );
}

export default MembersUnderMe;
