import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { socketBaseUrl } from "../axios/const";
import { useNavigate } from "react-router-dom";

function useChat(shouldConnect = false) {
  const navigate = useNavigate(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on("forceDisconnect", (reason) => {
        // Handle the forced disconnection here
        console.log(`Forced disconnection: ${reason}`);
        // You can also redirect the user or show a message
        // For example, you can use React Router to navigate to a different page
        // history.push('/login');
        navigate("/auth/login");
      });

      // Clean up the event listener when the component unmounts
      return () => {
        socket.off("forceDisconnect");
      };
    }
  }, [socket]);
  //   useEffect(() => {
  //     if (shouldConnect) {
  //       const newSoket = io(socketBaseUrl);
  //       setSocket(newSoket);
  //       return () => {
  //         newSoket.disconnect();
  //       };
  //     }
  //   }, [shouldConnect]);

  const connectSocket = (token) => {
    console.log("🚀 ~ file: useChat.jsx:19 ~ connectSocket ~ token:", token);
    const newSocket = io(`${socketBaseUrl}?token=${token}`);
    setSocket(newSocket);
  };

  return { socket, connectSocket };
}

export default useChat;
