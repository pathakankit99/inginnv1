import { Avatar, IconButton } from "@material-ui/core";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/core";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import "../style/CoreMembersCard.css";

function CoreMembersCard({ member, colorMode }) {
  //console.log("Members name = ",member.imageUrl)
  var image = member.imageUrl;
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const onDetailOpen = () => {
    setIsDetailOpen(true);
  };
  const onDetailClose = () => {
    setIsDetailOpen(false);
  };

  const NavbarBgColor = {  light: "#ffffff", dark: "#1d1e1f" };
  const NavbarColor = { light: "#1d1e1f", dark: "#ffffff" };
  var style = {
    backgroundColor: NavbarBgColor[colorMode],
    color: NavbarColor[colorMode],
  };
  var styleText = {
    color: "#ffffff",
  };
  return (
    <div style={style}  onClick={onDetailOpen} className="CoreMembersCard">
      <div className="CoreMemberCardContent">
        <Avatar variant="square" alt={member.name} src={image} />
        <div style={style} className="CoreMemberDetails">
          <h3>{member.name}</h3>
          {member.customPosition != "" ? (
            <h3>{member.customPosition}</h3>
          ) : (
            <h3>{member.department}</h3>
          )}
        </div>
      </div>
      <Modal
        initialFocusRef="none"
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent style={style}>
          <ModalHeader>
            <h3 className="ModalHeader">{member.name}</h3>
          </ModalHeader>
          <ModalBody>
            <div className="MemberInfo">
              <h3>{member.name}</h3>
              <h3>{member.rno}</h3>
              <h3>{member.email}</h3>
              {member.customPosition !== "" ? (
                <h3>{member.customPosition}</h3>
              ) : (
                <h3>{member.department}</h3>
              )}
              {member.dob !== "" ? <h3>DOB is {member.dob}</h3> : <div></div>}
              <h3>{member.course}</h3>
              <h3>{member.status}</h3>
              {member.instaUrl !== "" ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={member.instaUrl}
                >
                  <IconButton style={style}>
                    <FaInstagram />
                  </IconButton>
                </a>
              ) : (
                <div></div>
              )}
              {member.linkedinUrl !== "" ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={member.linkedinUrl}
                >
                  <IconButton style={style}>
                    <FaLinkedin />
                  </IconButton>
                </a>
              ) : (
                <div></div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              borderRadius="0"
              _hover={{ bg: "#000", color: "#f06567" }}
              background="#8f0e10"
              color="#ffffff"
              className="Button"
              leftIcon={MdClose}
              variant="solid"
              borderStyle="none"
              onClick={onDetailClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CoreMembersCard;
