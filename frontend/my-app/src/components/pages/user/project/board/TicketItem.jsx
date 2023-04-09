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
    MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from 'dayjs';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import MyAvatar from "../../../../common/MyAvatar";
import {addUserToTicket, removeUserFromTicket} from "../../../../../redux/tickets/TicketAction";
import UtilService from "../../../../../api/UtilService";

function TicketItem(props) {
    const dispatch = useDispatch()
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const {projectStatuses} = useSelector(state => state.dataProjectStatuses)
    const {project} = useSelector(state => state.dataProjects)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdate = () => {
        setAnchorEl(null)
        props.handleUpdateTicket()
    }

    const handleRemove = () => {
        setAnchorEl(null)
        props.handleRemoveTicket()
    }

    const TakeRefuseTicketButton = (props) => {
        const isContain = props.ticket.executors.find(item => item.id === currentUser.id)
        return (
            <Button
                size="medium"
                variant={"contained"}
                color={isContain ? 'error' : 'success'}
                style={{marginTop: "-15px"}}
                onClick={isContain ?
                    () => dispatch(removeUserFromTicket(props.ticket.id, currentUser.id)) :
                    () => dispatch(addUserToTicket(props.ticket.id, currentUser.id))
                }
            >
                {isContain ? 'Deassign' : 'Assign'}
            </Button>
        )
    }

    return (
        <Card key={props.ticket.id} className="card-ticket"
              style={{
                  textAlign: "left",
                  backgroundColor: dayjs(props.ticket.expiryDate).isBefore(dayjs(new Date())) ? "#c06e6e" : "#6c757d",
                  width: (1470 - projectStatuses.length * 31) / projectStatuses.length,
                  minWidth: 220,
              }}
        >
            <CardHeader
                style={{
                    textTransform: "uppercase",
                    textOverflow: "ellipsis",
                    paddingBottom: "0px",
                    textAlign: "left"
                }}
                title={
                    <b style={{fontSize: 18}} color="text.secondary">
                        {props.ticket.title.substring(0, 12 * (6 - projectStatuses.length))}
                        {props.ticket.title.length > (12 * (6 - projectStatuses.length)) ? '...' : ''}

                    </b>
                }
                action={currentUser.id === props.ticket.creator.id ?
                    <IconButton aria-label="settings" onClick={handleClick}><MoreVertIcon/></IconButton> : null
                }
            />
            <CardContent style={{paddingTop: "0px"}}>
                <div style={{fontSize: "14px"}}>
                    <b>Description: </b>
                    {props.ticket.description.substring(0, 12 * (6 - projectStatuses.length)).toLowerCase()}
                    {props.ticket.description.length > (12 * (6 - projectStatuses.length)) ? '...' : ''}
                    <br/>
                    <b>Priority: </b>
                    <span
                        style={{
                            backgroundColor: UtilService.getPriorityColor(props.ticket.priority.name),
                            padding: "2px 10px 2px 10px",
                            borderRadius: "10px"
                        }}>
                            <b>{UtilService.getPriorityName(props.ticket.priority.name)}</b>
                        </span>
                    <br/>
                    <b>Created: </b>{dayjs(props.ticket.createdDate).format('DD/MM/YYYY h:mm A')}
                    <br/>
                    <b>Expired: </b>{dayjs(props.ticket.expiryDate).format('DD/MM/YYYY h:mm A')}
                    <br/>
                    <b>Executors: </b>
                    <br/>
                    {
                        props.ticket.executors.length !== 0 ?
                            <AvatarGroup max={5} style={{float: "left"}}>
                                {
                                    props.ticket.executors
                                        .map((executor, index) => (
                                            <MyAvatar key={index} name={`${executor.firstname} ${executor.lastname}`}/>
                                        ))
                                }
                            </AvatarGroup>
                            :
                            <div style={{minHeight: "23.99px"}}>Nobody execute the ticket!</div>
                    }
                    <br style={{clear: "both"}}/>
                </div>
            </CardContent>
            <CardActions>
                <Button
                    size="medium"
                    variant={"contained"}
                    style={{marginTop: "-15px", marginLeft: "5px"}}
                    onClick={props.handleAboutTicket}
                >
                    More
                </Button>
                {' '}
                <TakeRefuseTicketButton ticket={props.ticket}/>
            </CardActions>
            <div>
                <Menu
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

export default TicketItem;
