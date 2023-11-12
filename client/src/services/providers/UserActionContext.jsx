import React, { createContext, useEffect, useState } from "react";
import useChat from "../../hooks/useChat";
import { GET_USER_DATA, socketBaseUrl } from "../api/const";
import useLocalStorage from "../../hooks/useLocalStorage";
import { tokenName } from "../../utils/const";
import io from "socket.io-client";
import { axiosInstance } from "../api/axiosInterceptor";

export const UserActionContext = createContext(null);

function UserActionContextProvider({ children }) {
  const { getStorage } = useLocalStorage();
  const [userData, setUserData] = useState(null);
  const [addPost, setAddPost] = useState(false);
  const [comments, setComments] = useState(false);
  const [postId, setPostId] = useState(null);
  const [navbar, setNavbar] = useState("block");
  const [addStory, setAddStory] = useState(false);
  const [loadStory, setLoadStory] = useState({ loading: false, id: "" });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const response = await axiosInstance.get(GET_USER_DATA);
    setUserData(response?.data);
  };

  return (
    <UserActionContext.Provider
      value={{
        userData,
        setUserData,
        addPost,
        setAddPost,
        comments,
        setComments,
        postId,
        setPostId,
        navbar,
        setNavbar,
        addStory,
        setAddStory,
        loadStory,
        setLoadStory,
      }}>
      {children}
    </UserActionContext.Provider>
  );
}

export default UserActionContextProvider;
