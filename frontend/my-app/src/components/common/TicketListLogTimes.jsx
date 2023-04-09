import React from 'react';
import {ListItem, ListItemAvatar, ListItemText, Stack, Typography} from "@mui/material";
import MyAvatar from "./MyAvatar";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import '../../style/MyIcon.css'
import {
    setMethodCreateUpdateLogTimeDialog,
    setOpenCreateUpdateLogTimeDialog,
    setOpenRemoveLogTimeDialog
} from "../../redux/dialogs/DialogAction";
import {useDispatch} from "react-redux";
import {getLogTimeById} from "../../redux/log-times/LogTimeAction";
import UtilService from "../../api/UtilService";

function TicketListLogTimes(props) {
    const dispatch = useDispatch()

    const Content = () => {
        const logTimes = props.logTimes
        if (logTimes.length === 0) {
            return <b>Nothing log times of the ticket!</b>
        } else {
            return (
                <div>
                    {
                        logTimes.map((logTime, index) => {
                            return (
                                <div key={index}>
                                    <Stack direction="row">
                                        <b style={{paddingRight: "5px"}}>{index + 1}.</b>
                                        <EditIcon
                                            className={"my-icon"}
                                            fontSize="medium"
                                            onClick={() => {
                                                dispatch(setOpenCreateUpdateLogTimeDialog(true))
                                                dispatch(setMethodCreateUpdateLogTimeDialog("update"))
                                                dispatch(getLogTimeById(logTime.id))
                                            }}/>
                                        <DeleteIcon
                                            className={"my-icon"}
                                            fontSize="medium"
                                            onClick={() => {
                                                dispatch(setOpenRemoveLogTimeDialog(true))
                                                dispatch(getLogTimeById(logTime.id))
                                            }}/>
                                    </Stack>
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <MyAvatar name={`${logTime.user.firstname} ${logTime.user.lastname}`}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <b>
                                                    {logTime.user.firstname}{' '}{logTime.user.lastname}{' '}
                                                    ({logTime.user.email})
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
                                                        {logTime.user.speciality}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <div style={{paddingLeft: "20px"}}>
                                        <b>Date: </b>{dayjs(logTime.startDate).format('DD/MM/YYYY')}
                                        <br/>
                                        <b>Time: </b>
                                        {dayjs(logTime.startDate).format('h:mm A')} — {' '}
                                        {dayjs(logTime.endDate).format('h:mm A')}{' '}
                                        ({UtilService.showDifferenceTime(dayjs(logTime.startDate), dayjs(logTime.endDate))})
                                        <br/>
                                        <b>Description: </b>{logTime.description}
                                        <hr/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }

    return (
        <div><Content/></div>
    )
}

export default TicketListLogTimes;