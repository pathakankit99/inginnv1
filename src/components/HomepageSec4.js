import React from "react";
import EventCard from "./EventCard";

function Section4({ events, colorMode }) {
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
    <div>
      {events.length > 0 ? (
        <div>
          <h3 style={styleText} className="DisplayPanelHeading">
            Events
          </h3>
          <div className="DisplayPanelCardContainer">
            {events.map(({ id, event }) => (
              <EventCard
                colorMode={colorMode}
                key={id}
                eventId={id}
                event={event}
                calledBy="Home"
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

export default Section4;
