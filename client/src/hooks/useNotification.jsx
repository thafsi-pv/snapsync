import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../services/api/axiosInterceptor";
import { NOTIFICATION } from "../services/api/const";
import { SocketContext } from "../services/providers/SocketContext";

function useNotification() {
  const { socket } = useContext(SocketContext);

  const [notification, setNotification] = useState([]);
  console.log(
    "🚀 ~ file: useNotification.jsx:8 ~ useNotification ~ notification:",
    notification
  );

  useEffect(() => {
    if (socket) {
      socket.on("notification", (postdetails) => {
        console.log(
          "🚀 ~ file: useNotification.jsx:16 ~ socket.on ~ postdetails:",
          postdetails
        );
        setNotification((prev) => [...prev, postdetails]);
      });
    }
  }, [socket]);

  const createNotification = async (type, recipient_Id, post_Id) => {
    const data = { type, recipient_Id, post_Id };
    const response = await axiosInstance.post(NOTIFICATION, data);
    console.log("notification-------");
    socket.emit("notification", data);

    return response;
  };

  return { createNotification, notification };
}

export default useNotification;
