import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {CircularProgress, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {deleteTaskById} from "../../redux/task/TaskAction";

function RemoveTaskDialog(props) {
    const dispatch = useDispatch()
    const {task, loadingTask} = useSelector(state => state.dataTasks)


    const remove = (taskId) => {
        dispatch(deleteTaskById(taskId))
            .then(() => {
                props.onHide()
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="sm">
            <DialogTitle>Delete Task</DialogTitle>
            <DialogContent>
                {
                    loadingTask ?
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                        </Box>
                        :
                        <div>
                            Are you really want to delete this task?
                        </div>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onHide} color={"success"} variant={"contained"}>
                    Close
                </Button>
                <Button
                    onClick={() => remove(task.id)}
                    disabled={loadingTask}
                    color={"error"}
                    variant={"contained"}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RemoveTaskDialog;