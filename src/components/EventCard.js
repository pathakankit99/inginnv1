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
  FormControl,
  IconButton,
  InputLabel,
  makeStyles,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { MdClose, MdDelete, MdEdit, MdSend } from "react-icons/md";
import firebase from "firebase";
import { db } from "../firebase";
import "../style/EventCard.css";

function EventCard({ eventId, event, colorMode, calledBy }) {
 //console.log("Event inside event card is ",event)
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

  const successfullyUpdated = () => {
    toast({
      title: "Event Successfully Updated",
      description: "",
      status: "success",
      duration: 3000,
      isClosable: false,
    });
  };

  const [eventName, setEventName] = useState(event.eventName || "");
  const [eventPoster, setEventPoster] = useState(event.eventPoster || "");
  const [eventPage, setEventPage] = useState(event.eventPage || "");
  const [eventDescription, setEventDescription] = useState(
    event.eventDescription || ""
  );
  const [eventDate, setEventDate] = useState(event.eventDate || "");
  const [eventStatus, setEventStatus] = useState(
    event.eventStatus || "Planning"
  );
  const [eventGuest, setEventGuest] = useState(event.eventGuest || "");
  const [eventSponsors, setEventSponsors] = useState(event.eventSponsors || "");
  const [eventParticipants, setEventParticipants] = useState(
    event.eventParticipants || ""
  );
  const [eventOrganizerCertificate, setEventOrganizerCertificate] = useState(
    event.eventOrganizerCertificate || ""
  );
  const [
    eventParticipantCertificate,
    setEventParticipantCertificate,
  ] = useState(event.eventParticipantCertificate || "");
  const [updatedBy, setUpdatedBy] = useState(localStorage.getItem("UserName"));
  const [eventUrl, setEventUrl] = useState(event.eventUrl || "");
  var style;

  if (event.eventStatus === "Cancelled") {
    style = {
      backgroundColor: "#730a02",
      color: "white",
    };
  }
  if (event.eventStatus === "Postponed") {
    style = {
      backgroundColor: "#f79a68",
      color: "#000000",
    };
  }
  if (event.eventStatus === "Upcoming") {
    style = {
      backgroundColor: "#f2f261",
      color: "#000000",
    };
  }
  if (event.eventStatus === "Completed") {
    style = {
      backgroundColor: "#61f26b",
      color: "#000000",
    };
  }
  var style2;
  if (event.eventStatus !== "Completed" && calledBy == "Home") {
    style = {
      display: "none",
    };
  }
  if (calledBy == "Home") {
    style2 = {
      display: "none",
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventName != "") {
      db.collection("events")
        .doc(eventId)
        .set(
          {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            eventName,
            eventDescription,
            eventDate,
            eventStatus,
            eventGuest,
            eventSponsors,
            eventParticipants,
            eventOrganizerCertificate,
            eventParticipantCertificate,
            updatedBy,
            eventUrl,
            eventPoster,
            eventPage
          },
          { merge: true }
        )
        .then(() => {
          successfullyUpdated();
        });
    } else {
      toast({
        title: "Event Name Missing",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    }
  };
  const deleteEvent = (e) => {
    db.collection("events")
      .doc(eventId)
      .delete()
      .then(function () {
        var currentUser=localStorage.getItem("UserName")
        window.Email.send({
          SecureToken : "004ebacb-e2f1-4e69-afe3-9e02a33c6e25",
          To : ['ankitpathak143192@gmail.com','inginn.lpu@gmail.com'],
          From : "admin@inginn.tech",
          Subject : currentUser+" Deleted an event",
          Body : "The Event heading was "+event.eventName
        })
        toast({
          title: "Event Successfully Deleted",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: false,
        });
      })
      .catch(function (error) {
        toast({
          title: "Unable to remove event",
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
  var style3 = {
    backgroundColor: NavbarBgColor[colorMode],
    color: NavbarColor[colorMode],
  };
  var styleText = {
    color: NavbarColor[colorMode],
  };
  var participationCertificateStyle
  if(event.eventParticipantCertificate==""|| event.eventParticipantCertificate=="undefined"){
    participationCertificateStyle={
      display: "none"
    }
  }
  var participantsStyle
  if(event.eventParticipants==""){
    participantsStyle={
      display:"none"
    }
  }
  else{
    participantsStyle={
      marginTop:"10px",
      fontWeight:"500"
    }
  }
  return (
    <div style={style} className="EventCard">
      <div onClick={onDetailOpen} className="EventCardContent">
        <h3>{event.eventName}</h3>
        <h3>{event.eventStatus}</h3>
      </div>
      {calledBy === "Admin" || calledBy === "Editor" ? (
        <div className="ButtonContainer">
          <IconButton color="secondary" onClick={deleteEvent}>
            <MdDelete />
          </IconButton>
          <IconButton style={style3} onClick={onOpen}>
            <MdEdit />
          </IconButton>
        </div>
      ) : (
        <div></div>
      )}
      <Modal isOpen={isDetailOpen} onClose={onDetailClose} isCentered>
        <ModalOverlay />
        <ModalContent style={style3}>
          <ModalHeader>
            <h3 className="ModalHeader">{event.eventName}</h3>
          </ModalHeader>
          <ModalBody>
            <div className="MemberInfo">
              <h3>{event.eventDescription}</h3>
              {event.eventStatus === "Completed" ? (
                <div>
                  <h3 style={participantsStyle}>Total Participants: {event.eventParticipants}</h3>
                  <a
                    style={participationCertificateStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={event.eventParticipantCertificate} > <h3>Participants Certificate</h3> </a>
                  <a
                    style={style2}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={event.eventOrganizerCertificate} >  <h3>Organizer Certificate</h3>    </a>
                  
                </div>
              ) : (
                <h3></h3>
              )}
              {event.eventGuest == "" ? (
                <div></div>
              ) : (
                <h3>{event.eventGuest}</h3>
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
          <ModalContent style={style3}>
            <ModalHeader>
              <h3 className="ModalHeader">UPDATE EVENT</h3>
            </ModalHeader>
            <ModalBody>
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="text"
                id="filled-basic"
                label="Event Name"
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
                variant="filled"
                required
                fullWidth
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="text"
                id="filled-basic"
                label="Description"
                value={eventDescription}
                onChange={(e) => {
                  setEventDescription(e.target.value);
                }}
                variant="filled"
                fullWidth
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="url"
                id="filled-basic"
                label="Form Link"
                value={eventUrl}
                onChange={(e) => {
                  setEventUrl(e.target.value);
                }}
                variant="filled"
                fullWidth
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="url"
                id="filled-basic"
                label="Poster Link"
                value={eventPoster}
                onChange={(e) => {
                  setEventPoster(e.target.value);
                }}
                variant="filled"
                fullWidth
              />
              <TextField 
                    className={classes.root}
                    InputProps={{ className: classes.root  }}
                        type="text"
                        id="filled-basic" 
                        label="Event Page Link" 
                        value={eventPage}
                        onChange={(e)=>{setEventPage(e.target.value)}}
                        variant="filled"
                        fullWidth />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                InputLabelProps={{ shrink: true }}
                type="Date"
                id="filled-basic"
                label="Date"
                value={eventDate}
                onChange={(e) => {
                  setEventDate(e.target.value);
                }}
                variant="filled"
                fullWidth
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="text"
                id="filled-basic"
                label="Event Guest"
                value={eventGuest}
                onChange={(e) => {
                  setEventGuest(e.target.value);
                }}
                variant="filled"
                fullWidth
              />
              <FormControl className={classes.root} variant="filled" fullWidth>
                <InputLabel htmlFor="event-status">Status</InputLabel>
                <Select
                  className={classes.root}
                  InputProps={{ className: classes.root }}
                  value={eventStatus}
                  native
                  onChange={(e) => {
                    //console.log("status is ",status)
                    setEventStatus(e.target.value);
                  }}
                  inputProps={{
                    name: "Status",
                    id: "event-status",
                  }}
                >
                  <option value="Planning">Planning</option>
                  <option value="Postponed">Postponed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Upcoming">Upcoming</option>
                </Select>
              </FormControl>
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="text"
                id="filled-basic"
                label="Sponsors"
                value={eventSponsors}
                onChange={(e) => {
                  setEventSponsors(e.target.value);
                }}
                variant="filled"
                fullWidth
              />
              {eventStatus === "Completed" ? (
                <div>
                  <TextField
                    className={classes.root}
                    InputProps={{ className: classes.root }}
                    type="text"
                    id="filled-basic"
                    label="Participants"
                    value={eventParticipants}
                    onChange={(e) => {
                      setEventParticipants(e.target.value);
                    }}
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    className={classes.root}
                    InputProps={{ className: classes.root }}
                    type="url"
                    id="filled-basic"
                    label="Participants certificate"
                    value={eventParticipantCertificate}
                    onChange={(e) => {
                      setEventParticipantCertificate(e.target.value);
                    }}
                    variant="filled"
                    fullWidth
                  />
                  <TextField
                    className={classes.root}
                    InputProps={{ className: classes.root }}
                    type="url"
                    id="filled-basic"
                    label="Team certificate"
                    value={eventOrganizerCertificate}
                    onChange={(e) => {
                      setEventOrganizerCertificate(e.target.value);
                    }}
                    variant="filled"
                    fullWidth
                  />
                </div>
              ) : (
                <div></div>
              )}
            </ModalBody>
            <ModalFooter>
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
                onClick={handleSubmit}
              >
                SUBMIT
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

export default EventCard;
