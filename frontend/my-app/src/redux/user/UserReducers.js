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
        case types.UPDATE_USER_BY_ID:
            const objIndex = state.users.findIndex((item => item.id === action.payload.id));
            let updatedUsers = state.users;
            updatedUsers[objIndex] = action.payload
            return {
                ...state,
                users: updatedUsers,
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