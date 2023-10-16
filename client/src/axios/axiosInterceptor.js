import axios from "axios";
import { baseUrl } from "../axios/const";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add the token to the request headers
    const ssData = JSON.parse(localStorage.getItem("snapsync"));
    const authToken = ssData?.token;
    if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    // Handle request errors
    console.log("axios error");
    return Promise.reject(error);
  }
);

// ... Rest of the code

export default axiosInstance;
