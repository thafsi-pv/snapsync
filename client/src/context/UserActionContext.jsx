import React, { createContext, useState } from "react";

export const UserActionContext = createContext(null);

function UserActionContextProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [addPost, setAddPost] = useState(false);
  const [comments, setComments] = useState(false);
  const [postId, setPostId] = useState(null);
  const [socket, setSocket] = useState();

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
