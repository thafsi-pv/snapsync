import React from "react";
import { useNavigate } from "react-router-dom";
import useChat from "./useChat";
import useSocialAction from "./useSocialAction";
import useLocalStorage from "./useLocalStorage";
import { tokenName } from "../utils/const";
import { axiosInstance } from "../services/api/axiosInterceptor";
import { LOGIN_API, RESEND_EMAIL_ACTIVATION_API } from "../services/api/const";

function useAuth() {
  const navigate = useNavigate();
  const { socket } = useChat();
  const { userData } = useSocialAction();
  const { setStorage, clearStorage } = useLocalStorage();

  const handleLogIn = async (values) => {
    const result = await axiosInstance.post(LOGIN_API, values);
    console.log("🚀 ~ file: useAuth.jsx:18 ~ handleLogIn ~ result:", result);
    if (result.status === 200) {
      if (result?.data?.isVerified === false) {
        navigateVerification(result.data.emailPhone, result.data._id);
      } else {
        setStorage(tokenName, result.data.accesstoken);
        navigate("/");
      }
    } else {
      alert(result, "failed");
    }
  };

  const handleLogOut = () => {
    if (socket.current) {
      socket.current.emit("logOut", userData?._id);
    }
    clearStorage(tokenName);
    navigate("/auth/login");
  };

  const navigateVerification = (email, id) => {
    navigate("/auth/verifyemail", { state: { email, id } });
  };

  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToLogin = () => {
    // navigate("/auth/login");
    window.location="/auth/login"
  };

  const resendEmailActivation = async (id) => {
    const mailStatus = await axiosInstance.get(
      `${RESEND_EMAIL_ACTIVATION_API}?id=${id}`
    );
    return mailStatus;
  };

  return {
    handleLogIn,
    handleLogOut,
    navigateToHome,
    navigateToLogin,
    resendEmailActivation,
  };
}

export default useAuth;
