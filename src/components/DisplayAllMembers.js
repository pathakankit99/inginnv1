import React from 'react'
import HomepageMembersCard from "./HomepageMembersCard"

function DisplayAllMembers({members, colorMode}) {

  const NavbarBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const NavbarColor = { light: "#1d1e1f", dark: "#ffffff" };
  var style3 = {
    color: NavbarColor[colorMode],
  };

  var style={
    paddingTop: "70px"
  }
    return (
        <div style={style}>
            {members.length > 0 ? (
        <div>
          <h3 style={style3} className="DisplayPanelHeading">Members</h3>
          <div className="CoreMembersContainer">
            {members.map(({ id, member }) => (
              <HomepageMembersCard
                key={id}
                colorMode={colorMode}
                member={member}
              />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
            
        </div>
    )
}

export default DisplayAllMembers
