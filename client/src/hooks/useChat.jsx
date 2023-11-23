import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { socketBaseUrl } from "../services/api/const";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../services/providers/SocketContext";
import { UserActionContext } from "../services/providers/UserActionContext";

function useChat(shouldConnect = false) {
  const { userData } = useContext(UserActionContext);
  const { socket, setMessages } = useContext(SocketContext);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("forceDisconnect", (reason) => {
  //       // Handle the forced disconnection here
  //       console.log(`Forced disconnection: ${reason}`);
  //       // You can also redirect the user or show a message
  //       // For example, you can use React Router to navigate to a different page
  //       // history.push('/login');
  //       // navigate("/auth/login");
  //     });

  //     // Clean up the event listener when the component unmounts
  //     return () => {
  //       socket.off("forceDisconnect");
  //     };
  //   }
  // }, [socket]);

  function sendMessage(recipientId, message, messageType) {
    if (recipientId && message) {
      socket.emit("private message", {
        sender: userData._id,
        recipient: recipientId,
        messageType,
        message,
      });

      if (messageType == "TextMessage") {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            // sender: userData._id,
            sender: { _id: userData._id },
            recipient: recipientId,
            message: { text: message },
            messageType,
          },
        ]);
      }
    }
  }

  // const connectSocket = (token) => {
  //   const newSocket = io(`${socketBaseUrl}?token=${token}`);
  //   setSocket(newSocket);
  // };

  return { sendMessage };
}

export default useChat;
