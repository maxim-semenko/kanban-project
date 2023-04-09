import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/project-statuses"
const cookies = new Cookies();

class UserService {

    async getAllProjectStatusesByProjectId(projectId, page = 0, size = 0) {
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

    async getProjectStatusById(id) {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async createProjectStatus(request) {
        return axios.post(`${API_URL}/`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async updateProjectStatus(request, id) {
        return axios.put(`${API_URL}/${id}`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async deleteProjectStatusById(postId) {
        return axios.delete(`${API_URL}/${postId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

}

export default new UserService()