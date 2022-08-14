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
import {useSelector} from "react-redux";

function TaskItem(props) {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const {project} = useSelector(state => state.dataProjects)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getPriorityColor = (name) => {
        switch (name) {
            case "LOW":
                return "#2ffa02"
            case "MEDIUM":
                return "#ffe900"
            case "HIGH":
                return "#ff0000"
            default:
                return "#111111"
        }
    }

    const getPriorityName = (name) => {
        return name.charAt(0) + name.substring(1).toLowerCase()
    }

    const handleUpdate = () => {
        setAnchorEl(null)
        props.handleUpdateTask()
    }

    const handleRemove = () => {
        setAnchorEl(null)
        props.handleRemoveTask()
    }

    return (
        <Card key={props.task.id} className="card-task"
              style={{textAlign: "left"}}
        >
            <CardHeader
                style={{
                    textTransform: "uppercase",
                    textOverflow: "ellipsis",
                    paddingBottom: "0px",
                    textAlign: "left"
                }}
                title={<b style={{fontSize: 18}} color="text.secondary">{props.task.name}</b>}
                action={currentUser.id === project.creator.id ?
                    <IconButton aria-label="settings" onClick={handleClick}><MoreVertIcon/></IconButton> : null
                }
            />
            <CardContent style={{paddingTop: "0px"}}>
                <Typography variant="body2">
                    <b>Description: </b>{props.task.description.substring(0, 20).toLowerCase()}
                    {props.task.description.length > 20 ? '...' : ''}
                    <br/>
                    <b>Priority: </b>
                    <span
                        style={{
                            backgroundColor: getPriorityColor(props.task.priority.name),
                            padding: "2px 10px 2px 10px",
                            borderRadius: "10px"
                        }}>
                            <b>{getPriorityName(props.task.priority.name)}</b>
                        </span>
                    <br/>
                    <b>Created: </b>{dayjs(props.task.createdDate).format('DD/MM/YYYY h:mm A')}
                    <br/>
                    <b>Expired: </b>{dayjs(props.task.expiryDate).format('DD/MM/YYYY h:mm A')}
                    <br/>
                    <b>Executors: </b>
                    <br/>
                    {
                        props.task.executors.length !== 0 ?
                            <AvatarGroup max={5} style={{float: "left"}}>
                                {
                                    props.task.executors
                                        .map((executor, index) => (
                                            <MyAvatar name={`${executor.firstname} ${executor.lastname}`}/>
                                        ))
                                }
                            </AvatarGroup>
                            :
                            <div style={{minHeight: "23.99px"}}>Nobody execute the task!</div>
                    }
                    <br style={{clear: "both"}}/>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" variant={"contained"} style={{marginTop: "-10px"}}>More</Button>
                <Button
                    size="medium"
                    variant={"contained"}
                    color={props.task.executors.find(item => item.id === currentUser.id) ? 'error' : 'success'}
                    style={{marginTop: "-10px"}}
                >
                    {props.task.executors.find(item => item.id === currentUser.id) ? 'Refuse task' : 'Take task'}
                </Button>
            </CardActions>
            <div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{'aria-labelledby': 'basic-button',}}
                >
                    <MenuItem onClick={handleUpdate}>
                        <ListItemIcon><EditIcon fontSize="medium"/></ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleRemove}>
                        <ListItemIcon><DeleteIcon fontSize="medium"/></ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        </Card>
    );
}

export default TaskItem;
