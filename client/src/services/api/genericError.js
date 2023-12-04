import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { tokenName } from "../../utils/const";
import { axiosInstance } from "./axiosInterceptor";
import { ROTATE_REFRESH_TOKEN_API } from "./const";

export const genericError = async (error) => {
  const navigate = useNavigate();
  console.log("🚀 ~ file: genericError.js:5 ~ genericError ~ error:", error);
  if (error.response.status === 401) {
    if (localStorage.getItem(tokenName) != null) {
      localStorage.clear();
      //window.location.href = "/login";

      //access token rotation
      const response = await axiosInstance.get(ROTATE_REFRESH_TOKEN_API);
      localStorage.setItem("ssaccestoken", response.data.accesstoken);
      window.location.reload();
    } else navigate("/auth/login");
    // window.location = "/auth/login";
  } else navigate("/auth/login");
};
