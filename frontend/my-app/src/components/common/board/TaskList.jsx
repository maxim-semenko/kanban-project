import React, {useContext} from 'react';
import {BoardContext} from './Board'
import CardItem from './CardItem'
import {useSelector} from "react-redux";

function TaskList(props) {
    // const {taskState, onDragStartHandler, onDragOverHandler} = useContext(BoardContext);
    const {onDragStartHandler, onDragOverHandler} = useContext(BoardContext);

    const {tasks, loadingTasks} = useSelector(state => state.dataTasks)

    return (
        <>
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
                            <CardItem task={task}/>
                        </div>
                    ))
            }
        </>
    )
}

export default TaskList
