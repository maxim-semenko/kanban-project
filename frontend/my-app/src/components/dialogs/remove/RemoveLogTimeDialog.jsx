import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {CircularProgress, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {deleteLogTimeById} from "../../../redux/log-times/LogTimeAction";

function RemoveLogTimeDialog(props) {
    const dispatch = useDispatch()
    const {logTime, loadingLogTime} = useSelector(state => state.dataLogTimes)

    const remove = (logTimeId) => {
        dispatch(deleteLogTimeById(logTimeId))
            .then(() => {
                props.onHide()
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="sm">
            <DialogTitle>Delete project</DialogTitle>
            <DialogContent>
                {
                    loadingLogTime ?
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                        </Box>
                        :
                        <div>
                            Are you really want to delete this log time?
                        </div>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onHide} color={"success"} variant={"contained"}>
                    Close
                </Button>
                <Button
                    onClick={() => remove(logTime.id)}
                    disabled={loadingLogTime}
                    color={"error"}
                    variant={"contained"}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RemoveLogTimeDialog;