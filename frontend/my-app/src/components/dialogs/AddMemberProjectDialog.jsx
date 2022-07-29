import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";

export default function AddMemberProjectDialog(props) {

    return (
        <Dialog open={props.show} onClose={props.onHide} fullWidth maxWidth="sm">
            <DialogTitle>Add member</DialogTitle>
            <DialogContent>
                {/*{*/}
                {/*    loadingProject ?*/}
                {/*        <Box display="flex" justifyContent="center">*/}
                {/*            <CircularProgress/>*/}
                {/*        </Box>*/}
                {/*        :*/}
                {/*        <div>*/}
                {/*            Are you really want to delete this project?*/}
                {/*        </div>*/}
                {/*}*/}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onHide} color={"success"} variant={"contained"}>
                    Close
                </Button>
                {/*<Button*/}
                {/*    onClick={() => remove(project.id)}*/}
                {/*    disabled={loadingProject}*/}
                {/*    color={"error"}*/}
                {/*    variant={"contained"}*/}
                {/*>*/}
                {/*    Delete*/}
                {/*</Button>*/}
            </DialogActions>
        </Dialog>
    );
}

