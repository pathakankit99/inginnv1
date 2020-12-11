import React from "react";
import "../style/LastEvent.css";

function LastEvent({ lastEvents, colorMode }) {
  const Color = { light: "#1d1e1f", dark: "#ffffff" };
  var style = {
    color: Color[colorMode],
  };
  return (
    <div style={style} className="LastEvents">
      {lastEvents.length > 0 ? (
        <div>
          <h3 className="PreviousEventHeader">Previous Events</h3>
          <div className="PreviousEventContent">
            {lastEvents.map(({ id, lastEvent }) => (
              <div>
                <h1>{lastEvent.lastEventName}</h1>
                <h3>{lastEvent.lastEventDescription}</h3>
                <div className="LastEventImagesContainer">
                  <img
                    className="LastEventImage"
                    src={lastEvent.lastEventPic1}
                    alt={lastEvent.lastEventName}
                  />
                  <img
                    className="LastEventImage"
                    src={lastEvent.lastEventPic2}
                    alt={lastEvent.lastEventName}
                  />
                  <img
                    className="LastEventImage"
                    src={lastEvent.lastEventPic3}
                    alt={lastEvent.lastEventName}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default LastEvent;
{
  /* <AccountMembersCard
key={id}
memberId={id}
member={coremember}
coordinators={coordinators}
calledBy="Admin"
/> */
}
