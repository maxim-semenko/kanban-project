import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {CircularProgress, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {deleteProjectById} from "../../redux/project/ProjectAction";

function RemoveProjectDialog(props) {
    const dispatch = useDispatch()
    const {project, loadingProject} = useSelector(state => state.dataProjects)

    const remove = (postId) => {
        dispatch(deleteProjectById(postId))
            .catch(error => {
                console.log(error)
            })
        props.onHide()
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="sm">
            <DialogTitle>Delete project</DialogTitle>
            <DialogContent>
                {
                    loadingProject ?
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                        </Box>
                        :
                        <div>
                            Are you really want to delete this project?
                        </div>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onHide} color={"success"} variant={"contained"}>
                    Close
                </Button>
                <Button
                    onClick={() => remove(project.id)}
                    disabled={loadingProject}
                    color={"error"}
                    variant={"contained"}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RemoveProjectDialog;