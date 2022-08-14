import React, {useContext, useState} from 'react';
import {BoardContext} from './Board'
import TaskItem from './TaskItem'
import {useDispatch, useSelector} from "react-redux";
import RemoveTaskDialog from "../../dialogs/RemoveTaskDialog";
import {getTaskById} from "../../../redux/task/TaskAction";
import CreateUpdateTaskDialog from "../../dialogs/CreateUpdateTaskDialog";

function TaskList(props) {
    const dispatch = useDispatch()
    const {onDragStartHandler, onDragOverHandler} = useContext(BoardContext);
    const {tasks, loadingTasks} = useSelector(state => state.dataTasks)

    const [showRemoveTaskDialog, setShowRemoveTaskDialog] = useState(false)
    const [showCreateUpdateTaskDialog, setShowCreateUpdateTaskDialog] = useState(false)

    const showModals = () => {
        if (showRemoveTaskDialog) {
            return (
                <RemoveTaskDialog
                    show={showRemoveTaskDialog}
                    onHide={() => setShowRemoveTaskDialog(false)}
                />
            )
        }
        if (showCreateUpdateTaskDialog) {
            return (
                <CreateUpdateTaskDialog
                    show={showCreateUpdateTaskDialog}
                    onHide={() => setShowCreateUpdateTaskDialog(false)}
                    method={"update"}
                />
            )
        }
    }


    const handleRemoveTask = (id) => {
        dispatch(getTaskById(id))
        setShowRemoveTaskDialog(true)
    }

    const handleUpdateTask = (id) => {
        dispatch(getTaskById(id))
        setShowCreateUpdateTaskDialog(true)
    }

    return (
        <>
            {showModals()}
            {
                tasks
                    // Возможно фильтр здесь
                    .filter(task => task.projectStatus.id === props.stage.id)
                    .map((task, index) => (
                        <div
                            draggable
                            key={index}
                            onDragStart={event => onDragStartHandler(event, task.id, props.stage.id)}
                            onDragOver={event => onDragOverHandler(event)}
                        >
                            <TaskItem
                                task={task}
                                handleRemoveTask={() => handleRemoveTask(task.id)}
                                handleUpdateTask={() => handleUpdateTask(task.id)}
                            />
                        </div>
                    ))
            }
        </>
    )
}

export default TaskList
