import axios from 'axios'

// Base URL of our Spring Boot backend
const API = axios.create({
  baseURL: 'http://localhost:8080/api',
})

// Request interceptor - automatically attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token')

    // If token exists, add it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle token expiry
API.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // If backend returns 401 - token expired or invalid
    if (error.response?.status === 401) {
      // Clear everything from localStorage
      localStorage.clear()
      // Redirect to login page
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default API