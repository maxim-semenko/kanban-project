import * as types from "./UserActionType"
import UserService from "../../service/UserService";

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