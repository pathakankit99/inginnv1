import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/core'
import { FormControl, InputLabel, makeStyles, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { MdClose, MdNoteAdd, MdSend } from 'react-icons/md'
import firebase from "firebase"
import {db} from "../firebase"

function Event({colorMode}) {
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false)
    const onOpen=()=>{
        setIsOpen(true)
    }
    const onClose=()=>{
        setIsOpen(false)
    }
    
  

    const [eventName, setEventName] = useState('')
    const [eventPage, setEventPage] = useState('')
    const [eventPoster, setEventPoster] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventStatus, setEventStatus] = useState('Planning')
    const [eventUrl, setEventUrl] = useState('')
    const [eventGuest, setEventGuest] = useState('')
    const [eventSponsors, setEventSponsors] = useState('')
    const [eventParticipants, setEventParticipants] = useState('')
    const [eventOrganizerCertificate, setEventOrganizerCertificate] = useState('')
    const [eventParticipantCertificate, setEventParticipantCertificate] = useState('')
    const [addedBy, setAddedBy]=useState(localStorage.getItem("UserName"))

    const handleSubmit = (e)=>{
        e.preventDefault()
        setIsOpen(true )
        if(eventName!='' ){
            db.collection("events").add({
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
                addedBy,
                eventUrl,
                eventPoster,
                eventPage
            })
            .then(()=>{
                successfullyAdded()                                   
            })
        }
        else{
            toast({
                title: "Add Event Name",
                description: "",
                status: "error",
                duration: 3000,
                isClosable: false,
                })
        }
                   

    }
    
    const successfullyAdded=()=>{
        setEventDate('')
        setEventDescription('')
        setEventGuest('')
        setEventName('')
        setEventOrganizerCertificate('')
        setEventParticipantCertificate('')
        setEventParticipants('')
        setEventSponsors('')
        setEventStatus('Planning')
        setEventUrl('')
        setEventPoster('')
        setEventPage('')
        toast({
        title: "Event Successfully Added",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: false,
        })
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

  const NavbarBgColor = {  light: "#ffffff", dark: "#1d1e1f" };
    const NavbarColor = { light: "#1d1e1f", dark: "#ffffff"};
    var style={
        backgroundColor: NavbarBgColor[colorMode],
        color: NavbarColor[colorMode]
    }
    var styleText={
        color: NavbarColor[colorMode]
    }



    return (
        <div>
            <Button
            bg={ButtonBgColor[colorMode]}
            color={ButtonColor[colorMode]}
            _hover={{ bg: HoverButtonBgColor[colorMode], 
            color: HoverButtonColor[colorMode] }}
            borderRadius="0" 
            className="Button"
            leftIcon={MdNoteAdd} 
            variant="solid" 
            borderStyle="none"
            onClick={onOpen}>Add Event</Button>
             <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <form>
                    <ModalContent style={style}>
                    <ModalHeader><h3 className="ModalHeader">ADD EVENT</h3></ModalHeader>
                    <ModalBody>
                    <TextField 
                        className={classes.root}
                        InputProps={{ className: classes.root  }}
                        type="text"
                        id="filled-basic" 
                        label="Event Name" 
                        value={eventName}
                        onChange={(e)=>{setEventName(e.target.value)}}
                        variant="filled" 
                        required 
                        fullWidth />
                    <TextField 
                    className={classes.root}
                    InputProps={{ className: classes.root  }}
                        type="text"
                        id="filled-basic" 
                        label="Description" 
                        value={eventDescription}
                        onChange={(e)=>{setEventDescription(e.target.value)}}
                        variant="filled"
                        fullWidth />
                    <TextField 
                    className={classes.root}
                    InputProps={{ className: classes.root  }}
                        type="url"
                        id="filled-basic" 
                        label="Form Link" 
                        value={eventUrl}
                        onChange={(e)=>{setEventUrl(e.target.value)}}
                        variant="filled"
                        fullWidth />
                        <TextField 
                    className={classes.root}
                    InputProps={{ className: classes.root  }}
                        type="url"
                        id="filled-basic" 
                        label="Poster Link" 
                        value={eventPoster}
                        onChange={(e)=>{setEventPoster(e.target.value)}}
                        variant="filled"
                        fullWidth />
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
                    InputProps={{ className: classes.root  }}
                        InputLabelProps={{ shrink: true }}
                        type="Date"
                        id="filled-basic" 
                        label="Date" 
                        value={eventDate}
                        onChange={(e)=>{setEventDate(e.target.value)}}
                        variant="filled"
                        fullWidth />
                    <TextField 
                    className={classes.root}
                    InputProps={{ className: classes.root  }}
                        type="text"
                        id="filled-basic" 
                        label="Event Guest" 
                        value={eventGuest}
                        onChange={(e)=>{setEventGuest(e.target.value)}}
                        variant="filled" 
                        fullWidth />
                    <FormControl variant="filled" className={classes.root} fullWidth>
                            <InputLabel className={classes.root} htmlFor="event-status">Status</InputLabel>
                            <Select
                            className={classes.root}
                            value={eventStatus}
                            native
                            onChange={(e)=>{
                                //console.log("status is ",status)
                                setEventStatus(e.target.value)}}
                                inputProps={{
                                    name: 'Status',
                                    id: 'event-status',
                                }}
                            >
                            <option className={classes.root} value="Planning">Planning</option>
                            <option className={classes.root} value="Upcoming">Upcoming</option>
                            <option className={classes.root} value="Postponed">Postponed</option>
                            <option className={classes.root} value="Completed">Completed</option>
                            <option className={classes.root} value="Cancelled">Cancelled</option>
                            </Select>
                        </FormControl>
                        <TextField
                        className={classes.root}
                        InputProps={{ className: classes.root  }}
                        type="text"
                        id="filled-basic" 
                        label="Sponsors" 
                        value={eventSponsors}
                        onChange={(e)=>{setEventSponsors(e.target.value)}}
                        variant="filled" 
                        fullWidth /> 
                        {
                           eventStatus=="Completed"?(
                            <div>
                                <TextField
                                className={classes.root}
                                InputProps={{ className: classes.root  }}
                                type="text"
                                id="filled-basic" 
                                label="Participants" 
                                value={eventParticipants}
                                onChange={(e)=>{setEventParticipants(e.target.value)}}
                                variant="filled"
                                fullWidth />
                                <TextField
                                className={classes.root}
                                InputProps={{ className: classes.root  }}
                                type="url"
                                id="filled-basic" 
                                label="Participants certificate" 
                                value={eventParticipantCertificate}
                                onChange={(e)=>{setEventParticipantCertificate(e.target.value)}}
                                variant="filled"
                                fullWidth />
                                <TextField
                                className={classes.root}
                                InputProps={{ className: classes.root  }}
                                type="url"
                                id="filled-basic" 
                                label="Team certificate" 
                                value={eventOrganizerCertificate}
                                onChange={(e)=>{setEventOrganizerCertificate(e.target.value)}}
                                variant="filled"
                                fullWidth />
                            </div>

                           ):(
                               <div></div>
                           )
                        }                   
                        
                    </ModalBody>
                    <ModalFooter>
                    <Button 
                        borderRadius="0" 
                        bg={ButtonBgColor[colorMode]}
                        color={ButtonColor[colorMode]}
                        _hover={{ bg: HoverButtonBgColor[colorMode], 
                        color: HoverButtonColor[colorMode] }}
                        className="Button" 
                        leftIcon={MdSend} 
                        variant="solid" 
                        borderStyle="none"
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



export default Event
