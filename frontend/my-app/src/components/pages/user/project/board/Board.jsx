import React, {createContext} from "react";
import ColumnList from "./ColumnList";
import {CircularProgress, Grid} from "@mui/material";
import "../../../../../style/Board.css";
import {useDispatch, useSelector} from "react-redux";
import {updateTicketProjectStatusById} from "../../../../../redux/tickets/TicketAction";
import Box from "@mui/material/Box";

export const BoardContext = createContext({});

function Board() {
    const dispatch = useDispatch()
    const {tickets, loadingTickets} = useSelector(state => state.dataTickets)
    const {projectStatuses, loadingProjectStatuses} = useSelector(state => state.dataProjectStatuses)

    /// начало!!!
    const onDragStartHandler = (event, ticketId, stageId) => {
        const data = {
            ticketId: ticketId,
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
        const filterticket = tickets.filter((ticket) => ticket.id === droppedData.ticketId);
        const filterColumn = projectStatuses.filter((column) => column.id === droppedStageId);

        dispatch(updateTicketProjectStatusById({projectStatus: filterColumn[0]}, filterticket[0].id));
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
                    !loadingTickets && !loadingProjectStatuses ?
                        <BoardContext.Provider value={ContextData}>
                            <ColumnList/>
                        </BoardContext.Provider>
                        :
                        <Box display="flex" justifyContent="center"><CircularProgress/></Box>
                }
            </Grid>
        </Grid>
    );
}

export default Board;
