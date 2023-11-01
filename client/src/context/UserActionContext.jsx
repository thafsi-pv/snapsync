import React, { createContext, useState } from "react";
import useChat from "../hooks/useChat";
import { socketBaseUrl } from "../axios/const";
import useLocalStorage from "../hooks/useLocalStorage";
import { tokenName } from "../utils/const";
import io from "socket.io-client";

export const UserActionContext = createContext(null);

function UserActionContextProvider({ children }) {
  const { getStorage } = useLocalStorage();
  const [userData, setUserData] = useState(null);
  const [addPost, setAddPost] = useState(false);
  const [comments, setComments] = useState(false);
  const [postId, setPostId] = useState(null);
  const [socket, setSocket] = useState(null);

  if (socket == null && userData != null) {
    const token = getStorage(tokenName);
    const newSocket = io(`${socketBaseUrl}?token=${token}`);
    setSocket(newSocket);
  }
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
        socket,
        setSocket,
      }}>
      {children}
    </UserActionContext.Provider>
  );
}

export default UserActionContextProvider;
