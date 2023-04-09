import React from 'react';
import {ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import MyAvatar from "./MyAvatar";

function TicketListExecutors(props) {

    const Content = () => {
        const executors = props.executors
        if (executors.length === 0) {
            return <b>Nobody execute the ticket!</b>
        } else {
            return (
                <div>
                    {
                        executors.map((executor, index) => {
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <MyAvatar name={`${executor.firstname} ${executor.lastname}`}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <b>
                                                    {executor.firstname}{' '}{executor.lastname}{' '}
                                                    ({executor.email})
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
                                                        {executor.speciality}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
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

export default TicketListExecutors;