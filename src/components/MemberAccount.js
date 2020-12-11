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

function MemberAccount({
  coordinators,
  coreMembers,
  members,
  events,
  announcements,
  allMembers,
  colorMode,
}) {
  //console.log("Announcement in Admin ", announcements);

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

  const [status, setStatus] = useState("Member");
  const [dob, setDob] = useState("");
  const [rno, setRno] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [course, setCourse] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("Operations");
  const [myCoordinator, setMyCoordinator] = useState("");
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
    if (!localStorage.getItem("User")) {
      return history.push("/");
    }
  }, [history]);

  const handleUpdatePassword = (e) => {
    e.preventDefault();

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
  };

  const ButtonBgColor = { light: "#1d1e1f", dark: "#ffffff" };
  const ButtonColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonColor = { light: "#1d1e1f", dark: "#ffffff" };

  const TextFieldBgColor = { light: "#e8e8e8", dark: "#383838" };
  const TextFieldColor = { light: "#383838", dark: "#e8e8e8" };
  const useStyles = makeStyles({
    root: {
      "& label.Mui-focused": {
        color: TextFieldColor[colorMode],
      },
      "& label": {
        color: TextFieldColor[colorMode],
      },
      "& .MuiSelect-select:not([multiple]) option, .MuiSelect-select:not([multiple]) optgroup": {
        background: TextFieldBgColor[colorMode],
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
              bg={ButtonBgColor[colorMode]}
              color={ButtonColor[colorMode]}
              _hover={{
                bg: HoverButtonBgColor[colorMode],
                color: HoverButtonColor[colorMode],
              }}
              className="Button"
              leftIcon={MdLock}
              variant="solid"
              borderStyle="none"
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
            calledBy="Member"
            allMembers={allMembers}
          />
        </div>
        <Search coordinators={coordinators} colorMode={colorMode} calledBy="Member" allMembers={allMembers} />
        <h3 className="DisplayPanelHeading">Core Members</h3>
        <div className="DisplayPanelCardContainer">
          {coreMembers.map(({ id, coremember }) => (
            <AccountMembersCard
              colorMode={colorMode}
              key={id}
              memberId={id}
              member={coremember}
              coordinators={coordinators}
              calledBy="Member"
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
              calledBy="Member"
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
              calledBy="Member"
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
                  calledBy="Member"
                />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        
      </div>
    </div>
  );
}

export default MemberAccount;
