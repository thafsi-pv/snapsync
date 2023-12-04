import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useChat from "../../hooks/useChat";
import useLocalStorage from "../../hooks/useLocalStorage";
import { tokenName } from "../../utils/const";
import { socketBaseUrl } from "../api/const";
import { io } from "socket.io-client";
import { genericError } from "../api/genericError";
import { getIdFromUrl } from "../../utils/getIdFromUrl";
import { UserActionContext } from "./UserActionContext";

export const SocketContext = createContext(null);

function SocketContextProvider({ children }) {
  // const [socket, setSocket] = useState();
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessageNotif, setNewMessageNotif] = useState([]);

  //const { connectSocket } = useChat();
  const { getStorage } = useLocalStorage();

  useLayoutEffect(() => {
    const token = getStorage(tokenName);
    if (token) {
      const newSocket = io(`${socketBaseUrl}?token=${token}`);
      // setSocket(newSocket);
      if (newSocket) {
        // setSocket(newSocket);
        socket.current = newSocket;
      } else {
        const error = { response: { status: 401 } };
        genericError(error);
      }
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.current.on("private message", ({ _id, sender, message, messageType }) => {
        const currentURL = window.location.href;
        const id = getIdFromUrl(currentURL);
        if (id != sender) {
          socket.current.emit("isReadUpdata", { _id, flag: false });
          setNewMessageNotif((prev) => [...prev, _id]);
        } else {
          let text = {};
          if (messageType == "TextMessage") {
            text = { text: message };
          } else {
            text = message;
          }
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, message: text, messageType },
          ]);
        }
      });
    }
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        // setSocket,
        messages,
        setMessages,
        newMessageNotif,
        setNewMessageNotif
      }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
