import * as types from "./DialogActionType"

const initialState = {
    openCreateUpdateLogTimeDialog: false,
    openRemoveLogTimeDialog: false,
    methodCreateUpdateLogTimeDialog: ""
}

const dialogReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_OPEN_CREATE_UPDATE_LOG_TIME_DIALOG:
            return {
                ...state,
                openCreateUpdateLogTimeDialog: action.payload
            }
        case types.SET_OPEN_REMOVE_LOG_TIME_DIALOG:
            return {
                ...state,
                openRemoveLogTimeDialog: action.payload
            }
        case types.SET_METHOD_CREATE_UPDATE_LOG_TIME_DIALOG:
            return {
                ...state,
                methodCreateUpdateLogTimeDialog: action.payload
            }
        default:
            return state
    }
}

export default dialogReducers;