import axios from 'axios'

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
  headers
})
const accessToken = localStorage.getItem('accessToken')
api.interceptors.request.use(
  config => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  error => Promise.reject(error)
)
export default api
