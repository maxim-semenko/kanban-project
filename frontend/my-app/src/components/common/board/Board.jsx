import React, {createContext, useEffect, useState} from "react";
import ColumnList from "./ColumnList";
import {Grid} from "@mui/material";
import "../../../style/Board.css";
import ProjectStatusesService from "../../../service/ProjectStatusesService";
import {useDispatch, useSelector} from "react-redux";
import {getAllTasksByProjectId, updateTaskProjectStatusById} from "../../../redux/task/TaskAction";
import {useParams} from "react-router-dom";

export const BoardContext = createContext({});

function Board() {
    const {id} = useParams();
    const [projectColumns, setProjectColumns] = useState([])
    const dispatch = useDispatch()
    const {tasks} = useSelector(state => state.dataTasks)

    useEffect(() => {
        ProjectStatusesService.getAllProjectStatusesByProjectId(id)
            .then(response => {
                console.log(response.data)
                setProjectColumns(response.data.content)
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /// начало!!!
    const onDragStartHandler = (event, taskId, stageId) => {
        const data = {
            taskId: taskId,
            stageId: stageId
        };
        event.dataTransfer.setData("text/plain", JSON.stringify(data));
        event.dataTransfer.effectAllowed = "move";
    };

    // const onTaskContainerDragStartHandler = (event, laneId) => {
    //     let fromBox = JSON.stringify({laneId: laneId});
    //     event.dataTransfer.setData("laneId", fromBox);
    // };
    // const onTaskContainerDragOverHandler = (event) => {
    //     if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
    //         event.preventDefault();
    //     }
    // };

    // КОНЕЦ
    const onDragOverHandler = (event) => {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
        }
    };

    const onDropHandler = (event, droppedStageId) => {
        let droppedData = event.dataTransfer.getData("text/plain");
        droppedData = JSON.parse(droppedData);
        const filterTask = tasks.filter((task) => task.id === droppedData.taskId);
        const filterColumn = projectColumns.filter((column) => column.id === droppedStageId);

        dispatch(updateTaskProjectStatusById({projectStatus: filterColumn[0]}, filterTask[0].id));
    };

    // const onAddingNewTask = (dataFromChild) => {
    //     dataFromChild.stage = 1;
    //     dataFromChild.id = taskState.length + 1;
    //     dispatch({ type: "ADD_NEW", payload: dataFromChild });
    // };

    const ContextData = {
        onDragStartHandler,
        onDragOverHandler,
        onDropHandler,
        // onTaskContainerDragStartHandler,
        // onTaskContainerDropHandler,
        // onTaskContainerDragOverHandler
    };

    return (
        <Grid container spacing={2} style={{marginBottom: "20px"}}>
            <Grid item xs={12} md={12}>
                {
                    projectColumns.length !== 0 ?
                        <BoardContext.Provider value={ContextData}>
                            <ColumnList stages={projectColumns}/>
                        </BoardContext.Provider>
                        :
                        null
                }
            </Grid>
        </Grid>
    );
}

export default Board;
