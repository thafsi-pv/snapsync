// axiosInterceptor.js
import axios from "axios";
import store from "../redux/store";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import { baseUrl } from "./const";
import { useSelector } from "react-redux";

export const abortController = new AbortController();
const signal = abortController.signal;
export const useAxiosInterceptor = axios.create({
  baseURL: baseUrl,
  signal: signal,
});

useAxiosInterceptor.interceptors.request.use(
  (config) => {
    store.dispatch(showLoader(true));
    const deData = JSON.parse(localStorage.getItem("DEPOS"));
    const authToken = deData?.DET;
    if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

useAxiosInterceptor.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader());
    return response;
  },
  (error) => {
    store.dispatch(hideLoader());
    return Promise.reject(error);
  }
);

export default { useAxiosInterceptor, abortController };
