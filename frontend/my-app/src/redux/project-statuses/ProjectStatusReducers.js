import * as types from "./ProjectStatusActionType"

const initialState = {
    projectStatuses: [],
    projectStatus: null,
    loadingProjectStatuses: true,
    loadingProjectStatus: true,
    currentPage: 0,
    sizePage: 10,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const projectStatusReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.RESET_DATA:
            return {
                ...state,
                projectStatuses: [],
                projectStatus: null,
                loadingProjectStatuses: true,
                loadingProjectStatus: true,
                currentPage: 0,
                sizePage: 10,
                totalElements: 0,
                totalPages: 0,
                numberOfElements: 0,
            }
        case types.GET_PROJECT_STATUSES_BY_PROJECT_ID:
            return {
                ...state,
                projectStatuses: action.payload.pageable.pageNumber === 0 ?
                    action.payload.content :
                    state.projectStatuses.concat(action.payload.content),
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loadingProjects: false,
            }
        case types.GET_PROJECT_STATUS_BY_ID:
        case types.UPDATE_PROJECT_STATUS_BY_ID_SELF:
            console.log("GET")
            return {
                ...state,
                projectStatus: action.payload,
                loadingProjectStatus: false,
            }
        case types.CREATE_PROJECT_STATUS:
            return {
                ...state,
                projectStatuses: [...state.projectStatuses, action.payload],
                totalElements: state.totalElements + 1,
            }
        case types.UPDATE_PROJECT_STATUS_BY_ID:
            const objIndex = state.projectStatuses.findIndex((item => item.id === action.payload.id));
            let updatedProjectStatuses = state.projectStatuses;
            updatedProjectStatuses[objIndex] = action.payload
            return {
                ...state,
                projectStatuses: updatedProjectStatuses,
            }
        case types.DELETE_PROJECT_STATUS_BY_ID:
            return {
                ...state,
                projectStatuses: state.projectStatuses.filter(item => item.id !== action.payload),
                totalElements: state.totalElements - 1,
            }
        case types.SET_CURRENT_PAGE_PROJECT_STATUSES:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_PROJECT_STATUSES:
            return {
                ...state,
                sizePage: action.payload
            }
        case types.SET_LOADING_PROJECT_STATUSES:
            return {
                ...state,
                loadingProjectStatuses: action.payload
            }
        case types.SET_LOADING_PROJECT_STATUS:
            return {
                ...state,
                loadingProjectStatus: action.payload
            }
        default:
            return state
    }
}

export default projectStatusReducers;