import { axiosInstance } from "./axiosInterceptor";
import { ROTATE_REFRESH_TOKEN_API } from "./const";

export const genericError = async (error) => {
  if (error.response.status === 401) {
    localStorage.clear();
    //window.location.href = "/login";

    //access token rotation
    const response = await axiosInstance.get(ROTATE_REFRESH_TOKEN_API);
    localStorage.setItem("ssaccestoken", response.data.accesstoken);
    window.location.reload();
  }
};
