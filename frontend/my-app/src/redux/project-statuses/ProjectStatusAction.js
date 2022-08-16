import * as types from "./ProjectStatusActionType"
import ProjectStatusesService from "../../service/ProjectStatusesService";

const gotProjectStatusesSuccess = (projectStatuses) => ({
    type: types.GET_PROJECT_STATUSES_BY_PROJECT_ID,
    payload: projectStatuses,
})

const gotProjectStatusSuccess = (projectStatus) => ({
    type: types.GET_PROJECT_STATUS_BY_ID,
    payload: projectStatus,
})

const createdProjectStatusSuccess = (projectStatus) => ({
    type: types.CREATE_PROJECT_STATUS,
    payload: projectStatus,
})

const updatedProjectStatusSuccess = (projectStatus) => ({
    type: types.UPDATE_PROJECT_STATUS_BY_ID,
    payload: projectStatus,
})

const updatedProjectStatusSelfSuccess = (projectStatus) => ({
    type: types.UPDATE_PROJECT_STATUS_BY_ID_SELF,
    payload: projectStatus,
})

const deletedProjectStatusSuccess = (projectStatusId) => ({
    type: types.DELETE_PROJECT_STATUS_BY_ID,
    payload: projectStatusId,
})

export const setCurrentPage = (page) => ({
    type: types.SET_CURRENT_PAGE_PROJECT_STATUSES,
    payload: page
})

export const setSizePage = (size) => ({
    type: types.SET_SIZE_PAGE_PROJECT_STATUSES,
    payload: size
})

export const setLoadingProjectStatuses = (loading) => ({
    type: types.SET_LOADING_PROJECT_STATUSES,
    payload: loading
})

export const setLoadingProjectStatus = (loading) => ({
    type: types.SET_LOADING_PROJECT_STATUS,
    payload: loading
})

export const resetData = () => ({
    type: types.RESET_DATA,
})

//============================================ Axios requests ==========================================================

export const getAllProjectStatusesByProjectId = (currentPage = 0, sizePage = 0, projectId) => {
    return function (dispatch) {
        dispatch(setLoadingProjectStatuses(true))
        ProjectStatusesService.getAllProjectStatusesByProjectId(currentPage, sizePage, projectId)
            .then(response => {
                dispatch(gotProjectStatusesSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingProjectStatuses(false))
            })
    }
}

export const getProjectStatusById = (id) => {
    return function (dispatch) {
        dispatch(setLoadingProjectStatus(true))
        ProjectStatusesService.getProjectStatusById(id)
            .then((resp) => {
                dispatch(gotProjectStatusSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingProjectStatus(false))
            })
    }
}

export function createProjectStatus(projectStatus) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            ProjectStatusesService.createProjectStatus(projectStatus)
                .then((response) => {
                    dispatch(createdProjectStatusSuccess(response.data))
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

export function updateProjectStatusById(request, id) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            ProjectStatusesService.updateProjectStatus(request, id)
                .then((response) => {
                    dispatch(updatedProjectStatusSuccess(response.data))
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

export const deleteProjectStatusById = (projectStatusId) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            ProjectStatusesService.deleteProjectStatusById(projectStatusId)
                .then((response) => {
                    dispatch(deletedProjectStatusSuccess(projectStatusId))
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