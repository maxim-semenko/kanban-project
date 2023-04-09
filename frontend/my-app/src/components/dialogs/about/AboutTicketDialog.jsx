import React, {useEffect, useState} from 'react';
import Dialog from "@mui/material/Dialog";
import {AppBar, CircularProgress, DialogContent, IconButton, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import {
    setMethodCreateUpdateLogTimeDialog,
    setOpenCreateUpdateLogTimeDialog, setOpenRemoveLogTimeDialog
} from "../../../redux/dialogs/DialogAction";
import TicketListExecutors from "../../common/TicketListExecutors";
import {getAllLogTimesByTicketId} from "../../../redux/log-times/LogTimeAction";
import TicketListLogTimes from "../../common/TicketListLogTimes";
import CreateUpdateLogTimeDialog from "../create-update/CreateUpdateLogTimeDialog";
import RemoveLogTimeDialog from "../remove/RemoveLogTimeDialog";

function AboutTicketDialog(props) {
    const dispatch = useDispatch()
    const {ticket, loadingTicket} = useSelector(state => state.dataTickets)
    const {logTimes, loadingLogTimes} = useSelector(state => state.dataLogTimes)

    useEffect(() => {
        if (ticket !== null) {
            dispatch(getAllLogTimesByTicketId(0, 0, ticket.id))
        }
    }, [ticket])

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

    const {
        openCreateUpdateLogTimeDialog,
        openRemoveLogTimeDialog,
        methodCreateUpdateLogTimeDialog
    } = useSelector(state => state.dataDialogs)

    const showModals = () => {
        if (openCreateUpdateLogTimeDialog) {
            return (
                <CreateUpdateLogTimeDialog
                    show={openCreateUpdateLogTimeDialog}
                    onHide={() => dispatch(setOpenCreateUpdateLogTimeDialog(false))}
                    method={methodCreateUpdateLogTimeDialog}
                />
            )
        }
        if (openRemoveLogTimeDialog) {
            return (
                <RemoveLogTimeDialog
                    show={openRemoveLogTimeDialog}
                    onHide={() => dispatch(setOpenRemoveLogTimeDialog(false))}
                />
            )
        }
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="md">
            {showModals()}
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
                        About ticket {ticket !== null ? `"${ticket.title}"` : "loading..."}
                    </Typography>
                    {
                        ticket !== null ?
                            <Button
                                onClick={() => {
                                    dispatch(setOpenCreateUpdateLogTimeDialog(true))
                                    dispatch(setMethodCreateUpdateLogTimeDialog("create"))
                                }}
                                disabled={loadingTicket || ticket.executors.length === 0}
                                color={"success"}
                                variant={"contained"}
                            >
                                Add log time for ticket
                            </Button>
                            : null
                    }

                </Toolbar>
            </AppBar>
            <DialogContent>
                {
                    loadingTicket || ticket === null ?
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                        </Box>
                        :
                        <div>
                            <b>Description: </b>
                            <div style={{whiteSpace: "pre-wrap"}}>
                                {ticket.description}
                            </div>
                            <br/>
                            <b>Priority: </b>
                            <span
                                style={{
                                    backgroundColor: getPriorityColor(ticket.priority.name),
                                    padding: "2px 10px 2px 10px",
                                    borderRadius: "10px"
                                }}>
                            <b>{getPriorityName(ticket.priority.name)}</b>
                            </span>
                            <div><b>Created: </b>{dayjs(ticket.createdDate).format('DD/MM/YYYY h:mm A')}</div>
                            <b>Expired: </b>{dayjs(ticket.expiryDate).format('DD/MM/YYYY h:mm A')}
                            {' '}{dayjs(ticket.expiryDate).isBefore(dayjs(new Date())) ? '(has expired already)' : ''}
                            <div><b>Creator:</b> {ticket.creator.firstname} {ticket.creator.lastname}{' '}
                                ({ticket.creator.email})</div>
                            <hr/>
                            <b>Executors: </b>
                            <TicketListExecutors executors={ticket.executors}/>
                            <hr/>
                            <b>Log times: </b>
                            <TicketListLogTimes logTimes={logTimes}/>
                        </div>
                }
            </DialogContent>
        </Dialog>
    );
}

export default AboutTicketDialog;