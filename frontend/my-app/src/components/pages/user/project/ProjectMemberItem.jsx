import React from 'react';
import {Button, IconButton, ListItemAvatar, Typography} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import MyAvatar from "../../../common/MyAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import {useDispatch} from "react-redux";
import {getUserById} from "../../../../redux/user/UserAction";

function ProjectMemberItem(props) {
    const dispatch = useDispatch()

    const removeMember = (id) => {
        dispatch(getUserById(id))
        props.openRemoveDialog()
    }

    const member = props.member;

    const showRemoveMemberButton = (creatorId, memberId, currentUserId) => {
        if (creatorId === currentUserId) {
            if (creatorId !== memberId) {
                return (
                    <IconButton edge="end">
                        <Button color={"error"} variant={"contained"} onClick={() => removeMember(memberId)}>
                            Remove member
                        </Button>
                    </IconButton>
                )
            }
        }
    }

    return (
        <ListItem
            style={props.style}
            key={props.index}
            component="div"
            disablePadding
            secondaryAction={showRemoveMemberButton(props.project.creator.id, member.id, props.currentUser.id)
            }
        >
            <ListItemButton>
                <ListItemAvatar>
                    <MyAvatar name={`${member.firstname} ${member.lastname}`}/>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <b>
                            {member.firstname}{' '}{member.lastname}{' '}
                            ({member.email})
                            {props.project.creator.id === member.id ? ' — Creator' : ''}
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
                                {member.speciality}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItemButton>
        </ListItem>
    );
}

export default ProjectMemberItem;