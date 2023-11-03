import React, { createContext, useEffect, useState } from "react";
import useChat from "../hooks/useChat";
import useLocalStorage from "../hooks/useLocalStorage";
import { tokenName } from "../utils/const";
import { socketBaseUrl } from "../axios/const";
import { io } from "socket.io-client";
import { genericError } from "../axios/genericError";
import { getIdFromUrl } from "../utils/getIdFromUrl";

export const SocketContext = createContext(null);

function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    if (socket) {
      socket.on("private message", ({ _id, sender, message }) => {
        
        console.log(
          "🚀 ~ file: SocketContext.jsx:36 ~ socket.on ~ sender:",
          sender
        );

        const currentURL = window.location.href;
        console.log("🚀 ~ file: SocketContext.jsx:43 ~ socket.on ~ currentURL:", currentURL)
        const id = getIdFromUrl(currentURL);

        console.log("🚀 ~ file: SocketContext.jsx:42 ~ socket.on ~ id:", id);

        if (id != sender) {
          console.log(
            "🚀 ~ file: SocketContext.jsx:41 ~ socket.on ~ _id:",
            _id
          );

          socket.emit("isReadUpdata", { _id, flag: false });
        }
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: sender, message: message },
        ]);
      });
    }
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socket, setSocket, messages, setMessages }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
