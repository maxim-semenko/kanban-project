import React, {useEffect, useState} from 'react';
import {
    Alert,
    AppBar,
    CircularProgress,
    Collapse,
    DialogContent,
    IconButton,
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
import {createLogTime, updateLogTimeById} from "../../../redux/log-times/LogTimeAction";
import LogTimeValidator from "../../../validator/LogTimeValidator";
import UtilService from "../../../api/UtilService";

function CreateUpdateLogTimeDialog(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {ticket, loadingTicket} = useSelector(state => state.dataTickets)
    const {logTime, loadingLogTime} = useSelector(state => state.dataLogTimes)

    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [finished, setFinished] = useState(false)

    // Errors
    const [descriptionError, setDescriptionError] = useState('')
    const [startDateError, setStartDateError] = useState('')
    const [endDateError, setEndDateError] = useState('')

    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')

    useEffect(() => {
        if (props.method === "update" && logTime !== null) {

            setDescription(logTime.description)
            setStartDate(dayjs(logTime.startDate))
            setEndDate(dayjs(logTime.endDate))
            setFinished(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logTime])

    const handlerChangeDescription = (event) => {
        setDescription(event.target.value)
        setDescriptionError('');
    }

    const handlerChangeStartDate = (newValue) => {
        setStartDate(newValue)
        setStartDateError('');
    }

    const handlerChangeEndDate = (newValue) => {
        setEndDate(newValue)
        setEndDateError('');
    }

    const findFormErrors = () => {
        let isErrors = false

        let errors = LogTimeValidator.validateAll(description, startDate, endDate)
        setDescriptionError(errors.descriptionError)
        setStartDateError(errors.startDateError)
        setEndDateError(errors.endDateError)

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
                    description: description,
                    ticketId: ticket.id,
                    userId: user.id,
                    startDate: startDate,
                    endDate: endDate,
                }
                dispatch(createLogTime(request))
                    .then(() => {
                        setTextMessage("You successfully create new log time!")
                        setTypeMessage("success")
                    })
                    .catch(error => {
                        setTextMessage(error.response.data.message)
                        setTypeMessage("error")
                    })
                    .finally(() => setShowMessage(true))
            } else {
                const request = {
                    description: description,
                    startDate: startDate,
                    endDate: endDate,
                }
                dispatch(updateLogTimeById(request, logTime.id))

                    .then(() => {
                        setTextMessage("You successfully update log time!")
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
        <Dialog open={props.show} Close={props.onHide} fullWidth maxWidth="sm">
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
                        {props.method === "create" ? 'Create log time' : 'Update log time'}
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
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Log time description"
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
                                    <h5>Total time: {UtilService.showDifferenceTime(startDate, endDate)}</h5>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDateTimePicker
                                            label="Start date"
                                            value={startDate == null ? '' : startDate}
                                            onChange={handlerChangeStartDate}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    error={startDateError !== ''}
                                                    helperText={startDateError ? startDateError : ''}
                                                />
                                            }
                                            maxDateTime={endDate === null ? dayjs(): endDate}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDateTimePicker
                                            label="End date"
                                            value={endDate == null ? '' : endDate}
                                            onChange={handlerChangeEndDate}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    error={endDateError !== ''}
                                                    helperText={endDateError ? endDateError : ''}
                                                />
                                            }
                                            minDateTime={startDate === null ? null : startDate}
                                            // maxDateTime={dayjs()}
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

export default CreateUpdateLogTimeDialog;