import React, { useState, useEffect } from "react";
import "../style/MyAccount.css";
import firebase from "firebase";
import { db } from "../firebase";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useToast,
  Avatar,
} from "@chakra-ui/core";
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles, Backdrop, CircularProgress
} from "@material-ui/core";
import { MdPersonAdd, MdClose, MdSend } from "react-icons/md"; //material design Icon
import { useHistory } from "react-router-dom";
import AccountMembersCard from "./AccountMembersCard";
import Event from "./Event";
import EventCard from "./EventCard";
import Announcements from "./Announcements";
import DisplayFeedback from "./DisplayFeedback";
import Search from "./Search"
import MembersUnderMe from "./MembersUnderMe";

function Admin({
  coordinators,
  coreMembers,
  members,
  events,
  announcements,
  feedbacks,
  lastEvents,
  colorMode,
  allMembers
}) {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const [backdropIsOpen, setBackdropIsOpen] = useState(false)

  const [isOpen2, setIsOpen2] = useState(false);
  const onOpen2 = () => {
    if (lastEvents.length > 0) {
      setLastEventName(lastEvents[0].lastEvent.lastEventName);
      setLastEventEngagement(lastEvents[0].lastEvent.lastEventEngagement);
      setLastEventDescription(lastEvents[0].lastEvent.lastEventDescription);
      setLastEventParticipants(lastEvents[0].lastEvent.lastEventParticipants);
      setLastEventReach(lastEvents[0].lastEvent.lastEventReach);
      setLastEventPic1(lastEvents[0].lastEvent.lastEventPic1);
      setLastEventPic2(lastEvents[0].lastEvent.lastEventPic2);
      setLastEventPic3(lastEvents[0].lastEvent.lastEventPic3);
    }
    setIsOpen2(true);
  };
  const onClose2 = () => {
    setIsOpen2(false);
  };

  const [status, setStatus] = useState("Member");
  const [dob, setDob] = useState("");
  const [rno, setRno] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [course, setCourse] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("None");
  //console.log("Default Department in Admin is ",department)
  const [myCoordinator, setMyCoordinator] = useState("None");
  const [admin, setAdmin] = useState(false);
  const [editor, setEditor] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [instaUrl, setInstaUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [customPosition, setCustomPosition] = useState("");
  const [addedBy, setAddedBy] = useState(localStorage.getItem("UserName"));

  const [lastEventName, setLastEventName] = useState("");
  const [lastEventDescription, setLastEventDescription] = useState("");
  const [lastEventParticipants, setLastEventParticipants] = useState(0);
  const [lastEventReach, setLastEventReach] = useState(0);
  const [lastEventPic1, setLastEventPic1] = useState("");
  const [lastEventPic2, setLastEventPic2] = useState("");
  const [lastEventPic3, setLastEventPic3] = useState("");
  const [lastEventEngagement, setLastEventEngagement] = useState("");

  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("User")) {
     // return history.push("/");
      return (window.location.href = "/");
    } else {
      
      if (localStorage.getItem("UserAdmin") !== "true") {
       // return history.push("/");
        return (window.location.href = "/");
      }
    }
  }, [history]);

  const handleSubmitLastEvent = (e) => {
    e.preventDefault();
    setBackdropIsOpen(true)
    db.collection("lastEvent")
      .doc("tOVwQrgGiOcNE2ObKED2")
      .set(
        {
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          lastEventName,
          lastEventDescription,
          lastEventParticipants,
          lastEventReach,
          lastEventPic1,
          lastEventPic2,
          lastEventPic3,
          lastEventEngagement,
        },
        { merge: true }
      )
      .then(() => {
        setLastEventName("");
        setLastEventDescription("");
        setLastEventParticipants(0);
        setLastEventReach(0);
        setLastEventPic1("");
        setLastEventPic2("");
        setLastEventPic3("");
        setLastEventEngagement("");
        toast({
          title: "Successfully Updated last event",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: false,
        });
      });
      setBackdropIsOpen(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBackdropIsOpen(true)
    db.collection("members")
      .where("rno", "==", rno)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.docs.length > 0) {
          localStorage.setItem("userExists", true);
          setIsOpen(true);
          toast({
            title: "Member already exist",
            description: "",
            status: "error",
            duration: 3000,
            isClosable: false,
          });
        } else {
          localStorage.setItem("userExists", false);
        }
      })
      .then(function () {
        if (localStorage.getItem("userExists") === "false") {
          setIsOpen(true);
          db.collection("members")
            .add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              email,
              rno,
              name,
              dob,
              password,
              course,
              contact,
              status,
              department,
              admin,
              editor,
              imageUrl,
              myCoordinator,
              customPosition,
              addedBy,
              linkedinUrl,
              instaUrl
            })
            .then(() => {
              db.collection("members")
                .where("rno", "==", rno)
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    successfullyAdded()
                  });
                });
              toast({
                title: "Encrypting the password",
                description: "Go and have some fun while we do that",
                status: "warning",
                duration: 3000,
                isClosable: false,
              });
            });
        }
      })
      setBackdropIsOpen(false)
  };

  const successfullyAdded = () => {
    setEmail("");
    setName("");
    setPassword("");
    setRno("");
    setDob("");
    setCourse("");
    setDepartment("None");
    setAdmin(false);
    setEditor(false);
    setContact("");
    setImageUrl("");
    setInstaUrl("");
    setLinkedinUrl("");
    setMyCoordinator("None");
    toast({
      title: "Member Successfully Added",
      description: "",
      status: "success",
      duration: 3000,
      isClosable: false,
    });
  };

  function ChooseCoordinator({ coordinators, feedbacks }) {
    //setMyCoordinator(coordinators[0].coordinator.name);
    return (
      <div>
        <FormControl className={classes.root} variant="filled" fullWidth>
          <InputLabel htmlFor="member-coordinator">Coordinator</InputLabel>
          <Select
            className={classes.root}
            InputProps={{ className: classes.root }}
            native
            value={myCoordinator}
            onChange={(e) => setMyCoordinator(e.target.value)}
            inputProps={{
              name: "coordinator",
              id: "member-coordinator",
            }}
          >
            <option value="NONE"> NONE </option>
            {coordinators.map((coordinators) => (
              <option value={coordinators.coordinator.name}>
                {coordinators.coordinator.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

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
    <div style={styleText} className="MyAccount">
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <form>
          <ModalContent style={style}>
            <ModalHeader>
              <h3 className="ModalHeader">ADD MEMBER</h3>
            </ModalHeader>
            <ModalBody>
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="number"
                id="filled-basic"
                label="Registration Number"
                value={rno}
                onChange={(e) => {
                  setRno(e.target.value);
                  setPassword(e.target.value + "_inginn");
                }}
                variant="filled"
                required
                fullWidth
              />

              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                id="filled-basic"
                variant="filled"
                fullWidth
                required
                type="text"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                id="filled-basic"
                variant="filled"
                fullWidth
                required
                type="email"
                label="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="number"
                id="filled-basic"
                label="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                variant="filled"
                fullWidth
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="text"
                id="filled-basic"
                label="Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                variant="filled"
                fullWidth
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="text"
                id="filled-basic"
                label="Custom Position"
                value={customPosition}
                onChange={(e) => setCustomPosition(e.target.value)}
                variant="filled"
                fullWidth
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                InputLabelProps={{ shrink: true }}
                id="filled-basic"
                variant="filled"
                fullWidth
                required
                label="Date of birth"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <FormControl className={classes.root} variant="filled" fullWidth>
                <InputLabel htmlFor="member-status">Status</InputLabel>
                <Select
                  className={classes.root}
                  InputProps={{ className: classes.root }}
                  value={status}
                  native
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option className={classes.root} value="Member">
                    Member
                  </option>
                  <option className={classes.root} value="Core">
                    Core
                  </option>
                  <option className={classes.root} value="Coordinator">
                    Coordinator
                  </option>
                </Select>
              </FormControl>
              <FormControl className={classes.root} variant="filled" fullWidth>
                <InputLabel htmlFor="member-department">Department</InputLabel>
                <Select
                  className={classes.root}
                  InputProps={{ className: classes.root }}
                  native
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  inputProps={{
                    name: "Department",
                    id: "member-department",
                  }}
                >
                  <option className={classes.root} value="None">
                    None
                  </option>
                  <option className={classes.root} value="Operations">
                    Operations
                  </option>
                  <option className={classes.root} value="Marketing">
                    Media and Marketing
                  </option>
                  <option className={classes.root} value="HR">
                    Human Resource
                  </option>
                  <option className={classes.root} value="PS">
                    Public Speaking
                  </option>
                  <option className={classes.root} value="Sponsorship">
                    Sponsorship
                  </option>
                </Select>
              </FormControl>
              {status === "Member" ? (
                <div>
                  <ChooseCoordinator coordinators={coordinators} />
                </div>
              ) : (
                <div></div>
              )}
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={admin}
                      onChange={(e) => setAdmin(!admin)}
                      name="Admin"
                    />
                  }
                  label="Admin"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={editor}
                      onChange={(e) => setEditor(!editor)}
                      name="Editor"
                    />
                  }
                  label="Editor"
                />
              </FormGroup>
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                id="filled-basic"
                variant="filled"
                fullWidth
                type="url"
                label="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                id="filled-basic"
                variant="filled"
                fullWidth
                required
                type="url"
                label="Instagram URL"
                value={instaUrl}
                onChange={(e) => setInstaUrl(e.target.value)}
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                id="filled-basic"
                variant="filled"
                fullWidth
                required
                type="url"
                label="LinkedIn URL"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
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
      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <form>
          <ModalContent style={style}>
            <ModalHeader>
              <h3 className="ModalHeader">Add Last Event</h3>
            </ModalHeader>
            <ModalBody>
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="text"
                id="filled-basic"
                label="Last Event Name"
                value={lastEventName}
                onChange={(e) => {
                  setLastEventName(e.target.value);
                }}
                variant="filled"
                fullWidth
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="text"
                id="filled-basic"
                label="Last Event Description"
                multiline
                value={lastEventDescription}
                onChange={(e) => {
                  setLastEventDescription(e.target.value);
                }}
                variant="filled"
                fullWidth
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="number"
                id="filled-basic"
                label="Participants"
                value={lastEventParticipants}
                onChange={(e) => {
                  setLastEventParticipants(e.target.value);
                }}
                variant="filled"
                fullWidth
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="number"
                id="filled-basic"
                label="Reach"
                value={lastEventReach}
                onChange={(e) => {
                  setLastEventReach(e.target.value);
                }}
                variant="filled"
                fullWidth
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="number"
                id="filled-basic"
                label="Engagement"
                value={lastEventEngagement}
                onChange={(e) => {
                  setLastEventEngagement(e.target.value);
                }}
                variant="filled"
                fullWidth
              />

              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                id="filled-basic"
                variant="filled"
                fullWidth
                type="url"
                label="Image 1"
                value={lastEventPic1}
                onChange={(e) => setLastEventPic1(e.target.value)}
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                id="filled-basic"
                variant="filled"
                fullWidth
                required
                type="url"
                label="Image 2"
                value={lastEventPic2}
                onChange={(e) => setLastEventPic2(e.target.value)}
              />
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                id="filled-basic"
                variant="filled"
                fullWidth
                required
                type="url"
                label="Image 3"
                value={lastEventPic3}
                onChange={(e) => setLastEventPic3(e.target.value)}
              />
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
                onClick={handleSubmitLastEvent}
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
                onClick={onClose2}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      <div className="VerticalPanel">
        <div className="ProfilePic">
          <Avatar
            size="2xl"
            alt="Profile Pic"
            src={localStorage.getItem("UserImage")}
          />
        </div>
        <div className="VerticalPanelContent">
          <h3>{localStorage.getItem("UserName")}</h3>
          <h3>{localStorage.getItem("UserEmail")}</h3>
          <h3>{localStorage.getItem("UserRno")}</h3>
          <h3>{localStorage.getItem("UserStatus")}</h3>
          {localStorage.getItem("UserCustomPosition") != "" ? (
            <h3>{localStorage.getItem("UserCustomPosition")}</h3>
          ) : (
            <h3>{localStorage.getItem("UserDepartment")}</h3>
          )}
          <div className="ActionButton">
            <Button
              bg={ButtonBgColor[colorMode]}
              color={ButtonColor[colorMode]}
              _hover={{
                bg: HoverButtonBgColor[colorMode],
                color: HoverButtonColor[colorMode],
              }}
              borderRadius="0"
              className="Button"
              variant="solid"
              borderStyle="none"
              onClick={onOpen2}
            >
              Update Last Event
            </Button>
          </div>
          <div className="ActionButton">
            <Button
              bg={ButtonBgColor[colorMode]}
              color={ButtonColor[colorMode]}
              _hover={{
                bg: HoverButtonBgColor[colorMode],
                color: HoverButtonColor[colorMode],
              }}
              borderRadius="0"
              className="Button"
              leftIcon={MdPersonAdd}
              variant="solid"
              borderStyle="none"
              onClick={onOpen}
            >
              Add Member
            </Button>
          </div>
          <div className="ActionButton">
            <Event colorMode={colorMode} />
          </div>
        </div>
      </div>
      <div className="DisplayPanel">
        <h3 className="DisplayPanelHeading">Announcements</h3>
        <div className="DisplayPanelCardContainer">
          <Announcements
            colorMode={colorMode}
            announcements={announcements}
            calledBy="Admin"
            allMembers={allMembers}
          />
        </div>
        <Search coordinators={coordinators} colorMode={colorMode} calledBy="Admin" allMembers={allMembers} />
        {coreMembers.length > 0 ? (
          <div>
            <h3 className="DisplayPanelHeading">Core Members</h3>
            <div className="DisplayPanelCardContainer">
              {coreMembers.map(({ id, coremember }) => (
                <AccountMembersCard
                  colorMode={colorMode}
                  key={id}
                  memberId={id}
                  member={coremember}
                  coordinators={coordinators}
                  calledBy="Admin"
                />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {coordinators.length > 0 ? (
          <div>
            <h3 className="DisplayPanelHeading">Coordinators</h3>
            <div className="DisplayPanelCardContainer">
              {coordinators.map(({ id, coordinator }) => (
                <AccountMembersCard
                  colorMode={colorMode}
                  key={id}
                  memberId={id}
                  member={coordinator}
                  coordinators={coordinators}
                  calledBy="Admin"
                />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <MembersUnderMe colorMode={colorMode} allMembers={allMembers} />
        {members.length > 0 ? (
          <div>
            <h3 className="DisplayPanelHeading">All Members</h3>
            <div className="DisplayPanelCardContainer">
              {members.map(({ id, member }) => (
                <AccountMembersCard
                  colorMode={colorMode}
                  key={id}
                  memberId={id}
                  member={member}
                  coordinators={coordinators}
                  calledBy="Admin"
                />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {(events.length > 0) ? (
          <div>
            <h3 className="DisplayPanelHeading">Events</h3>
            <div className="DisplayPanelCardContainer">
              {events.map(({ id, event }) => (
                <EventCard
                  colorMode={colorMode}
                  key={id}
                  eventId={id}
                  event={event}
                  calledBy="Admin"
                />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {feedbacks.length > 0 ? (
          <div>
            <h3 className="DisplayPanelHeading">Feedbacks</h3>
            <div className="DisplayPanelCardContainer">
              {feedbacks.map(({ id, feedback }) => (
                <DisplayFeedback
                  colorMode={colorMode}
                  key={id}
                  feedbackId={id}
                  feedback={feedback}
                  calledBy="Admin"
                />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        
      </div>
      <Backdrop style={styleText} open={backdropIsOpen} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Admin;
