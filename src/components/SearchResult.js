import React, { useState } from "react";
import "../style/SearchResult.css";
import firebase from "firebase";
import { db } from "../firebase";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { MdEdit, MdDelete, MdClose, MdSend } from "react-icons/md"; //material design Icon

function SearchResult({
  memberId,
  member,
  coordinators,
  calledBy,
  colorMode,
  query
}) {
  console.log("Member is ", member)
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
    setIsDetailOpen(false);
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

  const [status, setStatus] = useState(member.status || "");
  const [dob, setDob] = useState(member.dob || "");
  const [oldRno, setOldRno] = useState(member.rno || "");
  const [rno, setRno] = useState(member.rno || "");
  const [name, setName] = useState(member.name || "");
  const [email, setEmail] = useState(member.email || "");
  const [password, setPassword] = useState(null);
  const [course, setCourse] = useState(member.course || "");
  const [contact, setContact] = useState(member.contact || "");
  const [department, setDepartment] = useState(member.department || "");
  const [myCoordinator, setMyCoordinator] = useState(
    member.myCoordinator || "None"
  );
  const [admin, setAdmin] = useState(member.admin || false);
  const [editor, setEditor] = useState(member.editor || false);
  const [imageUrl, setImageUrl] = useState(member.imageUrl || "");
  const [customPosition, setCustomPosition] = useState(
    member.customPosition || ""
  );
  const [editPass, setEditPass] = useState(false);
  const [updatedBy, setUpdatedBy] = useState(localStorage.getItem("UserName"));
  const [instaUrl, setInstaUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  function deleteMember() {
    db.collection("members")
      .doc(memberId)
      .delete()
      .then(function () {
        toast({
          title: "Member Deleted Successfully",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: false,
        });
      })
      .catch(function (error) {
        toast({
          title: "Unable to delete Member",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: false,
        });
      });
  }

  const successfullyUpdated = () => {
    toast({
      title: "Member Successfully Updated",
      description: "",
      status: "success",
      duration: 3000,
      isClosable: false,
    });
  };

  const updateMember = (e) => {
    e.preventDefault();

    if (rno != "") {
      if (oldRno === rno) {
        if (password) {
          toast({
            title: "Do not refresh or close",
            description: "We are securing Your password. Sit Back and Relax",
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
              id: memberId,
              password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.token === "100") {
                db.collection("members")
                  .doc(memberId)
                  .set(
                    {
                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                      email,
                      rno,
                      name,
                      dob,
                      course,
                      contact,
                      status,
                      department,
                      admin,
                      editor,
                      imageUrl,
                      myCoordinator,
                      customPosition,
                      updatedBy,
                      linkedinUrl,
                      instaUrl,
                    },
                    { merge: true }
                  )
                  .then(() => {
                    successfullyUpdated();
                    setPassword(null);
                  });
              } else {
                toast({
                  title: "Some Error Occurred",
                  description: "",
                  status: "error",
                  duration: 3000,
                  isClosable: false,
                });
              }
            });
        } else {
          db.collection("members")
            .doc(memberId)
            .set(
              {
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                email,
                rno,
                name,
                dob,
                course,
                contact,
                status,
                department,
                admin,
                editor,
                imageUrl,
                myCoordinator,
                customPosition,
                linkedinUrl,
                instaUrl,
                updatedBy,
              },
              { merge: true }
            )
            .then(() => {
              successfullyUpdated();
            });
        }
      } else {
        db.collection("members")
          .where("rno", "==", rno)
          .get()
          .then(function (querySnapshot) {
            if (querySnapshot.docs.length > 0) {
              localStorage.setItem("rnoExists", true);
              setIsOpen(true);
              toast({
                title: "Member already exist",
                description: "",
                status: "error",
                duration: 3000,
                isClosable: false,
              });
            } else {
              localStorage.setItem("rnoExists", false);
            }
          })
          .then(function () {
            if (localStorage.getItem("rnoExists") === "false") {
              // //console.log("Update button clicked and data submitted and RNO not updated")
              if (password) {
                //console.log("Going to call pass hash api")
                fetch("https://inginnapi.herokuapp.com/hashpass", {
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: memberId,
                    password,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    //console.log(data)
                    if (data.token === "100") {
                      db.collection("members")
                        .doc(memberId)
                        .set(
                          {
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            email,
                            rno,
                            name,
                            dob,
                            course,
                            contact,
                            status,
                            department,
                            admin,
                            editor,
                            imageUrl,
                            myCoordinator,
                            customPosition,
                            linkedinUrl,
                            instaUrl,
                            updatedBy,
                          },
                          { merge: true }
                        )
                        .then(() => {
                          successfullyUpdated();
                        });
                    } else {
                      toast({
                        title: "Some Error Occurred",
                        description: "",
                        status: "error",
                        duration: 3000,
                        isClosable: false,
                      });
                    }
                  });
              } else {
                //console.log("Password not updated")
                db.collection("members")
                  .doc(memberId)
                  .set(
                    {
                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                      email,
                      rno,
                      name,
                      dob,
                      course,
                      contact,
                      status,
                      department,
                      admin,
                      editor,
                      imageUrl,
                      myCoordinator,
                      customPosition,
                      linkedinUrl,
                      instaUrl,
                      updatedBy,
                    },
                    { merge: true }
                  )
                  .then(() => {
                    successfullyUpdated();
                  });
              }
            }
          });
      }
    } else {
      toast({
        title: "Registration Number Missing",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    }
  };

  function ChooseCoordinator({ coordinators }) {
    //console.log(myCoordinator)
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
            <option value="None">None</option>
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

  var style2;
  if (member.rno === "11900684") {
    style2 = {
      display: "none",
    };
  }


  var style4
  var searchRno=member.rno;
  var searchName=member.name;
  var searchDepartment=member.department;
  if(searchRno.includes(query)||searchName.includes(query)||searchDepartment.includes(query)){
      style4={
          display:"flex"
      }
  }
  else{
      style4={
          display: "none"
      }
  }
  return (
    <div style={style4} className="SearchMemberCard">
      <Modal isOpen={isDetailOpen} onClose={onDetailClose} isCentered>
        <ModalOverlay />
        <ModalContent style={style3}>
          <ModalHeader>
            <h3 className="SearchModalHeader">{member.name}</h3>
          </ModalHeader>
          <ModalBody>
            <div className="SearchMemberInfo">
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
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              borderRadius="0"
              _hover={{ bg: "#000", color: "#f06567" }}
              background="#8f0e10"
              color="#ffffff"
              className="SearchButton"
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
      <div onClick={onDetailOpen} className="SearchMemberCardContent">
        <Avatar alt="profile pic" src={member.imageUrl} />
        <h3>{member.name}</h3>
      </div>
      {calledBy === "Admin" || calledBy === "Editor" ? (
        <div style={style2} className="SearchButtonContainer">
          <IconButton color="secondary" onClick={deleteMember}>
            <MdDelete />
          </IconButton>
          <IconButton style={style3} onClick={onOpen}>
            <MdEdit />
          </IconButton>
        </div>
      ) : (
        <div></div>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form>
          <ModalContent style={style3}>
            <ModalHeader>
              <h3 className="SearchModalHeader">UPDATE MEMBER</h3>
            </ModalHeader>
            <ModalCloseButton />
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
                type="email"
                label="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {editPass ? (
                <TextField
                  className={classes.root}
                  InputProps={{ className: classes.root }}
                  id="filled-basic"
                  variant="filled"
                  fullWidth
                  type="text"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <div></div>
              )}
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
                  native
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
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
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Media and Marketing</option>
                  <option value="HR">Human Resource</option>
                  <option value="PS">Public Speaking</option>
                  <option value="None">None</option>
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
                type="url"
                label="LinkedIn URL"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
              {calledBy === "Admin" ? (
                <div>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editPass}
                          onChange={(e) => setEditPass(!editPass)}
                          name="Edit Password"
                        />
                      }
                      label="Edit Password?"
                    />
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
                </div>
              ) : (
                <div></div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                borderRadius="0"
                className="SearchButton"
                leftIcon={MdSend}
                variant="solid"
                borderStyle="none"
                bg={ButtonBgColor[colorMode]}
                color={ButtonColor[colorMode]}
                _hover={{
                  bg: HoverButtonBgColor[colorMode],
                  color: HoverButtonColor[colorMode],
                }}
                onClick={updateMember}
              >
                UPDATE
              </Button>
              <Button
                borderRadius="0"
                _hover={{ bg: "#000", color: "#f06567" }}
                background="#8f0e10"
                color="#ffffff"
                className="SearchButton"
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

export default SearchResult;
