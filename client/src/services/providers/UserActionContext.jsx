import React, { createContext, useEffect, useRef, useState } from "react";
import useChat from "../../hooks/useChat";
import { GET_USER_DATA, socketBaseUrl } from "../api/const";
import useLocalStorage from "../../hooks/useLocalStorage";
import { tokenName } from "../../utils/const";
import io from "socket.io-client";
import { axiosInstance } from "../api/axiosInterceptor";

export const UserActionContext = createContext(null);

function UserActionContextProvider({ children }) {
  console.log("user action context---rendered");
  // const { getStorage } = useLocalStorage();
  const [userData, setUserData] = useState();
  const [addPost, setAddPost] = useState(false);
  const [comments, setComments] = useState(false);
  const [postId, setPostId] = useState(null);
  const [navbar, setNavbar] = useState("block");
  const [addStory, setAddStory] = useState(false);
  const [loadStory, setLoadStory] = useState({ loading: false, id: "" });
  const [searchBar, setSearchBar] = useState(false);
  const [notificationBar, setNotificationBar] = useState(false);
  const [share, setShare] = useState(false);
  const [more, setMore] = useState(false);

  const userDataRef = useRef();
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const token = localStorage.getItem("ssaccesstoken");
    console.log("🚀 ~ #############token:", token);
    const response = await axiosInstance.get(GET_USER_DATA);
    setUserData(response?.data);
    userDataRef.current = response.data;
  };

  return (
    <UserActionContext.Provider
      value={{
        userData,
        userDataRef,
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
        searchBar,
        setSearchBar,
        notificationBar,
        setNotificationBar,
        share,
        setShare,
        more,
        setMore,
      }}>
      {children}
    </UserActionContext.Provider>
  );
}

export default UserActionContextProvider;
