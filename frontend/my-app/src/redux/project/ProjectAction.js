import * as types from "./ProjectActionType"
import UserService from "../../service/ProjectService";
import ProjectService from "../../service/ProjectService";

const gotProjectsSuccess = (projects) => ({
    type: types.GET_PROJECTS_BY_USER_ID,
    payload: projects,
})

const gotProjectSuccess = (project) => ({
    type: types.GET_PROJECT_BY_ID,
    payload: project,
})

const updatedProjectSuccess = (project) => ({
    type: types.UPDATE_PROJECT_BY_ID,
    payload: project,
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

// export const updateUserRolesById = (request, id) => {
//     return function (dispatch) {
//         UserService.updateUserRolesById(request, id)
//             .then((resp) => {
//                 dispatch(updatedUserSuccess(resp.data))
//                 console.log(resp.data)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }
// }
//
// export const updateUserIsNonLockedById = (request, id) => {
//     return function (dispatch) {
//         UserService.updateUserIsNonLockedById(request, id)
//             .then((resp) => {
//                 dispatch(updatedUserSuccess(resp.data))
//                 console.log(resp.data)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }
// }