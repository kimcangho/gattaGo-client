import axios from "axios";

const baseURL = "http://localhost:8888";

//  Public API requests
export default axios.create({
  baseURL,
});

//  Private API requests - send authorization header with access token
export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//  Auth server requests
export const axiosAuth = axios.create({
  baseURL,
});
