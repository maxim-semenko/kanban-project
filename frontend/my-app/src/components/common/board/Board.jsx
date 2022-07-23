import React, {createContext, useEffect, useReducer, useState} from "react";
import BoardLanes from "./BoardLanes";
import "./Board.css";
import {Container, Row} from "react-bootstrap";

const stagesData = [
    {name: "Required", id: 1},
    {name: "In Progress", id: 2},
    {name: "Review", id: 3},
    {name: "Testing", id: 4},
    {name: "Done", id: 5},
    {name: "Done1", id: 6},
];
const taskData = [
    {
        id: 1,
        title: "Task 1",
        description: "Testing Task 1",
        stage: 1,
        startDate: new Date(2020, 3, 1),
        endDate: new Date(2020, 3, 20)
    },
    {
        id: 2,
        title: "Task 2",
        description: "Just Test 2",
        stage: 1,
        startDate: new Date(2020, 2, 25),
        endDate: new Date(2020, 3, 25)
    },
    {
        id: 3,
        title: "Task 3",
        description: "Just Test",
        stage: 2,
        startDate: new Date(2020, 1, 1),
        endDate: new Date(2020, 1, 25)
    },
    {
        id: 4,
        title: "Task 4",
        description: "Just Test",
        stage: 3,
        startDate: new Date(2020, 0, 5),
        endDate: new Date(2020, 1, 15)
    },
    {
        id: 5,
        title: "Task 5",
        description: "Just Test",
        stage: 4,
        startDate: new Date(2020, 2, 5),
        endDate: new Date(2020, 3, 12)
    },
    {
        id: 6,
        title: "Task 6",
        description: "Just Test",
        stage: 5,
        startDate: new Date(2020, 2, 5),
        endDate: new Date(2020, 3, 12)
    }
];

export const BoardContext = createContext({});

function reducer(state, action) {
    switch (action.type) {
        case "ON_DROP":
            const droppedTask = action.payload;
            const updatedTasks = state.map((task) => {
                if (task.id === droppedTask.id) {
                    return droppedTask;
                }
                return task;
            });
            return updatedTasks;
        case "LOAD_DATA":
            return action.payload;
        case "ADD_NEW":
            return [...state, action.payload];
        case "ON_DELETE":
            return state.filter((task) => task.id !== action.payload);
        default:
            return state;
    }
}

function Board() {
    const [taskState, dispatch] = useReducer(reducer, taskData);
    const [stages, setStage] = useState(stagesData);

    useEffect(() => {
        dispatch({type: "LOAD_DATA", payload: taskState});
    }, [taskState, stages]);

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

    const onDragOverHandler = (event) => {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
        }
    };

    const onDropHandler = (event, droppedStageId) => {
        console.log("onDropHandler")
        let droppedData = event.dataTransfer.getData("text/plain");
        droppedData = JSON.parse(droppedData);
        const filterTask = taskState.filter((x) => x.id === droppedData.taskId);
        filterTask[0].stage = droppedStageId;
        dispatch({type: "ON_DROP", payload: filterTask[0]});
    };

    // const onAddingNewTask = (dataFromChild) => {
    //     dataFromChild.stage = 1;
    //     dataFromChild.id = taskState.length + 1;
    //     dispatch({ type: "ADD_NEW", payload: dataFromChild });
    // };

    const onUpdatingTask = (dataFromChild) => {
        console.log(dataFromChild);
        dispatch({type: "ON_DROP", payload: dataFromChild});
    };

    const onDeletingTask = (taskId) => {
        dispatch({ type: "ON_DELETE", payload: taskId });
    };

    const ContextData = {
        taskState,
        onDragStartHandler,
        onDragOverHandler,
        onDropHandler,
        onUpdatingTask,
        onDeletingTask,
        // onTaskContainerDragStartHandler,
        // onTaskContainerDropHandler,
        // onTaskContainerDragOverHandler
    };

    return (
        <Container fluid style={{padding: "0 10 0 10"}}>
            <Row>
                <div className="col-12">
                    Add task
                </div>
            </Row>
            <hr/>
            <div className="row" >
                <div className="col-12">
                    <BoardContext.Provider value={ContextData}>
                        <BoardLanes stages={stages}/>
                    </BoardContext.Provider>
                </div>
            </div>
            </Container>
    );
}

export default Board;
