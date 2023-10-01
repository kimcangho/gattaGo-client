import axios from "axios";

// const baseURL = "http://localhost:8888";
const baseURL = "https://gattago-server-b48a665143cc.herokuapp.com/"

//  Public API requests
export default axios.create({ baseURL });

//  Private API requests - send authorization header with access token
export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

//  Auth server requests
export const axiosAuth = axios.create({ baseURL });
