import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/projects"
const cookies = new Cookies();

class UserService {

    async getAllProjectsByUserId(page = 0, size = 0, userId) {
        return axios.get(`${API_URL}/users/${userId}`, {
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

    async getProjectById(id) {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async createProject(request) {
        return axios.post(`${API_URL}/`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async updateProject(request, id) {
        return axios.put(`${API_URL}/${id}`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async deleteProjectById(postId) {
        return axios.delete(`${API_URL}/${postId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async addUserToProjectByProjectIdAndUserId(projectId, userId) {
        return axios.put(`${API_URL}/${projectId}/users/${userId}`, null, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async removeUserFromProjectByProjectIdAndUserId(projectId, userId) {
        return axios.delete(`${API_URL}/${projectId}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

}

export default new UserService()