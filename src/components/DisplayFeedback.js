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
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { MdClose, MdDelete}from "react-icons/md";
import firebase from "firebase";
import { db } from "../firebase";
import "../style/Feedback.css";

function DisplayFeedback({ feedback, feedbackId ,calledBy, colorMode }) {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  var style;
  if (feedback.category === "Suggestion") {
    style = {
      background: "#d5f2f2",
      color: "#000",
    };
  }
  if (feedback.category === "Complaint") {
    style = {
      background: "#f7a799",
      color: "#000",
    };
  }
  if (feedback.category === "EventSuggestion") {
    style = {
      background: "#9df797",
      color: "#000",
    };
  }
  if (feedback.category === "Feedback") {
    style = {
      background: "#fff",
      color: "#000",
    };
  }
  const NavbarBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const NavbarColor = { light: "#1d1e1f", dark: "#ffffff" };
  var style3 = {
    backgroundColor: NavbarBgColor[colorMode],
    color: NavbarColor[colorMode],
  };

  const deleteFeedback = (e) => {
    db.collection("feedbacks")
      .doc(feedbackId)
      .delete()
      .then(function () {
        
        toast({
          title: "Feedback Successfully Deleted",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: false,
        });
      })
      .catch(function (error) {
        toast({
          title: "Feedback to remove event",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: false,
        });
      });
  };


  return (
    <div style={style} className="DisplayFeedback">
      <div onClick={onOpen} className="DisplayFeedbackContent">
        <h3>{feedback.category}</h3>
        <h3>{feedback.description}</h3>
      </div>
      {calledBy === "Admin"  ? (
        <div className="ButtonContainer">
          <IconButton color="secondary" onClick={deleteFeedback}>
            <MdDelete />
          </IconButton>
        </div>
      ) : (
        <div></div>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent style={style3}>
          <ModalHeader>
            <h3 className="ModalHeader">{feedback.category}</h3>
          </ModalHeader>
          <ModalBody className="MemberInfo">{feedback.description}</ModalBody>
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
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default DisplayFeedback;
