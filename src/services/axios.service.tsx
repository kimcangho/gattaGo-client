import axios from "axios";

const baseURLAPI = "http://localhost:8888";
const baseURLAuth = "http://localhost:7777";

//  Public API requests
export default axios.create({
  baseURL: baseURLAPI,
});


//  Private API requests - send authorization header with access token
export const axiosPrivate = axios.create({
    baseURL: baseURLAPI,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

//  Auth server requests
export const axiosAuth = axios.create({
  baseURL: baseURLAuth,
});
