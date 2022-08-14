import React, {createContext} from "react";
import ColumnList from "./ColumnList";
import {Grid} from "@mui/material";
import "../../../style/Board.css";
import {useDispatch, useSelector} from "react-redux";
import {updateTaskProjectStatusById} from "../../../redux/task/TaskAction";

export const BoardContext = createContext({});

function Board() {
    const dispatch = useDispatch()
    const {tasks, loadingTasks} = useSelector(state => state.dataTasks)
    const {projectStatuses, loadingProjectStatuses} = useSelector(state => state.dataProjectStatuses)

    /// начало!!!
    const onDragStartHandler = (event, taskId, stageId) => {
        const data = {
            taskId: taskId,
            stageId: stageId
        };
        event.dataTransfer.setData("text/plain", JSON.stringify(data));
        event.dataTransfer.effectAllowed = "move";
    };

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
        const filterColumn = projectStatuses.filter((column) => column.id === droppedStageId);

        dispatch(updateTaskProjectStatusById({projectStatus: filterColumn[0]}, filterTask[0].id));
    };

    const ContextData = {
        onDragStartHandler,
        onDragOverHandler,
        onDropHandler,
    };

    return (
        <Grid container spacing={2} style={{marginBottom: "20px"}}>
            <Grid item xs={12} md={12}>
                {
                    !loadingTasks && !loadingProjectStatuses ?
                        <BoardContext.Provider value={ContextData}>
                            <ColumnList/>
                        </BoardContext.Provider>
                        :
                        null
                }
            </Grid>
        </Grid>
    );
}

export default Board;
