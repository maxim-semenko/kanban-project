import * as types from "./ProjectActionType"

const initialState = {
    projects: [],
    project: null,
    loadingProjects: true,
    loadingProject: true,
    currentPage: 0,
    sizePage: 10,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const projectReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.RESET_DATA:
            return {
                ...state,
                projects: [],
                project: null,
                loadingProjects: true,
                loadingProject: true,
                currentPage: 0,
                sizePage: 10,
                totalElements: 0,
                totalPages: 0,
                numberOfElements: 0,
            }
        case types.GET_PROJECTS_BY_USER_ID:
            return {
                ...state,
                projects: action.payload.pageable.pageNumber === 0 ?
                    action.payload.content :
                    state.projects.concat(action.payload.content),
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loadingProjects: false,
            }
        case types.GET_PROJECT_BY_ID:
        case types.UPDATE_PROJECT_BY_ID_SELF:
            return {
                ...state,
                project: action.payload,
                loadingProject: false,
            }
        case types.CREATE_PROJECT:
            return {
                ...state,
                projects: [...state.projects.slice(0, 0), action.payload, ...state.projects.slice(0)],
                totalElements: state.totalElements + 1,
            }
        case types.UPDATE_PROJECT_BY_ID:
            const objIndex = state.projects.findIndex((item => item.id === action.payload.id));
            let updatedProjects = state.projects;
            updatedProjects[objIndex] = action.payload
            return {
                ...state,
                projects: updatedProjects,
            }
        case types.DELETE_PROJECT_BY_ID:
            return {
                ...state,
                projects: state.projects.filter(item => item.id !== action.payload),
                totalElements: state.totalElements - 1,
            }
        case types.SET_CURRENT_PAGE_PROJECTS:
            console.log("SET_CURRENT_PAGE_PROJECTS")
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_PROJECTS:
            return {
                ...state,
                sizePage: action.payload
            }
        case types.SET_LOADING_PROJECTS:
            return {
                ...state,
                loadingProjects: action.payload
            }
        case types.SET_LOADING_PROJECT:
            return {
                ...state,
                loadingProject: action.payload
            }
        default:
            return state
    }
}

export default projectReducers;