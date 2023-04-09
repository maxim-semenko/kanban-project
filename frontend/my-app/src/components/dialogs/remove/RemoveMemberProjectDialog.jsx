import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {CircularProgress, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {removeUserFromProjectByProjectId} from "../../../redux/user/UserAction";
import {useParams} from "react-router-dom";

export default function RemoveMemberProjectDialog(props) {
    const {id} = useParams();
    const dispatch = useDispatch()
    const {user, loadingUser} = useSelector(state => state.dataUsers)

    const remove = (userId) => {
        dispatch(removeUserFromProjectByProjectId(id, userId))
            .catch(error => {
                console.log(error)
            })
        props.onHide()
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="sm">
            <DialogTitle>Remove member</DialogTitle>
            <DialogContent>
                {
                    loadingUser ?
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                        </Box>
                        :
                        <div>
                            Are you really want to remove this member?
                        </div>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onHide} color={"success"} variant={"contained"}>
                    Close
                </Button>
                <Button
                    onClick={() => remove(user.id)}
                    disabled={loadingUser}
                    color={"error"}
                    variant={"contained"}
                >
                    Remove
                </Button>
            </DialogActions>
        </Dialog>
    );
}

