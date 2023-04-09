import * as types from "./TicketActionType"
import TicketService from "../../api/TicketService";
import {setShowNotification, setTextNotification, setTypeNotification} from "../notifications/NotificationAction";

const gotTicketsSuccess = (tickets) => ({
    type: types.GET_TICKETS,
    payload: tickets,
})

const gotTicketSuccess = (ticket) => ({
    type: types.GET_TICKET_BY_ID,
    payload: ticket,
})

const createdTicketSuccess = (ticket) => ({
    type: types.CREATE_TICKET,
    payload: ticket,
})

const updatedTicketSuccess = (ticket) => ({
    type: types.UPDATE_TICKET_BY_ID,
    payload: ticket,
})

const deletedTicketSuccess = (ticketId) => ({
    type: types.DELETE_TICKET_BY_ID,
    payload: ticketId,
})

export const setLoadingTickets = (loading) => ({
    type: types.SET_LOADING_TICKETS,
    payload: loading
})
//
export const setLoadingTicket = (loading) => ({
    type: types.SET_LOADING_TICKET,
    payload: loading
})

export const resetData = () => ({
    type: types.RESET_DATA,
})

//============================================ Axios requests ==========================================================

export const getAllTicketsByProjectId = (projectId, currentPage = 0, sizePage = 0,) => {
    return function (dispatch) {
        dispatch(setLoadingTickets(true))
        TicketService.getAllTicketsByProjectId(projectId, currentPage, sizePage)
            .then(response => {
                dispatch(gotTicketsSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingTickets(false))
            })
    }
}

export const getAllTicketsByUserId = (userId, currentPage = 0, sizePage = 0,) => {
    return function (dispatch) {
        dispatch(setLoadingTickets(true))
        TicketService.getAllTicketsByUserId(userId, currentPage, sizePage)
            .then(response => {
                dispatch(gotTicketsSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingTickets(false))
            })
    }
}

export const getTicketById = (id) => {
    return function (dispatch) {
        dispatch(setLoadingTicket(true))
        TicketService.getTicketById(id)
            .then((resp) => {
                dispatch(gotTicketSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingTicket(false))
            })
    }
}

export function createTicket(ticket) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            TicketService.createTicket(ticket)
                .then((response) => {
                    dispatch(createdTicketSuccess(response.data))
                    console.log(response)
                    return resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    return reject(error);
                })
        })
    };
}

export function updateTicketById(request, ticketId) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            TicketService.updateTicketById(request, ticketId)
                .then((response) => {
                    dispatch(updatedTicketSuccess(response.data))
                    console.log(response)
                    return resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    return reject(error);
                })
        })
    };
}

export const updateTicketProjectStatusById = (request, ticketId) => {
    return function (dispatch) {
        TicketService.updateTicketProjectStatusById(request, ticketId)
            .then(response => {
                dispatch(updatedTicketSuccess(response.data))
                dispatch(setTypeNotification("success"))
                dispatch(setTextNotification("ticket status updated successfully"))
                console.log(response.data)
            })
            .catch(error => {
                dispatch(setTypeNotification("error"))
                dispatch(setTextNotification(error.response.data.message))
                console.log(error)
            })
            .finally(() => {
                dispatch(setShowNotification(true))
            })
    }
}

export const addUserToTicket = (ticketId, userId) => {
    return function (dispatch) {
        TicketService.addUserToTicketByTicketIdAndUserId(ticketId, userId)
            .then(response => {
                dispatch(updatedTicketSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const removeUserFromTicket = (ticketId, userId) => {
    return function (dispatch) {
        TicketService.removeUserFromTicketByTicketIdAndUserId(ticketId, userId)
            .then(response => {
                dispatch(updatedTicketSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const deleteTicketById = (ticketId) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            TicketService.deleteTicketById(ticketId)
                .then((response) => {
                    dispatch(deletedTicketSuccess(ticketId))
                    console.log(response)
                    return resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    return reject(error);
                })
        })
    }
}
