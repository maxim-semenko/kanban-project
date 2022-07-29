import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/tasks"
const cookies = new Cookies();

class TaskService {

    async getAllTasksByProjectId(projectId, page = 0, size = 0, ) {
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

    async getTaskById(id) {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async createTask(request) {
        return axios.post(`${API_URL}/`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async deleteTaskById(id) {
        return axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async updateTaskProjectStatusById(request, id) {
        return axios.patch(`${API_URL}/${id}/project-status`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

}

export default new TaskService()