import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

function UserContextProvider({ children }) {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
