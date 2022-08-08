import * as types from "./UserActionType"
import UserService from "../../service/UserService";
import ProjectService from "../../service/ProjectService";

const gotUsersSuccess = (users) => ({
    type: types.GET_USERS,
    payload: users,
})

const gotUserSuccess = (user) => ({
    type: types.GET_USER_BY_ID,
    payload: user,
})

const updatedUserSuccess = (user) => ({
    type: types.UPDATE_USER_BY_ID,
    payload: user,
})

const addedUserSuccess = (user) => ({
    type: types.ADD_USER,
    payload: user,
})

const deletedUserSuccess = (userId) => ({
    type: types.DELETE_USER_BY_ID,
    payload: userId,
})

export const setCurrentPage = (page) => ({
    type: types.SET_CURRENT_PAGE_USERS,
    payload: page
})

export const setSizePage = (size) => ({
    type: types.SET_SIZE_PAGE_USERS,
    payload: size
})

export const setLoadingUsers = (loading) => ({
    type: types.SET_LOADING_USERS,
    payload: loading
})

export const setLoadingUser = (loading) => ({
    type: types.SET_LOADING_USER,
    payload: loading
})

export const resetData = () => ({
    type: types.RESET_DATA,
})

//============================================ Axios requests ==========================================================

export const getAllUsers = (currentPage = 0, sizePage = 0) => {
    return function (dispatch) {
        dispatch(setLoadingUsers(true))
        UserService.getAllUsers(currentPage, sizePage)
            .then(response => {
                dispatch(gotUsersSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoadingUsers(false)
            })
    }
}

export const getUserById = (id) => {
    return function (dispatch) {
        dispatch(setLoadingUser(true))
        UserService.getUserById(id)
            .then((resp) => {
                dispatch(gotUserSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoadingUser(false)
            })
    }
}

export const getUsersByProjectId = (projectId, currentPage = 0, sizePage = 0) => {
    return function (dispatch) {
        dispatch(setLoadingUsers(true))
        UserService.getAllUsersByProjectId(projectId, currentPage, sizePage)
            .then((resp) => {
                dispatch(gotUsersSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setLoadingUsers(false))
            })
    }
}

export const updateUserRolesById = (request, id) => {
    return function (dispatch) {
        UserService.updateUserRolesById(request, id)
            .then((resp) => {
                dispatch(updatedUserSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateUserIsNonLockedById = (request, id) => {
    return function (dispatch) {
        UserService.updateUserIsNonLockedById(request, id)
            .then((resp) => {
                dispatch(updatedUserSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const addUserToProjectByProjectId = (projectId, user) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            ProjectService.addUserToProjectByProjectIdAndUserId(projectId, user.id)
                .then((response) => {
                    console.log(response)
                    dispatch(addedUserSuccess(user))
                    return resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    return reject(error);
                })
        })
    }
}

export const removeUserFromProjectByProjectId = (projectId, userId) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            ProjectService.removeUserFromProjectByProjectIdAndUserId(projectId, userId)
                .then((response) => {
                    console.log(response)
                    dispatch(deletedUserSuccess(userId))
                    return resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    return reject(error);
                })
        })
    }
}