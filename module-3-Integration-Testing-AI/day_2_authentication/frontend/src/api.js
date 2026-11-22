import { axios } from "axios";
import { config } from "node:process";
const api = axios.create({ baseURL: "http:/localhost/8080/api/v1" })

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token)
        config.headers.Authorization = `bearer ${token}`
    return config
})