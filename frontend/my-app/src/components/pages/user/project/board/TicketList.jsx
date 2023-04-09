import React, {useContext, useState} from 'react';
import {BoardContext} from './Board'
import TicketItem from './TicketItem'
import {useDispatch, useSelector} from "react-redux";
import {getTicketById} from "../../../../../redux/tickets/TicketAction";
import CreateUpdateTicketDialog from "../../../../dialogs/create-update/CreateUpdateTicketDialog";
import RemoveTicketDialog from "../../../../dialogs/remove/RemoveTicketDialog";
import AboutTicketDialog from "../../../../dialogs/about/AboutTicketDialog";

function TicketList(props) {
    const dispatch = useDispatch()
    const {onDragStartHandler, onDragOverHandler} = useContext(BoardContext);
    const {tickets, loadingTickets} = useSelector(state => state.dataTickets)

    const [showRemoveTicketDialog, setShowRemoveTicketDialog] = useState(false)
    const [showCreateUpdateTicketDialog, setShowCreateUpdateTicketDialog] = useState(false)
    const [showAboutTicketDialog, setShowAboutTicketDialog] = useState(false)

    const showModals = () => {
        if (showAboutTicketDialog) {
            return (
                <AboutTicketDialog
                    show={showAboutTicketDialog}
                    onHide={() => setShowAboutTicketDialog(false)}
                />
            )
        }
        if (showCreateUpdateTicketDialog) {
            return (
                <CreateUpdateTicketDialog
                    show={showCreateUpdateTicketDialog}
                    onHide={() => setShowCreateUpdateTicketDialog(false)}
                    method={"update"}
                />
            )
        }
        if (showRemoveTicketDialog) {
            return (
                <RemoveTicketDialog
                    show={showRemoveTicketDialog}
                    onHide={() => setShowRemoveTicketDialog(false)}
                />
            )
        }
    }

    const handleAboutTicket = (id) => {
        dispatch(getTicketById(id))
        setShowAboutTicketDialog(true)
    }

    const handleUpdateTicket = (id) => {
        dispatch(getTicketById(id))
        setShowCreateUpdateTicketDialog(true)
    }

    const handleRemoveTicket = (id) => {
        dispatch(getTicketById(id))
        setShowRemoveTicketDialog(true)
    }

    return (
        <>
            {showModals()}
            {
                tickets
                    // Возможно фильтр здесь
                    .filter(ticket => ticket.projectStatus.id === props.stage.id)
                    .map((ticket, index) => (
                        <div
                            draggable
                            key={index}
                            onDragStart={event => onDragStartHandler(event, ticket.id, props.stage.id)}
                            onDragOver={event => onDragOverHandler(event)}
                        >
                            <TicketItem
                                ticket={ticket}
                                handleAboutTicket={() => handleAboutTicket(ticket.id)}
                                handleUpdateTicket={() => handleUpdateTicket(ticket.id)}
                                handleRemoveTicket={() => handleRemoveTicket(ticket.id)}
                            />
                        </div>
                    ))
            }
        </>
    )
}

export default TicketList
