import React, {useContext, useEffect, useState} from "react";
import {BoardContext} from "./Board";
import TaskList from "./TaskList";
import {Card, CardContent, CardHeader, IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {useSelector} from "react-redux";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ColumnList(props) {
    const {onDragOverHandler, onDropHandler} = useContext(BoardContext);
    const [divWidth, setDivWidth] = useState(0);
    const {tasks} = useSelector(state => state.dataTasks)
    const [openMenu, setOpenMenu] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setDivWidth(props.stages.length * 285 + props.stages.length * 16);
    }, []);

    return (
        <div className="column-wrapper">
            <div style={{width: divWidth}}>
                {props.stages.map((column, index) => (
                    <>
                        <div className="card-column" key={index}>
                            <Card style={{textAlign: "left"}}>
                                <CardHeader
                                    title={<b style={{fontSize: 20}}>{column.name}</b>}
                                    subheader={
                                        <span>
                                            {tasks.filter(task => task.projectStatus.id === column.id).length}
                                            /{column.limitTotalTask}
                                        </span>}
                                    action={
                                        <IconButton aria-label="settings" onClick={handleClick}>
                                            <MoreVertIcon/>
                                        </IconButton>
                                    }
                                    style={{textTransform: "uppercase", textOverflow: "ellipsis"}}
                                    className={"stage-header"}
                                />
                                <CardContent
                                    onDrop={(event) => onDropHandler(event, column.id)}
                                    onDragOver={(event) => onDragOverHandler(event)}
                                >
                                    <TaskList stage={column} key={column.id}/>
                                </CardContent>
                            </Card>
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
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}

export default ColumnList;
