import axios from "axios";
import { baseUrl } from "../axios/const";
import { genericError } from "./genericError";

axios.defaults.withCredentials = true;
export const abortController = new AbortController();
const signal = abortController.signal;
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  signal: signal,
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

//Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    console.log("🚀 ~ file: axiosInterceptor.js:34 ~ error:", error);
    //handle error
    genericError(error);
    return error;
  }
);

export default { axiosInstance, abortController };
