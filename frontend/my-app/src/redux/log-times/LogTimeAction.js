import * as types from "./LogTimeActionType"
import LogTimeService from "../../api/LogTimeService";

const setLogTimes = (logTimes) => ({
    type: types.SET_LOG_TIMES,
    payload: logTimes,
})

const setLogTime = (logTime) => ({
    type: types.SET_LOG_TIME,
    payload: logTime,
})

const createdLogTimeSuccess = (logTime) => ({
    type: types.CREATE_LOG_TIME,
    payload: logTime,
})

const updatedLogTimeSuccess = (logTime) => ({
    type: types.UPDATE_LOG_TIME_BY_ID,
    payload: logTime,
})

const deletedLogTimeSuccess = (logTimeId) => ({
    type: types.DELETE_LOG_TIME_BY_ID,
    payload: logTimeId,
})

export const setCurrentPage = (page) => ({
    type: types.SET_CURRENT_PAGE_LOG_TIMES,
    payload: page
})

export const setSizePage = (size) => ({
    type: types.SET_SIZE_PAGE_LOG_TIMES,
    payload: size
})

export const setLoadingLogTimes = (loading) => ({
    type: types.SET_LOADING_LOG_TIMES,
    payload: loading
})

export const setLoadingLogTime = (loading) => ({
    type: types.SET_LOADING_LOG_TIME,
    payload: loading
})

export const resetData = () => ({
    type: types.RESET_DATA,
})

//============================================ Axios requests ==========================================================

export const getAllLogTimesByProjectId = (projectId, currentPage = 0, sizePage = 0) => {
    return function (dispatch) {
        dispatch(setLoadingLogTimes(true))
        LogTimeService.getAllLogTimesByProjectId(projectId, currentPage, sizePage)
            .then(response => {
                dispatch(setLogTimes(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingLogTimes(false))
            })
    }
}

export const getAllLogTimesByUserId = (userId, currentPage = 0, sizePage = 0) => {
    return function (dispatch) {
        dispatch(setLoadingLogTimes(true))
        LogTimeService.getAllLogTimesByUserId(userId, currentPage, sizePage)
            .then(response => {
                dispatch(setLogTimes(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingLogTimes(false))
            })
    }
}

export const getAllLogTimesByUserIdAndProjectId = (currentPage = 0, sizePage = 0, userId, projectId) => {
    return function (dispatch) {
        dispatch(setLoadingLogTimes(true))
        LogTimeService.getAllLogTimesByUserIdAndProjectId(currentPage, sizePage, userId, projectId)
            .then(response => {
                dispatch(setLogTimes(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingLogTimes(false))
            })
    }
}

export const getAllLogTimesByTicketId = (currentPage = 0, sizePage = 0, ticketId) => {
    return function (dispatch) {
        console.log(ticketId)
        dispatch(setLoadingLogTimes(true))
        LogTimeService.getAllLogTimesByTicketId(currentPage, sizePage, ticketId)
            .then(response => {
                dispatch(setLogTimes(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingLogTimes(false))
            })
    }
}

export const getLogTimeById = (id) => {
    return function (dispatch) {
        dispatch(setLoadingLogTime(true))
        LogTimeService.getLogTimeById(id)
            .then((resp) => {
                dispatch(setLogTime(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingLogTime(false))
            })
    }
}

export function createLogTime(logTime) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            LogTimeService.createLogTime(logTime)
                .then((response) => {
                    dispatch(createdLogTimeSuccess(response.data))
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

export function updateLogTimeById(logTime, id) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            LogTimeService.updateLogTime(logTime, id)
                .then((response) => {
                    dispatch(updatedLogTimeSuccess(response.data))
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

export const deleteLogTimeById = (logTimeId) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            LogTimeService.deleteLogTimeById(logTimeId)
                .then((response) => {
                    dispatch(deletedLogTimeSuccess(logTimeId))
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