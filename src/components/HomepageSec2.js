import React, { useEffect, useState } from "react";
import "../style/HomepageSec2.css";

import { db } from "../firebase";

import GlobalStatCard from "./GlobalStatCard";

function HomepageSec2({ colorMode, lastEvents }) {
  const [globalstats, setGlobalstats] = useState([]);

  // useEffect(()=>{
  //   db.collection('global_stats').onSnapshot(snapshot=>{
  //     setGlobalstats(snapshot.docs.map(doc=> ({
  //       id:doc.id,
  //       "participants": doc.data().participants,
  //       "reach": doc.data().reach,
  //       "likes": doc.data().likes
  //     })))
  //   })
  // },[]) // runs on page refresh

  //console.log("analytics : ", lastEvents);

  const Color = { light: "#1d1e1f", dark: "#ffffff" };
  var style = {
    color: Color[colorMode],
  };

  return (
    <div className="HomepageSec2">
      <h3 style={style} className="DisplayPanelHeading">
        Analytics
      </h3>
      {lastEvents.length > 0 ? (
        <div>
          {lastEvents.map(({ id, lastEvent }) => (
            <div>
              <div className="">
                <div className="CoreMembersContainer">
                  <GlobalStatCard
                    colorMode={colorMode}
                    statName="PARTICIPANTS"
                    statValue={lastEvent.lastEventParticipants}
                  />
                  <GlobalStatCard
                    colorMode={colorMode}
                    statName="REACH"
                    statValue={lastEvent.lastEventReach}
                  />
                  <GlobalStatCard
                    colorMode={colorMode}
                    statName="ENGAGEMENT"
                    statValue={lastEvent.lastEventEngagement}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

// className="LastEventImagesContainerContent"

export default HomepageSec2;

// globalstats.map((stat)=>(
//   <div className="cardContainer">
// <GlobalStatCard  statName="PARTICIPANTS" statValue={stat.participants} />
// <GlobalStatCard  statName="REACH" statValue={stat.reach} />
//   <GlobalStatCard statName="LIKES" statValue={stat.likes} />
//    </div>
//  ))
