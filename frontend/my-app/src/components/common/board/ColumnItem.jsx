import React, {useContext} from "react";
import {Card, CardContent, CardHeader, IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskList from "./TaskList";
import {useSelector} from "react-redux";
import {BoardContext} from "./Board";

function TaskItem(props) {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const {project} = useSelector(state => state.dataProjects)
    const {onDragOverHandler, onDropHandler} = useContext(BoardContext);
    const {tasks} = useSelector(state => state.dataTasks)
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
        props.handleUpdateProjectStatus()
    }

    const handleRemove = () => {
        setAnchorEl(null)
        props.handleRemoveProjectStatus()
    }

    return (
        <div className="card-column">
            <Card style={{textAlign: "left"}}>
                <CardHeader
                    title={<b style={{fontSize: 20}}>{props.column.name}</b>}
                    subheader={
                        <span>
                            {tasks.filter(task => task.projectStatus.id === props.column.id).length}
                            /{props.column.limitTotalTask}
                        </span>}
                    action={currentUser.id === project.creator.id ?
                        <IconButton aria-label="settings" onClick={handleClick}><MoreVertIcon/></IconButton> : null
                    }
                    style={{textTransform: "uppercase", textOverflow: "ellipsis"}}
                    className={"stage-header"}
                />
                <CardContent
                    onDrop={(event) => onDropHandler(event, props.column.id)}
                    onDragOver={(event) => onDragOverHandler(event)}
                >
                    <TaskList stage={props.column} key={props.column.id}/>
                </CardContent>
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
        </div>
    );
}

export default TaskItem;
