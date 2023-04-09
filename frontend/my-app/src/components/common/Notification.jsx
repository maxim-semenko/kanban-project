import React from 'react';
import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setShowNotification} from "../../redux/notifications/NotificationAction";

function Notification() {
    const dispatch = useDispatch()
    const {show, type, text} = useSelector(state => state.dataNotification)

    return (
        <Snackbar open={show} autoHideDuration={5000} onClose={() => dispatch(setShowNotification(false))}>
            <Alert severity={type} sx={{width: '100%'}} onClose={() => dispatch(setShowNotification(false))}>
                {text}
            </Alert>
        </Snackbar>
    );
}

export default Notification;