import * as types from "./NotificationActionType"

export const setShowNotification = (show) => ({
    type: types.SET_SHOW_NOTIFICATION,
    payload: show,
})

export const setTypeNotification = (type) => ({
    type: types.SET_TYPE_NOTIFICATION,
    payload: type,
})

export const setTextNotification = (text) => ({
    type: types.SET_TEXT_NOTIFICATION,
    payload: text,
})

