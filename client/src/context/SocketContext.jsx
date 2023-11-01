import React, { createContext, useEffect, useState } from "react";
import useChat from "../hooks/useChat";
import useLocalStorage from "../hooks/useLocalStorage";
import { tokenName } from "../utils/const";
import { socketBaseUrl } from "../axios/const";
import { io } from "socket.io-client";
import { genericError } from "../axios/genericError";

export const SocketContext = createContext(null);

function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState();
  //const { connectSocket } = useChat();
  const { getStorage } = useLocalStorage();

  useEffect(() => {
    const token = getStorage(tokenName);
    if (token) {
      const newSocket = io(`${socketBaseUrl}?token=${token}`);
      setSocket(newSocket);
      if (newSocket) {
        setSocket(newSocket);
      } else {
        const error = { response: { status: 401 } };
        genericError(error);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
