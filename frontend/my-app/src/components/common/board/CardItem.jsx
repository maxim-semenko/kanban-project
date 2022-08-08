import React from "react";
import {
    AvatarGroup,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from 'dayjs';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MyAvatar from "../MyAvatar";

function CardItem(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Card key={props.task.id} className="card-task" style={{textAlign: "left"}}>
                <CardHeader
                    title={
                        <b style={{fontSize: 24}} color="text.secondary" gutterBottom>
                            {props.task.name}
                        </b>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    style={{paddingBottom: "0px", textAlign: "left"}}
                />
                <CardContent style={{paddingTop: "0px"}}>
                    <Typography variant="body2">
                        <b>Description: </b>{props.task.description}
                        <br/>
                        <b>Priority: </b>
                        <span
                            style={{
                                backgroundColor: "#14d95d",
                                padding: "3px 10px 3px 10px",
                                borderRadius: "10px"
                            }}>
                            <b>Low</b>
                        </span>
                        {/*<Chip label="Low" size="small" color={"success"}/>*/}
                        {/*{props.task.priority.name}*/}
                        <br/>
                        <b>Created: </b>{dayjs(props.task.createdDate).format('MMMM D YYYY, h:mm A')}
                        {/*<br/>*/}
                        {/*<b>Executors: </b>*/}
                        {/*<br/>*/}
                        {/*<AvatarGroup max={5} style={{float: "left"}}>*/}
                        {/*    {*/}
                        {/*        props.task.executors*/}
                        {/*            .map((executor, index) => (*/}
                        {/*                <MyAvatar name={`${executor.firstname} ${executor.lastname}`}/>*/}
                        {/*            ))*/}
                        {/*    }*/}
                        {/*</AvatarGroup>*/}
                        {/*<br style={{clear: "both"}}/>*/}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant={"contained"} style={{paddingTop: "0px", marginTop: "-10px"}}>More</Button>
                </CardActions>
                <div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <EditIcon fontSize="medium"/>
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <DeleteIcon fontSize="medium"/>
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                        </MenuItem>
                    </Menu>
                </div>
            </Card>
        </>
    );
}

export default CardItem;
