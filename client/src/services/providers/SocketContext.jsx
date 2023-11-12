import React, { createContext, useEffect, useState } from "react";
import useChat from "../../hooks/useChat";
import useLocalStorage from "../../hooks/useLocalStorage";
import { tokenName } from "../../utils/const";
import { socketBaseUrl } from "../api/const";
import { io } from "socket.io-client";
import { genericError } from "../api/genericError";
import { getIdFromUrl } from "../../utils/getIdFromUrl";

export const SocketContext = createContext(null);

function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState([]);

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
        const currentURL = window.location.href;
        const id = getIdFromUrl(currentURL);
        if (id != sender) {
          socket.emit("isReadUpdata", { _id, flag: false });
          setNotification((prev) => [...prev, _id]);
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
      value={{ socket, setSocket, messages, setMessages, notification }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
