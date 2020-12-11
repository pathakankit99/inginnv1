import React from 'react'

function JudgesCard({colorMode, name, description, url, insta}) {
    const NavbarBgColor = { light: "#ffffff", dark: "#1d1e1f" };
    const NavbarColor = { light: "#1d1e1f", dark: "#ffffff" };
    var style = {
        backgroundColor: NavbarBgColor[colorMode],
        color: NavbarColor[colorMode],
      };
      var styleText = {
        color: NavbarColor[colorMode],
      };
    return (
        <div className="JudgeCard">
            <a href={insta} target="_blank">
            <img src={url} alt="INGINN Event Judge" />
            <div className="JudgeDetail">
                <h4>{name}</h4>
                <h5>{description}</h5>
            </div>
            </a>
            
        </div>
    )
}

export default JudgesCard
