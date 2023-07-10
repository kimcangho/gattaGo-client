import axios from "axios";

//  Instantiate axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8888",
  headers: {
    "Content-Type": "application/json",
  },
});

//  Response Interceptor
axiosInstance.interceptors.response.use((res) => {
  console.log("Response Interceptor firing...");
  return res;
});

export { axiosInstance };
