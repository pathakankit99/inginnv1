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
    useToast
} from "@chakra-ui/core";
import "../style/Feedback.css"
import {
    FormControl,
    InputLabel,
    makeStyles,
    Select,
    TextField
} from "@material-ui/core";
import { MdPersonAdd, MdClose, MdSend, MdLock, MdFeedback} from "react-icons/md"; //material design Icon

function Feedback({colorMode}) {
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => {
        setIsOpen(true);
    };
    const onClose = () => {
        setIsOpen(false);
    };
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Feedback")
    const [addedBy, setAddedBy] = useState(localStorage.getItem("UserName"))

    const handleSubmit=(e)=>{
        e.preventDefault()
        
        if(description!==""){
            db.collection("feedbacks").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                description,
                category,
                addedBy
            })
            .then(()=>{
                window.Email.send({
                    SecureToken : "004ebacb-e2f1-4e69-afe3-9e02a33c6e25",
                    To : ['ankitpathak143192@gmail.com','inginn.lpu@gmail.com'],
                    From : "admin@inginn.tech",
                    Subject : category+" Added By "+ addedBy,
                    Body : description
                  })
                  .then(
                    successfullyAdded()
                  )
                                                   
            })
        }
        else{
            toast({
                title: "Feedback Adding Failed",
                description: "",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        }

        

    }

    const successfullyAdded = () => {
        toast({
            title: "Feedback Successfully Added",
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
    const NavbarBgColor = {  light: "#ffffff", dark: "#1d1e1f" };
    const NavbarColor = { light: "#1d1e1f", dark: "#ffffff"};
    var style3={
        backgroundColor: NavbarBgColor[colorMode],
        color: NavbarColor[colorMode]
    }
    var styleText={
        color: NavbarColor[colorMode]
    }
    return (
        <div style={styleText}>
            <Button
            borderRadius="0" 
            className="Button"
            leftIcon={MdFeedback} 
            variant="solid" 
            borderStyle="none"
            
            bg={ButtonBgColor[colorMode]}
            color={ButtonColor[colorMode]}
            _hover={{ bg: HoverButtonBgColor[colorMode], 
            color: HoverButtonColor[colorMode] }}
            onClick={onOpen}>Feedback</Button>
             <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <form>
                    <ModalContent style={style3}>
                    <ModalHeader><h3 className="ModalHeader">Feedback/ Suggestion</h3></ModalHeader>
                    <ModalBody>
                    <FormControl className={classes.root} variant="filled" fullWidth>
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select                            
                            className={classes.root}
                            InputProps={{ className: classes.root  }}
                            value={category}
                            native
                            onChange={(e)=>{
                                //console.log("status is ",status)
                                setCategory(e.target.value)}}
                                inputProps={{
                                    name: 'Category',
                                    id: 'category',
                                }}
                            >
                            <option value="Feedback">Feedback</option>
                            <option value="Suggestion">Suggestion</option>
                            <option value="Complaint">Complaint</option>
                            <option value="EventSuggestion">Event Suggestion</option>
                            </Select>
                        </FormControl>
                        <TextField 
                            className={classes.root}
                            InputProps={{ className: classes.root  }}
                        type="text"
                        id="filled-basic" 
                        label="Description" 
                        value={description}
                        multiline
                        onChange={(e)=>{setDescription(e.target.value)}}
                        variant="filled" 
                        fullWidth /> 
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
                        _hover={{ bg: HoverButtonBgColor[colorMode], 
                        color: HoverButtonColor[colorMode] }}
                        onClick={handleSubmit}>SUBMIT</Button>
                        <Button 
                            borderRadius="0" 
                            _hover={{ bg: "#000", color:"#f06567" }}
                            background="#8f0e10" 
                            color="#ffffff"
                            className="Button" 
                            leftIcon={MdClose} 
                            variant="solid" 
                            borderStyle="none"
                            onClick={onClose}>Close</Button>
                    </ModalFooter>
                    </ModalContent>
                    </form>
                </Modal>
               
            
        </div>
    )
}

export default Feedback
