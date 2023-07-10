import axios from 'axios'

const baseURL = 'http://localhost:8888'

//  Public requests
export default (axios.create({
    baseURL
}))

//  Private requests
export const axiosPrivate = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})