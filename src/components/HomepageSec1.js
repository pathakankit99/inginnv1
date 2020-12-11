import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/core";
import React, { useState } from "react";
import "../style/HomepageSec1.css";

import { MdClose, MdEventAvailable, MdGroup, MdSend } from "react-icons/md"; //material design Icon
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { IconButton } from "@material-ui/core";

function Section1({ events, colorMode }) {
  //console.log("Color inside sec1 ", colorMode);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  //console.log("event is ",events)

  const Color = { light: "#1d1e1f", dark: "#ffffff" };
  var style = {
    color: Color[colorMode],
  };

  const ButtonBgColor = { light: "#1d1e1f", dark: "#ffffff" };
  const ButtonColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonColor = { light: "#1d1e1f", dark: "#ffffff" };

  const NavbarBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const NavbarColor = { light: "#1d1e1f", dark: "#ffffff" };
  var style3 = {
    backgroundColor: NavbarBgColor[colorMode],
    color: NavbarColor[colorMode],
  };
  const history = useHistory()
  
  const gotoAllmembers=(e)=>{
    return history.push("/allmembers");
  }

  return (
    <Router>
      <div style={style} className="HeroContent">
        <div className="HeroAllContent">
          <h1>INGINN</h1>
          <div className="HeroDescription">
            <h3>WE CONDUCT 🔥 🔥 EVENTS!!!</h3>
            <p>
              <strong>INGINN </strong>is a student organization under the <br />
              aegis of DSW
              <br /> LPU
            </p>

            <div className="centerButton">
              <div>
                <Link to="/allmembers">
                  <Button
                    borderRadius="0"
                    leftIcon={MdGroup}
                    variant="solid"
                    borderStyle="none"
                    onClick={gotoAllmembers}
                    bg={ButtonBgColor[colorMode]}
                    color={ButtonColor[colorMode]}
                    _hover={{
                      bg: HoverButtonBgColor[colorMode],
                      color: HoverButtonColor[colorMode],
                    }}
                    marginRight="10px"
                    marginBottom="10px"
                  >
                    All Members
                  </Button>
                </Link>
              </div>
              <div className="HomepageSec1Buttons">
                {events.map(({ id, event }) =>
                  event.eventStatus === "Upcoming" && event.eventUrl != "" ? (
                    <div key={id}>
                      {/* <Button
                        borderRadius="0"
                        leftIcon={MdEventAvailable}
                        variant="solid"
                        borderStyle="none"
                        onClick={onOpen}
                        bg={ButtonBgColor[colorMode]}
                        color={ButtonColor[colorMode]}
                        _hover={{
                          bg: HoverButtonBgColor[colorMode],
                          color: HoverButtonColor[colorMode],
                        }}
                      >
                        Events
                      </Button> */}

                      <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent style={style3}>
                          <ModalHeader>
                            <h3 className="ModalHeader">{event.eventName}</h3>
                          </ModalHeader>
                          <ModalBody className="MemberInfo">
                            <p>{event.eventDescription}</p>
                          </ModalBody>
                          <ModalFooter>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={event.eventUrl}
                            >
                              <Button
                                borderRadius="0"
                                className="Button"
                                leftIcon={MdSend}
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

                            <Button
                              borderRadius="0"
                              _hover={{ bg: "#000", color: "#f06567" }}
                              background="#8f0e10"
                              color="#ffffff"
                              className="Button"
                              leftIcon={MdClose}
                              variant="solid"
                              borderStyle="none"
                              onClick={onClose}
                            >
                              Close
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </div>
                  ) : (
                    <div key={id}></div>
                  )
                )}
              </div>
              <div className="HomepageInstaIcon">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/inginn.lpu/"
                >
                  <IconButton style={style}>
                    <AiFillInstagram />
                  </IconButton>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="HeroImage">
          <img src="/images/bulb.webp" alt="Inginn" />
        </div>
      </div>
    </Router>
  );
}

export default Section1;
