import * as types from "./NotificationActionType"

const initialState = {
    show: false,
    type: "",
    text: "",
}

const notificationReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_SHOW_NOTIFICATION:
            return {
                ...state,
                show: action.payload
            }
        case types.SET_TYPE_NOTIFICATION:
            return {
                ...state,
                type: action.payload
            }
        case types.SET_TEXT_NOTIFICATION:
            return {
                ...state,
                text: action.payload
            }
        default:
            return state
    }
}

export default notificationReducers;