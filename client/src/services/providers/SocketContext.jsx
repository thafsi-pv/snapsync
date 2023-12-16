import React, {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { socketBaseUrl } from "../api/const";
import { tokenName } from "../../utils/const";
import { io } from "socket.io-client";
import useChat from "../../hooks/useChat";
import { getIdFromUrl } from "../../utils/getIdFromUrl";

export const SocketContext = createContext(null);

function SocketContextProvider({ children }) {
  // const [socket, setSocket] = useState();
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessageNotif, setNewMessageNotif] = useState(0);

  // const { connectSocket } = useChat();
  // const { getStorage } = useLocalStorage();

  // useLayoutEffect(async () => {
  //   console.log("socket context use effect run....");
  //   if (!socket.current) {
  //     const soket = await connectSocket();
  //     socket.current = soket;
  //   }
  // }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on(
        "private message",
        ({ _id, sender, message, messageType }) => {
          const currentURL = window.location.href;
          const id = getIdFromUrl(currentURL);
          console.log("######---private message");
          if (id != sender) {
            socket.current.emit("isReadUpdata", { _id, flag: false });
            setNewMessageNotif((prev) => prev + 1);
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
        }
      );
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        // setSocket,
        messages,
        setMessages,
        newMessageNotif,
        setNewMessageNotif,
      }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
