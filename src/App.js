import React, { useEffect, useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import { db } from "./firebase";
import {
  ColorModeProvider,
  ThemeProvider,
  useColorMode,
  useToast,
} from "@chakra-ui/core";
import { FiSun } from "react-icons/fi";

//import Navbar from "./components/Navbar"
import Section1 from "./components/HomepageSec1";
import Section2 from "./components/HomepageSec2";
import Section3 from "./components/HomePageSec3";
import Section4 from "./components/HomepageSec4";
import Admin from "./components/Admin";
import Editor from "./components/Editor";
import MemberAccount from "./components/MemberAccount";
import Footer from "./components/Footer";
import Error from "./components/Error";
import LastEvent from "./components/LastEvent";
import DisplayAllMembers from "./components/DisplayAllMembers";
import PhotographyReloaded from "./components/PhotographyReloaded"
import UpcomingEvent from "./components/UpcomingEvent"

import { Button } from "@chakra-ui/core";
import { Backdrop, CircularProgress, IconButton, TextField } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "./style/Navbar.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/core";
import { MdHome, MdPerson, MdClose, MdSend } from "react-icons/md"; //material design Icon
import { FaMoon } from "react-icons/fa";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ColorModeProvider>
          <Navbar />
        </ColorModeProvider>
      </ThemeProvider>
    </Router>
  );
}

function Navbar() {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const [isOpen2, setIsOpen2] = useState(false);

  let history = useHistory();

  const [user, setUser] = useState(localStorage.getItem("User") || false);

  const [rno, setRno] = useState(localStorage.getItem("UserRno") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("UserPassword") || ""
  );

  const [status, setStatus] = useState(
    localStorage.getItem("UserStatus") || ""
  );

  const [admin, setAdmin] = useState(
    localStorage.getItem("UserAdmin") || false
  );

  const [editor, setEditor] = useState(
    localStorage.getItem("UserEditor") || false
  );

  const [allMembers, setAllMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [coreMembers, setCoreMembers] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [lastEvents, setLastEvents] = useState([]);

  const { colorMode, toggleColorMode } = useColorMode();
  

  useEffect(() => {
    db.collection("members").onSnapshot((snapshot) => {
      setAllMembers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          allmember: doc.data(),
        }))
      );
    });

    db.collection("feedbacks")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setFeedbacks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            feedback: doc.data(),
          }))
        );
      });

    db.collection("announcements")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setAnnouncements(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            announcement: doc.data(),
          }))
        );
      });

    db.collection("members")
      .where("status", "==", "Core")
      .onSnapshot((snapshot) => {
        setCoreMembers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            coremember: doc.data(),
          }))
        );
      });

    db.collection("events").onSnapshot((snapshot) => {
      setEvents(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          event: doc.data(),
        }))
      );
    });

    db.collection("members")
      .where("status", "==", "Coordinator")
      .onSnapshot((snapshot) => {
        setCoordinators(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            coordinator: doc.data(),
          }))
        );
      });

    db.collection("members")
      .where("status", "==", "Member")
      .onSnapshot((snapshot) => {
        setMembers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            member: doc.data(),
          }))
        )
      })


    db.collection("lastEvent").onSnapshot((snapshot) => {
      setLastEvents(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          lastEvent: doc.data(),
        }))
      )
    })

    
  }, []);
  

  const logIn = (e) => {
    e.preventDefault();
   if(rno!==""){
          setIsOpen2(true);
          db.collection("members")
            .where("rno", "==", rno)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                if(password==doc.data().password){
                    setUser("true");
                    setStatus(doc.data().status);
                    setAdmin(doc.data().admin);
                    setEditor(doc.data().editor);
                    localStorage.setItem("UserId", doc.id);
                    localStorage.setItem("UserName", doc.data().name);
                    localStorage.setItem("UserEmail", doc.data().email);
                    localStorage.setItem("UserDepartment", doc.data().department);
                    localStorage.setItem("UserContact", doc.data().contact);
                    localStorage.setItem("UserCourse", doc.data().course);
                    localStorage.setItem(
                      "UserCoordinator",
                      doc.data().myCoordinator
                    );
                    localStorage.setItem("UserDob", doc.data().dob);
                    localStorage.setItem("UserImage", doc.data().imageUrl);
                    localStorage.setItem("UserRno", doc.data().rno);
                    localStorage.setItem("UserPassword", doc.data().password);
                    localStorage.setItem("User", "true");
                    localStorage.setItem("UserStatus", doc.data().status);
                    localStorage.setItem("UserAdmin", doc.data().admin);
                    localStorage.setItem("UserEditor", doc.data().editor);
                    localStorage.setItem(
                      "UserCustomPosition",
                      doc.data().customPosition
                    );
                    setIsOpen2(false);
                    toast({
                      title: "Login Successful",
                      description: "",
                      status: "success",
                      duration: 3000,
                      isClosable: false,
                    });
                }
                else{
                  toast({
                    title: "Check rno/password",
                    description: "",
                    status: "error",
                    duration: 3000,
                    isClosable: false,
                  });
                }
                
              });
            });
  }
   
   else{
    toast({
      title: "Please Fill the form",
      description: "LOGIN is available only for INGINN Members",
      status: "error",
      duration: 3000,
      isClosable: false,
    });
   }
   setIsOpen2(false);
  };
 
  const logOut = (e) => {
    localStorage.clear();
    //console.log("logged out");
    history.push("/");
    return (window.location.href = "/");
    //window.location.reload(false);
  };

  function goHome() {
    history.push("/");
    window.location.reload(false);
    return (window.location.href = "/");
  }

  const gotoAccount = (e) => {
    ////console.log("Checking userStatus...", localStorage.getItem('UserStatus'))
    if (
      localStorage.getItem("UserAdmin") === "false" &&
      localStorage.getItem("UserEditor") === "false"
    ) {
      //console.log("member true")
      return history.push("/account");
    }
    if (localStorage.getItem("UserEditor") === "true") {
      //console.log("editor true")
      return history.push("/editor");
    }
    if (localStorage.getItem("UserAdmin") === "true") {
      //console.log("admin true")
      return history.push("/admin");
    }
  };
  const ButtonBgColor = { light: "#1d1e1f", dark: "#ffffff" };
  const ButtonColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonColor = { light: "#1d1e1f", dark: "#ffffff" };

  //console.log(colorMode);

  const NavbarBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const NavbarColor = { light: "#1d1e1f", dark: "#ffffff" };
  var style = {
    backgroundColor: NavbarBgColor[colorMode],
    color: NavbarColor[colorMode],
  };
  var styleText = {
    color: NavbarColor[colorMode],
  };

  const BodyBgColor = { light: "#e8e8e8", dark: "#383838" };
  const BodyColor = { light: "#383838", dark: "#e8e8e8" };
  var bodyStyle = {
    backgroundColor: BodyBgColor[colorMode],
    color: BodyColor[colorMode],
  };

  const logoDisplay1 = { light: "none", dark: "inline" };
  const logoDisplay2 = { light: "inline", dark: "none" };
  var logoStyle1 = {
    display: logoDisplay1[colorMode],
  };
  var logoStyle2 = {
    display: logoDisplay2[colorMode],
  };

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
      "& #modal-1": {
        backgroundColor: "#000000",
      },
      backgroundColor: TextFieldBgColor[colorMode],
      color: TextFieldColor[colorMode],
    },
  });
  const classes = useStyles();

  return (
    <div>
      <div style={style} className="Navbar">
        <div className="NavbarContent">
          <Link style={logoStyle1} to="/">
            <img
              className="NavbarImage"
              onClick={goHome}
              src="/images/ShortLogoWhite.webp"
              alt="INGINN Logo"
            />
          </Link>
          <Link style={logoStyle2} to="/">
            <img
              className="NavbarImage"
              onClick={goHome}
              src="/images/ShortLogoBlack.webp"
              alt="INGINN Logo"
            />
          </Link>

          <div style={style} className="NavbarIcon">
            <Link to="/">
              <IconButton style={style}>
                <MdHome style={style} />
              </IconButton>
            </Link>
          </div>
          <IconButton style={style} onClick={toggleColorMode}>
            {colorMode === "dark" ? <FiSun /> : <FaMoon />}
          </IconButton>
          <div>
            {user === "true" ? (
              <div className="ButtonContainer">
                <Button
                size="sm"
                  bg={ButtonBgColor[colorMode]}
                  color={ButtonColor[colorMode]}
                  _hover={{
                    bg: HoverButtonBgColor[colorMode],
                    color: HoverButtonColor[colorMode],
                  }}
                  marginRight="10px"
                  borderRadius="0"
                  className="Button"
                  leftIcon={MdPerson}
                  onClick={gotoAccount}
                  variant="solid"
                  borderStyle="none"
                >
                  My Account
                </Button>
                <Button
                size="sm"
                  bg={ButtonBgColor[colorMode]}
                  color={ButtonColor[colorMode]}
                  _hover={{
                    bg: HoverButtonBgColor[colorMode],
                    color: HoverButtonColor[colorMode],
                  }}
                  type="button"
                  borderRadius="0"
                  className="Button"
                  leftIcon={MdClose}
                  variant="solid"
                  borderStyle="none"
                  onClick={logOut}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <Button
                bg={ButtonBgColor[colorMode]}
                color={ButtonColor[colorMode]}
                _hover={{
                  bg: HoverButtonBgColor[colorMode],
                  color: HoverButtonColor[colorMode],
                }}
                borderRadius="0"
                className="Button"
                leftIcon={MdPerson}
                variant="solid"
                borderStyle="none"
                onClick={onOpen}
              >
                Log In
              </Button>
            )}
          </div>
        </div>
        <Modal
          style={style}
          className={classes.root}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent style={style} className={classes.root}>
            <form>
              <ModalHeader>
                <h3 style={styleText} className="ModalHeader">
                  LOGIN
                </h3>
              </ModalHeader>
              <ModalBody style={style}>
                <TextField
                  className={classes.root}
                  onChange={(e) => setRno(e.target.value)}
                  value={rno}
                  type="number"
                  label="Registration Number"
                  variant="filled"
                  required
                  InputProps={{
                    className: classes.root,
                  }}
                  fullWidth
                />
                <TextField
                  className={classes.root}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  label="Password"
                  variant="filled"
                  required
                  InputProps={{
                    className: classes.root,
                  }}
                  fullWidth
                />
              </ModalBody>

              <ModalFooter>
                <Button
                  bg={ButtonBgColor[colorMode]}
                  color={ButtonColor[colorMode]}
                  _hover={{
                    bg: HoverButtonBgColor[colorMode],
                    color: HoverButtonColor[colorMode],
                  }}
                  borderRadius="0"
                  type="submit"
                  className="Button"
                  leftIcon={MdSend}
                  variant="solid"
                  borderStyle="none"
                  onClick={logIn}
                >
                  Log In
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
            </form>
          </ModalContent>
        </Modal>
      </div>
      <div style={bodyStyle} className="HeroContainer">
      </div>
      <Switch>
        <Route exact path="/">
          <Home
            coordinators={coordinators}
            coreMembers={coreMembers}
            members={members}
            events={events}
            allMembers={allMembers}
            feedbacks={feedbacks}
            announcements={announcements}
            lastEvents={lastEvents}
            colorMode={colorMode}
          />
        </Route>
        <Route exact path="/admin">
          <Admin
            coordinators={coordinators}
            coreMembers={coreMembers}
            members={members}
            events={events}
            allMembers={allMembers}
            announcements={announcements}
            feedbacks={feedbacks}
            lastEvents={lastEvents}
            colorMode={colorMode}
          />
        </Route>
        <Route exact path="/editor">
          <Editor
            coordinators={coordinators}
            coreMembers={coreMembers}
            members={members}
            events={events}
            allMembers={allMembers}
            announcements={announcements}
            feedbacks={feedbacks}
            colorMode={colorMode}
          />
        </Route>
        <Route exact path="/account">
          <MemberAccount
            coordinators={coordinators}
            coreMembers={coreMembers}
            members={members}
            events={events}
            allMembers={allMembers}
            announcements={announcements}
            colorMode={colorMode}
          />
          
        </Route>
        <Route path="/allmembers">
          <DisplayAllMembers
            coordinators={coordinators}
            coreMembers={coreMembers}
            members={members}
            events={events}
            allMembers={allMembers}
            announcements={announcements}
            colorMode={colorMode}
          />
          
        </Route>
        <Route path="/photographyreloaded">
          <PhotographyReloaded
            colorMode={colorMode}
          />
          
        </Route>
        <Route component={NoMatchPage} />
      </Switch>
      <Backdrop style={styleText} open={isOpen2} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Footer colorMode={colorMode} allMembers={allMembers} />
    </div>
  );
}
function NoMatchPage() {
  return <Error />;
}

function Home({
  coreMembers,
  colorMode,
  coordinators,
  members,
  allMembers,
  events,
  announcements,
  lastEvents,
  feedbacks
}) {
  return (
    <div className="Section1">
      <Section1 colorMode={colorMode} events={events} />
      <UpcomingEvent colorMode={colorMode} events={events}/>
      <LastEvent colorMode={colorMode} lastEvents={lastEvents} />
      <Section2 colorMode={colorMode} lastEvents={lastEvents} />
      <Section3
        colorMode={colorMode}
        coreMembers={coreMembers}
        coordinators={coordinators}
        members={members}
      />
      
      <Section4 colorMode={colorMode} events={events} calledBy="Home" />
    </div>
  );
}

export default App;
