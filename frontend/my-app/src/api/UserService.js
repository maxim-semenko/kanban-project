import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/users"
const cookies = new Cookies();

class UserService {

    async getAllUsers(page = 0, size = 0) {
        return axios.get(`${API_URL}/`, {
            params: {
                sort: 'createdDate,desc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getUserById(id) {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getUserByUsername(username) {
        return axios.get(`${API_URL}/byUsername/${username}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getAllByEmail(email, page = 0, size = 0) {
        return axios.get(`${API_URL}/byEmail/${email}`, {
            params: {
                sort: 'email,asc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getAllUsersByProjectId(projectId, page = 0, size = 0) {
        return axios.get(`${API_URL}/projects/${projectId}`, {
            params: {
                sort: 'firstname,lastname,asc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async updateUserById(request, id) {
        return axios.put(`${API_URL}/${id}`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`
            },
        })
    }

    /**
     * Update user's password by id.
     * @param request data
     * @param id user's id
     * @returns {Promise<AxiosResponse<any>>} AxiosResponse
     */
    async updatePasswordById(request, id) {
        console.log(`${API_URL}/${id}/password/`)
        return axios.patch(`${API_URL}/${id}/password/`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            },
        })
    }

    async updateUserIsNonLockedById(request, id) {
        return axios.patch(`${API_URL}/${id}/locked`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`
            },
        })
    }

    async updateUserRolesById(request, id) {
        return axios.patch(`${API_URL}/${id}/roles`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}
                `
            },
        })
    }

}

export default new UserService()