import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertimage = payload => api.post(`/images`, payload)
export const getimage = () => api.get(`/images`)

const apis = {
    insertimage,
    getimage,
}

export default apis;