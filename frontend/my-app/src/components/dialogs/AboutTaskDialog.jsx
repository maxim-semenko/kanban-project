import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
    CircularProgress,
    DialogActions,
    DialogContent,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import ListItemButton from "@mui/material/ListItemButton";
import MyAvatar from "../common/MyAvatar";

function AboutTaskDialog(props) {
    const dispatch = useDispatch()
    const {task, loadingTask} = useSelector(state => state.dataTasks)

    const getPriorityColor = (name) => {
        switch (name) {
            case "LOW":
                return "#2ffa02"
            case "MEDIUM":
                return "#ffe900"
            case "HIGH":
                return "#ff0000"
            default:
                return "#111111"
        }
    }

    const getPriorityName = (name) => {
        return name.charAt(0) + name.substring(1).toLowerCase()
    }

    const ListExecutors = () => {
        if (task.executors.length === 0) {
            return 'Nobody execute the task!'
        } else {
            return (
                <div>
                    {
                        task.executors.map((executor, index) => {
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <MyAvatar name={`${executor.firstname} ${executor.lastname}`}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <b>
                                                    {executor.firstname}{' '}{executor.lastname}{' '}
                                                    ({executor.email})
                                                </b>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {executor.speciality}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </div>
            )
        }
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="sm">
            <DialogTitle>About Task</DialogTitle>
            <DialogContent>
                {
                    loadingTask ?
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                        </Box>
                        :
                        <div>
                            <h5><b>Name: </b>{task.name}</h5>
                            <h5><b>Description: </b>
                                <span style={{whiteSpace: "pre-wrap"}}>
                                {task.description}
                            </span>
                            </h5>

                            <h5><b>Priority: </b>
                                <span
                                    style={{
                                        backgroundColor: getPriorityColor(task.priority.name),
                                        padding: "2px 10px 2px 10px",
                                        borderRadius: "10px"
                                    }}>
                            <b>{getPriorityName(task.priority.name)}</b>
                            </span>
                            </h5>
                            <h5><b>Created: </b>{dayjs(task.createdDate).format('DD/MM/YYYY h:mm A')}</h5>
                            <h5><b>Expired: </b>{dayjs(task.expiryDate).format('DD/MM/YYYY h:mm A')}</h5>
                            <h5><b>Executors: </b></h5>
                            <ListExecutors/>
                        </div>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onHide} color={"success"} variant={"contained"}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AboutTaskDialog;