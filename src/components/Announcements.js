import { Button, useToast } from "@chakra-ui/core";
import { makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import "../style/Announcements.css";

import AnnouncementCard from "./AnnouncementCard";
import { db } from "../firebase";
import firebase from "firebase";

function Announcements({ calledBy, colorMode, announcements, allMembers }) {
  const toast = useToast();
  const [addedBy, setAddedBy] = useState(localStorage.getItem("UserName"));
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [newAnnouncement, setNewAnnouncement] = useState(true);  
  //const [emailList, setEmailList] = useState([])
  var arr=[]
  var i;
  if(arr.length===0){
    for(i=0;i<allMembers.length;i++)
  {
    if(allMembers[i].allmember.email!==""){
      var mail=allMembers[i].allmember.email
      arr.push(mail)
    }
  }
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (heading !== "") {
      db.collection("announcements")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          addedBy,
          heading,
          description,
          link,
          newAnnouncement,
        })
        .then(() => { 
          console.log("Final Email list is ",arr)
          for(i=0;i<arr.length;i++){
            window.Email.send({
              SecureToken : "004ebacb-e2f1-4e69-afe3-9e02a33c6e25",
              To : arr[i],
              From : "admin@inginn.tech",
              Subject : "New Announcement: "+heading,
              Body : description
            })
          }  
          successfullyAdded();
        });
    } else {
      toast({
        title: "Fill The Heading",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    }
  }

  const successfullyAdded = () => {
    setHeading("");
    setDescription("");
    setLink("");
    toast({
      title: "Announcement Successfully Added",
      description: "",
      status: "success",
      duration: 3000,
      isClosable: false,
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
    <div className="Announcements">
      {calledBy === "Admin" || calledBy === "Editor" ? (
        <div className="AddAnnouncement">
          <form>
            <TextField
              className={classes.root}
              InputProps={{ className: classes.root }}
              id="filled-basic"
              variant="filled"
              fullWidth
              required
              type="text"
              label="Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
            <TextField
              className={classes.root}
              InputProps={{ className: classes.root }}
              id="filled-basic"
              variant="filled"
              fullWidth
              multiline
              type="text"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              className={classes.root}
              InputProps={{ className: classes.root }}
              id="filled-basic"
              variant="filled"
              fullWidth
              type="url"
              label="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button
              marginTop="10px"
              bg={ButtonBgColor[colorMode]}
              color={ButtonColor[colorMode]}
              _hover={{
                bg: HoverButtonBgColor[colorMode],
                color: HoverButtonColor[colorMode],
              }}
              borderRadius="0"
              className="Button"
              leftIcon={MdSend}
              variant="solid"
              borderStyle="none"
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      <div className="AnnouncementsContainer">
        {announcements.map(({ id, announcement }) => (
          <AnnouncementCard
            colorMode={colorMode}
            key={id}
            announcementId={id}
            announcement={announcement}
            calledBy={calledBy}
          />
        ))}
      </div>
    </div>
  );
}

export default Announcements;
