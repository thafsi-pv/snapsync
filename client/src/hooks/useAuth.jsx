import React from "react";
import { useNavigate } from "react-router-dom";
import useChat from "./useChat";
import useSocialAction from "./useSocialAction";
import useLocalStorage from "./useLocalStorage";
import { tokenName } from "../utils/const";
import { axiosInstance } from "../services/api/axiosInterceptor";
import { LOGIN_API } from "../services/api/const";

function useAuth() {
  const navigate = useNavigate();
  const { connectSocket, socket } = useChat();
  const { userData } = useSocialAction();
  const { setStorage, clearStorage } = useLocalStorage();

  const handleLogIn = async (values) => {
    const result = await axiosInstance.post(LOGIN_API, values);
    if (result.status === 200) {
      setStorage(tokenName, result.data.accesstoken);
      navigate("/");
      
      // connectSocket(result.data.accesstoken); // Connect to the socket only on successful login
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

  return { handleLogIn, handleLogOut };
}

export default useAuth;
