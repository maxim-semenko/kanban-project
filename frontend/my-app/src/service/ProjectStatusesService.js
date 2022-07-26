import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/project-statuses"
const cookies = new Cookies();

class UserService {

    async getAllProjectStatusesByProjectId(page = 0, size = 0, projectId) {
        return axios.get(`${API_URL}/projects/${projectId}`, {
            params: {
                // sort: 'createdDate,desc',
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

    async deleteProjectById(postId) {
        return axios.delete(`${API_URL}/${postId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

}

export default new UserService()