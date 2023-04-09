import * as types from "./DialogActionType"

export const setOpenCreateUpdateLogTimeDialog = (open) => ({
    type: types.SET_OPEN_CREATE_UPDATE_LOG_TIME_DIALOG,
    payload: open,
})

export const setOpenRemoveLogTimeDialog = (open) => ({
    type: types.SET_OPEN_REMOVE_LOG_TIME_DIALOG,
    payload: open,
})

export const setMethodCreateUpdateLogTimeDialog = (method) => ({
    type: types.SET_METHOD_CREATE_UPDATE_LOG_TIME_DIALOG,
    payload: method,
})

