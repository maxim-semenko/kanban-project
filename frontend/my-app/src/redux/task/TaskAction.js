import * as types from "./TaskActionType"
import TaskService from "../../service/TaskService";

const gotTasksSuccess = (tasks) => ({
    type: types.GET_TASKS_BY_PROJECT_ID,
    payload: tasks,
})

// const gotProjectSuccess = (project) => ({
//     type: types.GET_PROJECT_BY_ID,
//     payload: project,
// })
//
// const createdProjectSuccess = (project) => ({
//     type: types.CREATE_PROJECT,
//     payload: project,
// })

const updatedTaskSuccess = (task) => ({
    type: types.UPDATE_TASK_BY_ID,
    payload: task,
})

// const deletedProjectSuccess = (projectId) => ({
//     type: types.DELETE_PROJECT_BY_ID,
//     payload: projectId,
// })
//
// export const setCurrentPage = (page) => ({
//     type: types.SET_CURRENT_PAGE_PROJECTS,
//     payload: page
// })
//
// export const setSizePage = (size) => ({
//     type: types.SET_SIZE_PAGE_PROJECTS,
//     payload: size
// })

export const setLoadingTasks = (loading) => ({
    type: types.SET_LOADING_TASKS,
    payload: loading
})
//
// export const setLoadingProject = (loading) => ({
//     type: types.SET_LOADING_PROJECT,
//     payload: loading
// })

export const resetData = () => ({
    type: types.RESET_DATA,
})

//============================================ Axios requests ==========================================================

export const getAllTasksByProjectId = (projectId, currentPage = 0, sizePage = 0,) => {
    return function (dispatch) {
        dispatch(setLoadingTasks(true))
        TaskService.getAllTasksByProjectId(projectId, currentPage, sizePage)
            .then(response => {
                dispatch(gotTasksSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingTasks(false))
            })
    }
}

export const updateTaskProjectStatusById = (request, taskId) => {
    return function (dispatch) {
        TaskService.updateTaskProjectStatusById(request, taskId)
            .then(response => {
                dispatch(updatedTaskSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// export const getProjectById = (id) => {
//     return function (dispatch) {
//         dispatch(setLoadingProject(true))
//         ProjectService.getProjectById(id)
//             .then((resp) => {
//                 dispatch(gotProjectSuccess(resp.data))
//                 console.log(resp.data)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//             .finally(() => {
//                 dispatch(setLoadingProject(false))
//             })
//     }
// }

// export function createProject(project) {
//     return (dispatch) => {
//         return new Promise((resolve, reject) => {
//             ProjectService.createProject(project)
//                 .then((response) => {
//                     dispatch(createdProjectSuccess(response.data))
//                     console.log(response)
//                     return resolve(response);
//                 })
//                 .catch(error => {
//                     console.log(error)
//                     return reject(error);
//                 })
//         })
//     };
// }
//
// export const deleteProjectById = (projectId) => {
//     return (dispatch) => {
//         return new Promise((resolve, reject) => {
//             ProjectService.deleteProjectById(projectId)
//                 .then((response) => {
//                     dispatch(deletedProjectSuccess(projectId))
//                     console.log(response)
//                     return resolve(response);
//                 })
//                 .catch(error => {
//                     console.log(error)
//                     return reject(error);
//                 })
//         })
//     }
// }