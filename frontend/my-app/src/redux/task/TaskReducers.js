import * as types from "./TaskActionType"

const initialState = {
    tasks: [],
    task: null,
    loadingTasks: true,
    loadingTask: true,
    currentPage: 0,
    sizePage: 10,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const taskReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        // case types.RESET_DATA:
            // return {
            //     ...state,
            //     projects: [],
            //     project: null,
            //     loadingProjects: true,
            //     loadingProject: true,
            //     currentPage: 0,
            //     sizePage: 10,
            //     totalElements: 0,
            //     totalPages: 0,
            //     numberOfElements: 0,
            // }
        case types.GET_TASKS_BY_PROJECT_ID:
            return {
                ...state,
                tasks: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loadingTasks: false,
            }
        case types.GET_TASK_BY_ID:
            return {
                ...state,
                task: action.payload,
                loadingTask: false,
            }
        // case types.CREATE_PROJECT:
        //     return {
        //         ...state,
        //         projects: [...state.projects.slice(0, 0), action.payload, ...state.projects.slice(0)],
        //         totalElements: state.totalElements + 1,
        //     }
        case types.UPDATE_TASK_BY_ID:
            const objIndex = state.tasks.findIndex((item => item.id === action.payload.id));
            let updatedTasks = state.tasks;
            updatedTasks[objIndex] = action.payload
            return {
                ...state,
                tasks: updatedTasks,
            }
        case types.DELETE_TASK_BY_ID:
            return {
                ...state,
                tasks: state.tasks.filter(item => item.id !== action.payload),
                totalElements: state.totalElements - 1,
            }
        case types.SET_CURRENT_PAGE_TASKS:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_TASKS:
            return {
                ...state,
                sizePage: action.payload
            }
        case types.SET_LOADING_TASKS:
            return {
                ...state,
                loadingTasks: action.payload
            }
        case types.SET_LOADING_TASK:
            return {
                ...state,
                loadingTask: action.payload
            }
        default:
            return state
    }
}

export default taskReducers;