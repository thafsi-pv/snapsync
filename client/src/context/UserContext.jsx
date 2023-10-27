import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

function UserContextProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [addPost, setAddPost] = useState(false);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, addPost, setAddPost }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
