import { Button } from '@chakra-ui/core';
import React from 'react'
import {Link} from "react-router-dom"
import "../style/UpcomingEvent.css"

function UpcomingEvent({colorMode, events}) {
    const Color = { light: "#1d1e1f", dark: "#ffffff" };
  var style = {
    color: Color[colorMode],
  };
  const ButtonBgColor = { light: "#1d1e1f", dark: "#ffffff" };
  const ButtonColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonColor = { light: "#1d1e1f", dark: "#ffffff" };
    return (
        <div style={style} className="UpcomingEvent">
            {
            events.map(({ id, event }) =>
            event.eventStatus === "Upcoming" && event.eventUrl != "" ? (
                <div>
            <h3 style={style} className="DisplayPanelHeading"> Upcoming Event   </h3>
            <div className="UpcomingEventContent">
                <div className="UpcomingEventDetail">
                    <h3>{event.eventName}</h3>
                    <h5>{event.eventDescription}</h5>
                    <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={event.eventUrl}
                            >
                              <Button
                                borderRadius="0"
                                className="Button"
                                variant="solid"
                                borderStyle="none"
                                bg={ButtonBgColor[colorMode]}
                                color={ButtonColor[colorMode]}
                                _hover={{
                                  bg: HoverButtonBgColor[colorMode],
                                  color: HoverButtonColor[colorMode],
                                }}
                              >
                                Join Event
                              </Button>
                            </a>
                            <EventPage colorMode={colorMode} event={event} />

                </div>
                <div className="UpcomingEventPoster">
                    <img
                    src={event.eventPoster}
                    alt="INGINN Event Poster"/>
                </div>
            </div>
            </div> 
            ):(<div></div>)
            )}
                   
        </div>
    )
}

function EventPage({colorMode,event}){
  const Color = { light: "#1d1e1f", dark: "#ffffff" };
  var style = {
    color: Color[colorMode],
  };
  const ButtonBgColor = { light: "#1d1e1f", dark: "#ffffff" };
  const ButtonColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonColor = { light: "#1d1e1f", dark: "#ffffff" };
  if(event.eventPage!==""){
    style={
      "display":"block"
    }
  }
  else{
    style={
      "display":"none"
    }
  }
  return(
    <Link to={event.eventPage}>
      <Button
        borderRadius="0"
        className="Button"
        variant="solid"
        borderStyle="none"
        bg={ButtonBgColor[colorMode]}
        color={ButtonColor[colorMode]}
        _hover={{
          bg: HoverButtonBgColor[colorMode],
          color: HoverButtonColor[colorMode],
        }}
      >
        Event Details
      </Button>
      </Link>
  )
}

export default UpcomingEvent
