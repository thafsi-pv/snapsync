import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { socketBaseUrl } from "../axios/const";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

function useChat(shouldConnect = false) {
  // const navigate = useNavigate(null);
  // const [socket, setSocket] = useState(null);
  const { socket, setSocket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("forceDisconnect", (reason) => {
        // Handle the forced disconnection here
        console.log(`Forced disconnection: ${reason}`);
        // You can also redirect the user or show a message
        // For example, you can use React Router to navigate to a different page
        // history.push('/login');
        // navigate("/auth/login");
      });

      // Clean up the event listener when the component unmounts
      return () => {
        socket.off("forceDisconnect");
      };
    }
  }, [socket]);

  const connectSocket = (token) => {
    const newSocket = io(`${socketBaseUrl}?token=${token}`);
    setSocket(newSocket);
  };

  return { socket, connectSocket };
}

export default useChat;