import React from 'react'
import '../style/HomepageSec2.css'

function GlobalStatCard({statName, statValue, colorMode}) {
    const BgColor = {  light: "#ffffff", dark: "#1d1e1f" };
    const Color = { light: "#1d1e1f", dark: "#ffffff"};
  var style={
      backgroundColor: BgColor[colorMode],
      color: Color[colorMode]
  }
    return (
            <div style={style} className="card">
                <h3>{statName}</h3>
                 <div className="cardValue">
                    <h4>{statValue+"+"}</h4>
                 </div>
            </div>
    )
}

export default GlobalStatCard
