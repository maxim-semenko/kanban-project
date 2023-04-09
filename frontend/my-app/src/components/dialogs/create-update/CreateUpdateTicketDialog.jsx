import React, {useEffect, useState} from 'react';
import {
    Alert,
    AppBar,
    CircularProgress,
    Collapse,
    DialogContent,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import {MobileDateTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import TicketService from "../../../api/TicketService";
import {createTicket, updateTicketById} from "../../../redux/tickets/TicketAction";
import TicketValidator from "../../../validator/TicketValidator";
import {useParams} from "react-router-dom";

function CreateUpdateTicketDialog(props) {
    const {id} = useParams();
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {ticket, loadingTicket} = useSelector(state => state.dataTickets)
    const [priorityList, setPriorityList] = useState([])
    const {projectStatuses} = useSelector(state => state.dataProjectStatuses)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState(null)
    const [projectStatus, setProjectStatus] = useState(null)
    const [expiryDate, setExpiryDate] = useState(null)
    const [finished, setFinished] = useState(false)

    // Errors
    const [nameError, setNameError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [priorityError, setPriorityError] = useState('')
    const [projectStatusError, setProjectStatusError] = useState('')
    const [expiryDateError, setExpiryDateError] = useState('')

    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')

    useEffect(() => {
        TicketService.getAllPriorities()
            .then(response => {
                setPriorityList(response.data.content)
                setFinished(true)
            })
        if (props.method === "update" && ticket !== null) {
            setName(ticket.title)
            setDescription(ticket.description)
            setProjectStatus(ticket.projectStatus)
            setPriority(ticket.priority)
            setExpiryDate(ticket.expiryDate)
            // setFinished(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticket])


    const handlerChangeName = (event) => {
        setName(event.target.value)
        setNameError('');
    }

    const handlerChangeDescription = (event) => {
        setDescription(event.target.value)
        setDescriptionError('');
    }

    const handlerChangeProjectStatus = (event) => {
        setProjectStatus(event.target.value)
        setProjectStatusError('');
    }

    const handlerChangePriority = (event) => {
        setPriority(event.target.value)
        setPriorityError('');
    }

    const handlerChangeExpiryDate = (newValue) => {
        setExpiryDate(newValue)
        setExpiryDateError('');
    }

    const findFormErrors = () => {
        let isErrors = false

        let errors = TicketValidator.validateAll(name, description, projectStatus, priority, expiryDate)
        setNameError(errors.titleError)
        setDescriptionError(errors.descriptionError)
        setProjectStatusError(errors.projectStatusError)
        setPriorityError(errors.priorityError)
        setExpiryDateError(errors.expiryDateError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
                break;
            }
        }

        return isErrors
    }

    const handleUpdateCreateProject = (event) => {
        if (!findFormErrors()) {
            if (props.method === "create") {
                const request = {
                    title: name,
                    description: description,
                    projectStatusId: projectStatus,
                    creatorId: user.id,
                    priorityId: priority,
                    projectId: id,
                    expiryDate: expiryDate
                }
                console.log(request)
                dispatch(createTicket(request))
                    .then(() => {
                        setTextMessage("You successfully create new ticket!")
                        setTypeMessage("success")
                    })
                    .catch(error => {
                        setTextMessage(error.response.data.message)
                        setTypeMessage("error")
                    })
                    .finally(() => setShowMessage(true))
            } else {
                const request = {
                    title: name,
                    description: description,
                    priorityId: priority.id,
                    expiryDate: expiryDate
                }
                dispatch(updateTicketById(request, ticket.id))

                    .then(() => {
                        setTextMessage("You successfully update ticket!")
                        setTypeMessage("success")
                    })
                    .catch(error => {
                        setTextMessage(error.response.data.message)
                        setTypeMessage("error")
                    })
                    .finally(() => setShowMessage(true))
            }
        }
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="sm">
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={props.onHide}
                        aria-label="close"
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        {props.method === "create" ? 'Create ticket' : 'Edit ticket'}
                    </Typography>
                    <Button
                        onClick={handleUpdateCreateProject}
                        disabled={props.method === "update" && loadingTicket}
                        color={"success"}
                        variant={"contained"}
                    >
                        {props.method === "create" ? 'Create' : 'Update'}
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                {
                    !finished && props.method === "update" ?
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                        </Box>
                        :
                        <form style={{width: '100%', marginTop: '10px',}} noValidate>
                            <Collapse in={showMessage}>
                                <Alert severity={typeMessage}>{textMessage}</Alert>
                            </Collapse>
                            <br/>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        inputProps={{maxLength: 25}}
                                        variant="outlined"
                                        fullWidth
                                        label="Ticket title"
                                        autoFocus
                                        autoComplete="off"
                                        value={name}
                                        error={nameError !== ''}
                                        helperText={nameError ? nameError : ''}
                                        onChange={handlerChangeName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Ticket description"
                                        type="text"
                                        multiline
                                        rows={5}
                                        value={description}
                                        error={descriptionError !== ''}
                                        helperText={descriptionError ? descriptionError : ''}
                                        onChange={handlerChangeDescription}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        fullWidth
                                        error={projectStatusError !== ''}
                                        disabled={props.method === "update"}
                                    >
                                        <InputLabel>Ticket project-status</InputLabel>
                                        <Select
                                            defaultValue={
                                                props.method === "update" &&
                                                projectStatus !== null ? projectStatus.id : null
                                            }
                                            label="Ticket project-status"
                                            onChange={handlerChangeProjectStatus}

                                        >
                                            {
                                                projectStatuses.map((item, index) => (
                                                    <MenuItem value={item.id} key={index}>
                                                        {item.name.toUpperCase()}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText>{projectStatusError ? projectStatusError : ''}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={priorityError !== ''}>
                                        <InputLabel>Ticket priority</InputLabel>
                                        <Select
                                            defaultValue={
                                                props.method === "update" && priority !== null ? priority.id : ""
                                            }
                                            label="Ticket priority"
                                            onChange={handlerChangePriority}
                                        >
                                            {
                                                priorityList.map((item, index) => (
                                                    <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText>{priorityError ? priorityError : ''}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDateTimePicker
                                            label="Ticket expiry date"
                                            value={expiryDate == null ? '' : expiryDate}
                                            onChange={handlerChangeExpiryDate}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    error={expiryDateError !== ''}
                                                    helperText={expiryDateError ? expiryDateError : ''}
                                                />
                                            }
                                            minDateTime={dayjs()}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </form>
                }
            </DialogContent>
        </Dialog>
    );
}

export default CreateUpdateTicketDialog;