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
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  TextField,
} from "@material-ui/core";
import { MdPersonAdd, MdClose, MdSend, MdLock } from "react-icons/md"; //material design Icon
import { useHistory } from "react-router-dom";
import AccountMembersCard from "./AccountMembersCard";
import Event from "./Event";
import EventCard from "./EventCard";
import Announcements from "./Announcements";
import Feedback from "./Feedback";
import DisplayFeedback from "./DisplayFeedback";
import MembersUnderMe from "./MembersUnderMe";
import Search from "./Search";

function Editor({
  coordinators,
  coreMembers,
  members,
  events,
  announcements,
  feedbacks,
  allMembers,
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

  const [isOpen2, setIsOpen2] = useState(false);
  const onOpen2 = () => {
    setIsOpen2(true);
  };
  const onClose2 = () => {
    setIsOpen2(false);
  };

  const [backdropIsOpen, setBackdropIsOpen] = useState(false)

  const [status, setStatus] = useState("Member");
  const [dob, setDob] = useState("");
  const [rno, setRno] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [course, setCourse] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("None");
  const [myCoordinator, setMyCoordinator] = useState("None");
  const [admin, setAdmin] = useState(false);
  const [editor, setEditor] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [instaUrl, setInstaUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [customPosition, setCustomPosition] = useState("");
  const [addedBy, setAddedBy] = useState(localStorage.getItem("UserName"));

  const [updatePass, setUpdatePass] = useState("");
  const [updatePass2, setUpdatePass2] = useState("");

  var styleStatus;
  if (localStorage.getItem("UserStatus") == "Coordinator") {
    styleStatus = {
      display: "none",
    };
  }

  let history = useHistory();

  useEffect(() => {
    //console.log("Does user exist? ",localStorage.getItem("User"))
    if (!localStorage.getItem("User")) {
      history.push("/");
      return (window.location.href = "/");
    } else {
      //console.log("Is user an Admin? ",(localStorage.getItem("UserAdmin")!=true))
      if (localStorage.getItem("UserEditor") !== "true") {
        //console.log("Redirecting user to homepage")
        history.push("/");
        return (window.location.href = "/");
      } else {
        db.collection("members")
          .where("rno", "==", localStorage.getItem("UserRno"))
          .get()
          .then(function (querySnapshot) {
            //console.log("Length of query response ", querySnapshot.docs.length);
            if (querySnapshot.docs.length > 0) {
              //console.log("User Exists in database");
            } else {
              //console.log("User is no more a member of inginn");
              localStorage.clear();
              history.push("/");
              return (window.location.href = "/");
            }
          });
      }
    }
  }, [history]);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setBackdropIsOpen(true)
    if (updatePass === updatePass2) {
      toast({
        title: "Do not Refresh or Close the tab",
        description: "We are securing your password. Go and have some chai.",
        status: "warning",
        duration: 3000,
        isClosable: false,
      });
      fetch("https://inginnapi.herokuapp.com/hashpass", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("UserId"),
          password: updatePass2,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          if (data.token === "100") {
            toast({
              title: "Password Successfully Updated",
              description: "",
              status: "success",
              duration: 3000,
              isClosable: false,
            });
          } else {
            toast({
              title: "Some Error Occured",
              description: "",
              status: "error",
              duration: 3000,
              isClosable: false,
            });
          }
        });
    } else {
      toast({
        title: "Passwords dont match",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    }
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
              instaUrl,
            })
            .then(() => {
              //console.log("Rno is ", rno);
              db.collection("members")
                .where("rno", "==", rno)
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    updatePassword(doc.id);
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
      });
      setBackdropIsOpen(false)
  };

  const updatePassword = (id) => {
    fetch("https://inginnapi.herokuapp.com/hashpass", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        if (data.token === "100") {
          successfullyAdded();
        } else {
          toast({
            title: "Encrypting the password failed.",
            description: "But member has been added. Kindly update password",
            status: "error",
            duration: 3000,
            isClosable: false,
          });
        }
      });
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

  function ChooseCoordinator({ coordinators }) {
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
            <option value="None">NONE</option>
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
  var style3 = {
    backgroundColor: NavbarBgColor[colorMode],
    color: NavbarColor[colorMode],
  };
  var styleText = {
    color: NavbarColor[colorMode],
  };

  return (
    <div style={styleText} className="MyAccount">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form>
          <ModalContent style={style3}>
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
                    //console.log("status is ",status)
                    setStatus(e.target.value);
                  }}
                  inputProps={{
                    name: "Status",
                    id: "member-status",
                  }}
                >
                  <option value="Member">Member</option>
                  <option value="Core">Core</option>
                  <option value="Coordinator">Coordinator</option>
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
                  <option value="None">None</option>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Media and Marketing</option>
                  <option value="HR">Human Resource</option>
                  <option value="PS">Public Speaking</option>
                  <option value="Sponsorship">Sponsorship</option>
                </Select>
              </FormControl>
              {status === "Member" ? (
                <div>
                  <ChooseCoordinator coordinators={coordinators} />
                </div>
              ) : (
                <div></div>
              )}

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
      <Modal isOpen={isOpen2} onClose={onClose2} isCentered>
        <ModalOverlay />
        <form>
          <ModalContent style={style3}>
            <ModalHeader>
              <h3 className="ModalHeader">Update Password</h3>
            </ModalHeader>
            <ModalBody>
              <TextField
                className={classes.root}
                InputProps={{ className: classes.root }}
                type="text"
                id="filled-basic"
                label="Password"
                value={updatePass}
                onChange={(e) => {
                  setUpdatePass(e.target.value);
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
                label="Confirm Password"
                value={updatePass2}
                onChange={(e) => {
                  setUpdatePass2(e.target.value);
                }}
                variant="filled"
                required
                fullWidth
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
                onClick={handleUpdatePassword}
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
            <h3>My Department: {localStorage.getItem("UserDepartment")}</h3>
          )}
          {localStorage.getItem("UserCoordinator") != "" ? (
            <h3 style={styleStatus}>
              My Coordinator: {localStorage.getItem("UserCoordinator")}
            </h3>
          ) : (
            <h3></h3>
          )}
          <div className="ActionButton">
            <Button
              borderRadius="0"
              className="Button"
              leftIcon={MdPersonAdd}
              variant="solid"
              borderStyle="none"
              bg={ButtonBgColor[colorMode]}
              color={ButtonColor[colorMode]}
              _hover={{
                bg: HoverButtonBgColor[colorMode],
                color: HoverButtonColor[colorMode],
              }}
              onClick={onOpen}
            >
              Add Member
            </Button>
          </div>
          <div className="ActionButton">
            <Event colorMode={colorMode} />
          </div>
          <div className="ActionButton">
            <Button
              borderRadius="0"
              className="Button"
              leftIcon={MdLock}
              variant="solid"
              borderStyle="none"
              bg={ButtonBgColor[colorMode]}
              color={ButtonColor[colorMode]}
              _hover={{
                bg: HoverButtonBgColor[colorMode],
                color: HoverButtonColor[colorMode],
              }}
              onClick={onOpen2}
            >
              Update Password
            </Button>
          </div>
          <div className="ActionButton">
            <Feedback colorMode={colorMode} />
          </div>
        </div>
      </div>
      <div className="DisplayPanel">
        <h3 className="DisplayPanelHeading">Announcements</h3>
        <div className="DisplayPanelCardContainer">
          <Announcements
            colorMode={colorMode}
            announcements={announcements}
            calledBy="Editor"
            allMembers={allMembers}
          />
        </div>
        <Search coordinators={coordinators} colorMode={colorMode} calledBy="Editor" allMembers={allMembers} />
        <h3 className="DisplayPanelHeading">Core Members</h3>
        <div className="DisplayPanelCardContainer">
          {coreMembers.map(({ id, coremember }) => (
            <AccountMembersCard
              colorMode={colorMode}
              key={id}
              memberId={id}
              member={coremember}
              coordinators={coordinators}
              calledBy="Editor"
            />
          ))}
        </div>
        <h3 className="DisplayPanelHeading">Coordinators</h3>
        <div className="DisplayPanelCardContainer">
          {coordinators.map(({ id, coordinator }) => (
            <AccountMembersCard
              colorMode={colorMode}
              key={id}
              memberId={id}
              member={coordinator}
              coordinators={coordinators}
              calledBy="Editor"
            />
          ))}
        </div>
        <MembersUnderMe colorMode={colorMode} allMembers={allMembers} />
        <h3 className="DisplayPanelHeading">All Members</h3>
        <div className="DisplayPanelCardContainer">
          {members.map(({ id, member }) => (
            <AccountMembersCard
              colorMode={colorMode}
              key={id}
              memberId={id}
              member={member}
              coordinators={coordinators}
              calledBy="Editor"
            />
          ))}
        </div>
        {events.length > 0 ? (
          <div>
            <h3 className="DisplayPanelHeading">Events</h3>
            <div className="DisplayPanelCardContainer">
              {events.map(({ id, event }) => (
                <EventCard
                  colorMode={colorMode}
                  key={id}
                  eventId={id}
                  event={event}
                  calledBy="Editor"
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
                  calledBy="Editor"
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

export default Editor;
