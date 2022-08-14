import React, {useEffect} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {CircularProgress, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {deleteTaskById} from "../../redux/task/TaskAction";
import {
    deleteProjectStatusById,
    getAllProjectStatusesByProjectId
} from "../../redux/project-statuses/ProjectStatusAction";
import {Alert} from "react-bootstrap";

function RemoveProjectStatusDialog(props) {
    const dispatch = useDispatch()
    const {projectStatus, loadingProjectStatus} = useSelector(state => state.dataProjectStatuses)

    useEffect(() => {
    }, [])

    const remove = (projectStatusId) => {
        dispatch(deleteProjectStatusById(projectStatusId))
            .then(() => {
                props.onHide()
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="sm">
            <DialogTitle>Delete Column</DialogTitle>
            <DialogContent>
                {
                    loadingProjectStatus ?
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                        </Box>
                        :
                        <div>
                            <Alert variant={"warning"} style={{padding: "5px 10px 0px 10px"}}>
                                <Alert.Heading>Pay attention!</Alert.Heading>
                                <p>All your tasks are deleted along with the column.</p>
                                <p>Are you really want to delete this column?</p>
                            </Alert>
                        </div>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onHide} color={"success"} variant={"contained"}>
                    Close
                </Button>
                <Button
                    onClick={() => remove(projectStatus.id)}
                    disabled={loadingProjectStatus}
                    color={"error"}
                    variant={"contained"}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RemoveProjectStatusDialog;