import * as types from "./UserActionType"

const initialState = {
    users: [],
    user: null,
    loadingUsers: true,
    loadingUser: true,
    currentPage: 0,
    sizePage: 10,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const userReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.RESET_DATA:
            return {
                ...state,
                users: [],
                user: null,
                loadingUsers: true,
                loadingUser: true,
                currentPage: 0,
                sizePage: 10,
                totalElements: 0,
                totalPages: 0,
                numberOfElements: 0,
            }
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loadingUsers: false,
            }
        case types.GET_USER_BY_ID:
            return {
                ...state,
                user: action.payload,
                loadingUser: false,
            }
        case types.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
                totalElements: state.totalElements + 1,
            }
        case types.UPDATE_USER_BY_ID:
            const objIndex = state.users.findIndex((item => item.id === action.payload.id));
            let updatedUsers = state.users;
            updatedUsers[objIndex] = action.payload
            return {
                ...state,
                users: updatedUsers,
            }
        case types.DELETE_USER_BY_ID:
            return {
                ...state,
                users: state.users.filter(item => item.id !== action.payload),
                totalElements: state.totalElements - 1,
            }
        case types.SET_CURRENT_PAGE_USERS:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_USERS:
            return {
                ...state,
                sizePage: action.payload
            }
        case types.SET_LOADING_USERS:
            return {
                ...state,
                loadingUsers: action.payload
            }
        case types.SET_LOADING_USER:
            return {
                ...state,
                loadingUser: action.payload
            }
        default:
            return state
    }
}

export default userReducers;