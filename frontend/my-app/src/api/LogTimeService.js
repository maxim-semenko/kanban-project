import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/log-times"
const cookies = new Cookies();

class UserService {

    async getAllLogTimesByProjectId(projectId, page = 0, size = 0) {
        return axios.get(`${API_URL}/projects/${projectId}`, {
            params: {
                sort: 'startDate,desc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getAllLogTimesByUserId(userId, page = 0, size = 0) {
        return axios.get(`${API_URL}/users/${userId}`, {
            params: {
                sort: 'startDate,desc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getAllLogTimesByUserIdAndProjectId(page = 0, size = 0, userId, projectId) {
        return axios.get(`${API_URL}/users/${userId}/projects/${projectId}`, {
            params: {
                sort: 'startDate,desc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getAllLogTimesByTicketId(page = 0, size = 0, ticketId) {
        return axios.get(`${API_URL}/tickets/${ticketId}`, {
            params: {
                sort: 'startDate,desc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getLogTimeById(id) {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async createLogTime(request) {
        return axios.post(`${API_URL}/`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async updateLogTime(request, id) {
        return axios.put(`${API_URL}/${id}`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async deleteLogTimeById(postId) {
        return axios.delete(`${API_URL}/${postId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

}

export default new UserService()