import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Alert, AlertTitle, CircularProgress, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {deleteTicketById} from "../../../redux/tickets/TicketAction";

function RemoveTicketDialog(props) {
    const dispatch = useDispatch()
    const {ticket, loadingTicket} = useSelector(state => state.dataTickets)


    const remove = (ticketId) => {
        dispatch(deleteTicketById(ticketId))
            .then(() => {
                props.onHide()
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="sm">
            <DialogTitle>Delete ticket</DialogTitle>
            <DialogContent>
                {
                    loadingTicket ?
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                        </Box>
                        :
                        <Alert severity="warning">
                            <AlertTitle><b>Are you really want to delete the ticket?</b></AlertTitle>
                            All log times are deleted of the ticket along with it.
                        </Alert>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onHide} color={"success"} variant={"contained"}>
                    Close
                </Button>
                <Button
                    onClick={() => remove(ticket.id)}
                    disabled={loadingTicket}
                    color={"error"}
                    variant={"contained"}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RemoveTicketDialog;