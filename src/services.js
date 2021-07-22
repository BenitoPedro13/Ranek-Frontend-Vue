import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://www.quantic.digital/'
})

export const api = {
    async get(endpoint, config) {
        return await axiosInstance.get(endpoint, config)
    },
    async post(endpoint, body, config) {
        return await axiosInstance.post(endpoint, body, config)
    },
    async put(endpoint, body, config) {
        return await axiosInstance.put(endpoint, body, config)
    },
    async delete(endpoint, config) {
        return await axiosInstance.delete(endpoint, config)
    }
}

export async function getCep(cep) {
    return await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}