import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/auth"
const cookies = new Cookies();

class AuthService {

    // Login user
    async login(request) {
        return axios.post(`${API_URL}/login`, request)
    }

    // Register user
    async register(request) {
        return axios.post(`${API_URL}/register`, request)
    }

    async restorePassword(request) {
        return axios.put(`${API_URL}/restore-password`, request)
    }

    // Get new token
    async getToken(userId) {
        return axios.get(`${API_URL}/token/${userId}`)
    }

    // Logout user
    async logout() {
        cookies.remove("token", {path: "/"})
        localStorage.removeItem("user")
    }
}

export default new AuthService()