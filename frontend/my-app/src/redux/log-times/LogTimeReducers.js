import * as types from "./LogTimeActionType"

const initialState = {
    logTimes: [],
    logTime: null,
    loadingLogTimes: true,
    loadingLogTime: true,
    currentPage: 0,
    sizePage: 10,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const logTimeReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.RESET_DATA:
            return {
                ...state,
                logTimes: [],
                logTime: null,
                loadingLogTimes: true,
                loadingLogTime: true,
                currentPage: 0,
                sizePage: 10,
                totalElements: 0,
                totalPages: 0,
                numberOfElements: 0,
            }
        case types.SET_LOG_TIMES:
            return {
                ...state,
                logTimes: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loadingLogTimes: false,
            }
        case types.SET_LOG_TIME:
            return {
                ...state,
                logTime: action.payload,
                loadingLogTime: false,
            }
        case types.CREATE_LOG_TIME:
            return {
                ...state,
                logTimes: [...state.logTimes.slice(0, 0), action.payload, ...state.logTimes.slice(0)],
                totalElements: state.totalElements + 1,
            }
        case types.UPDATE_LOG_TIME_BY_ID:
            const objIndex = state.logTimes.findIndex((item => item.id === action.payload.id));
            let updatedLogTimes = state.logTimes;
            updatedLogTimes[objIndex] = action.payload
            return {
                ...state,
                logTimes: updatedLogTimes,
            }
        case types.DELETE_LOG_TIME_BY_ID:
            return {
                ...state,
                logTimes: state.logTimes.filter(item => item.id !== action.payload),
                totalElements: state.totalElements - 1,
            }
        case types.SET_CURRENT_PAGE_LOG_TIMES:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_LOG_TIMES:
            return {
                ...state,
                sizePage: action.payload
            }
        case types.SET_LOADING_LOG_TIMES:
            return {
                ...state,
                loadingLogTimes: action.payload
            }
        case types.SET_LOADING_LOG_TIME:
            return {
                ...state,
                loadingLogTime: action.payload
            }
        default:
            return state
    }
}

export default logTimeReducers;