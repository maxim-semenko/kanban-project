import * as types from "./TicketActionType"
import {GET_TICKETS, GET_TICKETS_BY_PROJECT_ID} from "./TicketActionType";

const initialState = {
    tickets: [],
    ticket: null,
    loadingTickets: true,
    loadingTicket: true,
    currentPage: 0,
    sizePage: 10,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const ticketReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.RESET_DATA:
        return {
            ...state,
            projects: [],
            project: null,
            loadingProjects: true,
            loadingProject: true,
            currentPage: 0,
            sizePage: 10,
            totalElements: 0,
            totalPages: 0,
            numberOfElements: 0,
        }
        case types.GET_TICKETS:
            return {
                ...state,
                tickets: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loadingTickets: false,
            }
        case types.GET_TICKET_BY_ID:
            return {
                ...state,
                ticket: action.payload,
                loadingTicket: false,
            }
        case types.CREATE_TICKET:
            return {
                ...state,
                tickets: [...state.tickets, action.payload],
                totalElements: state.totalElements + 1,
            }
        case types.UPDATE_TICKET_BY_ID:
            const objIndex = state.tickets.findIndex((item => item.id === action.payload.id));
            let updatedTickets = state.tickets;
            updatedTickets[objIndex] = action.payload
            return {
                ...state,
                tickets: updatedTickets,
            }
        case types.DELETE_TICKET_BY_ID:
            return {
                ...state,
                tickets: state.tickets.filter(item => item.id !== action.payload),
                totalElements: state.totalElements - 1,
            }
        case types.SET_CURRENT_PAGE_TICKETS:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_TICKETS:
            return {
                ...state,
                sizePage: action.payload
            }
        case types.SET_LOADING_TICKETS:
            return {
                ...state,
                loadingTickets: action.payload
            }
        case types.SET_LOADING_TICKET:
            return {
                ...state,
                loadingTicket: action.payload
            }
        default:
            return state
    }
}

export default ticketReducers;