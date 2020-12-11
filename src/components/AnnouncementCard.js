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
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { MdClose, MdDelete, MdEdit, MdSend } from "react-icons/md";
import firebase from "firebase";
import { db } from "../firebase";
import "../style/AnnouncementCard.css";

function AnnouncementCard({
  announcementId,
  announcement,
  calledBy,
  colorMode,
}) {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const onDetailOpen = () => {
    setIsDetailOpen(true);
  };
  const onDetailClose = () => {
    setIsDetailOpen(false);
  };

  var style;
  if (announcement.newAnnouncement === true) {
    style = {
      backgroundColor: "#d5f2f2",
    };
  }
  const [updatedBy, setUpdatedBy] = useState(localStorage.getItem("UserName"));
  const [newAnnouncement, setNewAnnouncement] = useState(
    announcement.newAnnouncement || ""
  );
  const AnnouncementSuccessfullyUpdated = () => {
    toast({
      title: "Announcement Successfully Updated",
      description: "",
      status: "success",
      duration: 3000,
      isClosable: false,
    });
  };

  const updateAnnouncement = (e) => {
    e.preventDefault();

    db.collection("announcements")
      .doc(announcementId)
      .set(
        {
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          newAnnouncement,
          updatedBy,
        },
        { merge: true }
      )
      .then(() => {
        AnnouncementSuccessfullyUpdated();
      });
  };

  const deleteAnnouncement = (e) => {
    db.collection("announcements")
      .doc(announcementId)
      .delete()
      .then(function () {
        var currentUser=localStorage.getItem("UserName")
        window.Email.send({
          SecureToken : "004ebacb-e2f1-4e69-afe3-9e02a33c6e25",
          To : 'ankitpathak143192@gmail.com',
          From : "admin@inginn.tech",
          Subject : currentUser+" Deleted an announcement",
          Body : "The announcement heading was "+announcement.heading
        })
        toast({
          title: "Announcement Successfully Deleted",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: false,
        });
      })
      .catch(function (error) {
        toast({
          title: "Unable to remove Announcement",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: false,
        });
      });
  };

  const ButtonBgColor = { light: "#1d1e1f", dark: "#ffffff" };
  const ButtonColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonColor = { light: "#1d1e1f", dark: "#ffffff" };


  const TextFieldBgColor = {  light: "#e8e8e8", dark: "#383838" };
  const TextFieldColor = {light: "#383838", dark: "#e8e8e8" };
  const useStyles = makeStyles({
    root: {
      "& label.Mui-focused": {
        color: TextFieldColor[colorMode],
      },
      "& label": {
        color: TextFieldColor[colorMode],
      },
      "& .MuiSelect-select:not([multiple]) option, .MuiSelect-select:not([multiple]) optgroup":{
          background:TextFieldBgColor[colorMode],
      },
      backgroundColor: TextFieldBgColor[colorMode],
      color: TextFieldColor[colorMode],
    },
  });
  const classes = useStyles();

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
    <div style={style} className="AnnouncementCard">
      <div onClick={onDetailOpen} className="AnnouncementCardContent">
        {announcement.newAnnouncement === true ? (
          <h3
            style={{
              height: "100%",
              fontSize: "1rem",
              padding: "10px",
              marginRight: "30px",
              background: "#1f5903",
              color: "#fff",
            }}
          >
            New
          </h3>
        ) : (
          <div></div>
        )}
        <h3>{announcement.heading}</h3>
      </div>
      {calledBy === "Admin" || calledBy === "Editor" ? (
        <div className="ButtonContainer">
          <IconButton color="secondary" onClick={deleteAnnouncement}>
            <MdDelete />
          </IconButton>
          {announcement.newAnnouncement === true ? (
            <IconButton style={style} onClick={onOpen}>
              <MdEdit />
            </IconButton>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      <Modal isOpen={isDetailOpen} onClose={onDetailClose} >
        <ModalOverlay />
        <ModalContent style={style}>
          <ModalHeader>
            <h3 className="ModalHeader">{announcement.heading}</h3>
          </ModalHeader>
          <ModalBody>
            <div className="MemberInfo">
              <h3>{announcement.description} </h3>
              {announcement.link !== "" ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={announcement.link}
                >
                  <h3>Attachment</h3>
                </a>
              ) : (
                <h3></h3>
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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form>
          <ModalContent style={style}>
            <ModalHeader>
              <h3 className="ModalHeader">UPDATE ANNOUNCEMENT</h3>
            </ModalHeader>
            <ModalBody>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(!newAnnouncement)}
                    name="checkedA"
                  />
                }
                label="New Announcement"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                borderRadius="0"
                bg={ButtonBgColor[colorMode]}
                color={ButtonColor[colorMode]}
                _hover={{
                  bg: HoverButtonBgColor[colorMode],
                  color: HoverButtonColor[colorMode],
                }}
                className="Button"
                leftIcon={MdSend}
                variant="solid"
                borderStyle="none"
                onClick={updateAnnouncement}
              >
                UPDATE
              </Button>
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
        </form>
      </Modal>
    </div>
  );
}

export default AnnouncementCard;
