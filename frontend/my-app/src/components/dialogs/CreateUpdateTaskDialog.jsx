import React, {useEffect, useState} from 'react';
import {
    Alert,
    AppBar,
    CircularProgress, Collapse,
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
import TaskService from "../../service/TaskService";
import {createTask, updateTaskById} from "../../redux/task/TaskAction";
import TaskValidator from "../../validator/TaskValidator";
import {useParams} from "react-router-dom";

function CreateUpdateTaskDialog(props) {
    const {id} = useParams();
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {task, loadingTask} = useSelector(state => state.dataTasks)
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
        TaskService.getAllPriorities()
            .then(response => (
                setPriorityList(response.data.content)
            ))
        if (props.method === "update" && task !== null) {
            setName(task.name)
            setDescription(task.description)
            setProjectStatus(task.projectStatus)
            setPriority(task.priority)
            setExpiryDate(task.expiryDate)
            setFinished(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [task])


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

        let errors = TaskValidator.validateAll(name, description, projectStatus, priority, expiryDate)
        setNameError(errors.nameError)
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
                    name: name,
                    description: description,
                    projectStatusId: projectStatus,
                    priorityId: priority,
                    projectId: id,
                    expiryDate: expiryDate
                }
                dispatch(createTask(request))
                    .then(() => {
                        setTextMessage("You successfully create new task!")
                        setTypeMessage("success")
                    })
                    .catch(error => {
                        setTextMessage(error.response.data.message)
                        setTypeMessage("error")
                    })
                    .finally(() => setShowMessage(true))
            } else {
                const request = {
                    name: name,
                    description: description,
                    priorityId: priority.id,
                    expiryDate: expiryDate
                }
                dispatch(updateTaskById(request, task.id))

                    .then(() => {
                        setTextMessage("You successfully update task!")
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
                        {props.method === "create" ? 'Create task' : 'Update task'}
                    </Typography>
                    <Button
                        onClick={handleUpdateCreateProject}
                        disabled={props.method === "update" && loadingTask}
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
                                        inputProps={{maxLength: 12}}
                                        variant="outlined"
                                        fullWidth
                                        label="Task name"
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
                                        label="Task description"
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
                                        <InputLabel>Task project-status</InputLabel>
                                        <Select
                                            defaultValue={
                                                props.method === "update" &&
                                                projectStatus !== null ? projectStatus.id : null
                                            }
                                            label="Task project-status"
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
                                        <InputLabel>Task priority</InputLabel>
                                        <Select
                                            defaultValue={
                                                props.method === "update" && priority !== null ? priority.id : ""
                                            }
                                            label="Task priority"
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
                                            label="Task Expiry date"
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

export default CreateUpdateTaskDialog;