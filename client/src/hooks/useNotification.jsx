import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../services/api/axiosInterceptor";
import { NOTIFICATION } from "../services/api/const";
import { SocketContext } from "../services/providers/SocketContext";

function useNotification() {
  const { socket } = useContext(SocketContext);

  const [notification, setNotification] = useState([]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("notification", (postdetails) => {
        setNotification((prev) => [...prev, postdetails]);
      });
    }
  }, [socket]);

  const createNotification = async (type, recipient_Id, post_Id) => {
    const data = { type, recipient_Id, post_Id };
    const response = await axiosInstance.post(NOTIFICATION, data);
    socket.emit("notification", data);

    return response;
  };

  return { createNotification, notification };
}

export default useNotification;
