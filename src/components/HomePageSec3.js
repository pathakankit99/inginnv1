import React from "react";
import "../style/HomepageSec3.css";
import CoreMembersCard from "../components/CoreMembersCard";
import HomepageMembersCard from "./HomepageMembersCard";

function Section3({ coreMembers, coordinators, members, colorMode }) {
  //console.log("Members check check check ",members)
  const Color = { light: "#1d1e1f", dark: "#ffffff" };
  var style = {
    color: Color[colorMode],
  };
  return (
    <div style={style} className="HomepageSec3">
      {coreMembers.length > 0 ? (
        <div>
          <h3 className="DisplayPanelHeading">Core Members</h3>
          <div className="CoreMembersContainer">
            {coreMembers.map(({ id, coremember }) => (
              <CoreMembersCard
                key={id}
                colorMode={colorMode}
                member={coremember}
                colorMode={colorMode}
              />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {coordinators.length > 0 ? (
        <div>
          <h3 className="DisplayPanelHeading">Coordinators</h3>
          <div className="CoreMembersContainer">
            {coordinators.map(({ id, coordinator }) => (
              <CoreMembersCard
                key={id}
                colorMode={colorMode}
                member={coordinator}
              />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Section3;

// {
//     coreMembers.map(({id, coremember})=>(

//       <Members key={id} member={coremember}/>
//     ))
//   }
