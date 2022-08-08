import * as types from "./ProjectActionType"
import ProjectService from "../../service/ProjectService";

const gotProjectsSuccess = (projects) => ({
    type: types.GET_PROJECTS_BY_USER_ID,
    payload: projects,
})

const gotProjectSuccess = (project) => ({
    type: types.GET_PROJECT_BY_ID,
    payload: project,
})

const createdProjectSuccess = (project) => ({
    type: types.CREATE_PROJECT,
    payload: project,
})

const updatedProjectSuccess = (project) => ({
    type: types.UPDATE_PROJECT_BY_ID,
    payload: project,
})

const updatedProjectSelfSuccess = (project) => ({
    type: types.UPDATE_PROJECT_BY_ID_SELF,
    payload: project,
})

const deletedProjectSuccess = (projectId) => ({
    type: types.DELETE_PROJECT_BY_ID,
    payload: projectId,
})

export const setCurrentPage = (page) => ({
    type: types.SET_CURRENT_PAGE_PROJECTS,
    payload: page
})

export const setSizePage = (size) => ({
    type: types.SET_SIZE_PAGE_PROJECTS,
    payload: size
})

export const setLoadingProjects = (loading) => ({
    type: types.SET_LOADING_PROJECTS,
    payload: loading
})

export const setLoadingProject = (loading) => ({
    type: types.SET_LOADING_PROJECT,
    payload: loading
})

export const resetData = () => ({
    type: types.RESET_DATA,
})

//============================================ Axios requests ==========================================================

export const getAllProjectByUserId = (currentPage = 0, sizePage = 0, userId) => {
    return function (dispatch) {
        dispatch(setLoadingProjects(true))
        ProjectService.getAllProjectsByUserId(currentPage, sizePage, userId)
            .then(response => {
                dispatch(gotProjectsSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingProjects(false))
            })
    }
}

export const getProjectById = (id) => {
    return function (dispatch) {
        dispatch(setLoadingProject(true))
        ProjectService.getProjectById(id)
            .then((resp) => {
                dispatch(gotProjectSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingProject(false))
            })
    }
}

export function createProject(project) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            ProjectService.createProject(project)
                .then((response) => {
                    dispatch(createdProjectSuccess(response.data))
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

export function updateProjectById(request, id) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            ProjectService.updateProject(request, id)
                .then((response) => {
                    dispatch(updatedProjectSelfSuccess(response.data))
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

export const deleteProjectById = (projectId) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            ProjectService.deleteProjectById(projectId)
                .then((response) => {
                    dispatch(deletedProjectSuccess(projectId))
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