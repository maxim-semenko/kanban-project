import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/tickets"
const cookies = new Cookies();

class TicketService {

    async getAllPriorities(page = 0, size = 0,) {
        return axios.get(`${API_URL}/priorities`, {
            params: {
                sort: 'id,asc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getAllTicketsByProjectId(projectId, page = 0, size = 0,) {
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

    async getAllTicketsByUserId(userId, page = 0, size = 0,) {
        console.log("getAllTicketsByUserId")
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

    async getTicketById(id) {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async createTicket(request) {
        return axios.post(`${API_URL}/`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async updateTicketById(request, id) {
        return axios.put(`${API_URL}/${id}`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async updateTicketProjectStatusById(request, id) {
        return axios.patch(`${API_URL}/${id}/project-status`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async deleteTicketById(id) {
        return axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async addUserToTicketByTicketIdAndUserId(ticketId, userId) {
        return axios.put(`${API_URL}/${ticketId}/users/${userId}`, null, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async removeUserFromTicketByTicketIdAndUserId(ticketId, userId) {
        return axios.delete(`${API_URL}/${ticketId}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

}

export default new TicketService()