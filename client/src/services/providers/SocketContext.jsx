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
