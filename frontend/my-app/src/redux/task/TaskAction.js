import * as types from "./TaskActionType"
import TaskService from "../../service/TaskService";

const gotTasksSuccess = (tasks) => ({
    type: types.GET_TASKS_BY_PROJECT_ID,
    payload: tasks,
})

const gotTaskSuccess = (task) => ({
    type: types.GET_TASK_BY_ID,
    payload: task,
})

const createdTaskSuccess = (task) => ({
    type: types.CREATE_TASK,
    payload: task,
})

const updatedTaskSuccess = (task) => ({
    type: types.UPDATE_TASK_BY_ID,
    payload: task,
})

const deletedTaskSuccess = (taskId) => ({
    type: types.DELETE_TASK_BY_ID,
    payload: taskId,
})

export const setLoadingTasks = (loading) => ({
    type: types.SET_LOADING_TASKS,
    payload: loading
})
//
export const setLoadingTask = (loading) => ({
    type: types.SET_LOADING_TASK,
    payload: loading
})

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

export const getTaskById = (id) => {
    return function (dispatch) {
        dispatch(setLoadingTask(true))
        TaskService.getTaskById(id)
            .then((resp) => {
                dispatch(gotTaskSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingTask(false))
            })
    }
}

export function createTask(task) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            TaskService.createTask(task)
                .then((response) => {
                    dispatch(createdTaskSuccess(response.data))
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

export function updateTaskById(request, taskId) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            TaskService.updateTaskById(request, taskId)
                .then((response) => {
                    dispatch(updatedTaskSuccess(response.data))
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

export const addUserToTask = (taskId, userId) => {
    return function (dispatch) {
        TaskService.addUserToTaskByTaskIdAndUserId(taskId, userId)
            .then(response => {
                dispatch(updatedTaskSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const removeUserFromTask = (taskId, userId) => {
    return function (dispatch) {
        TaskService.removeUserFromTaskByTaskIdAndUserId(taskId, userId)
            .then(response => {
                dispatch(updatedTaskSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const deleteTaskById = (taskId) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            TaskService.deleteTaskById(taskId)
                .then((response) => {
                    dispatch(deletedTaskSuccess(taskId))
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
