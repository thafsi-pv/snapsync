import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { socketBaseUrl } from "../axios/const";

function useChat(shouldConnect = false) {
  const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (shouldConnect) {
//       const newSoket = io(socketBaseUrl);
//       setSocket(newSoket);
//       return () => {
//         newSoket.disconnect();
//       };
//     }
//   }, [shouldConnect]);

  const connectSocket = () => {
    const newSocket = io(socketBaseUrl);
    setSocket(newSocket);
  };

  return { socket, connectSocket };
}

export default useChat;
