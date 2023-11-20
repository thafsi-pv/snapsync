import React, { useContext, useState } from "react";
import { axiosInstance } from "../services/api/axiosInterceptor";
import { CREATE_NOTIFICATION } from "../services/api/const";
import { SocketContext } from "../services/providers/SocketContext";

function useNotification() {
  const [notification, setNotification] = useState();
  const { socket } = useContext(SocketContext);

  const createNotification = async (type, recipient_Id, post_Id) => {
    const data = { type, recipient_Id, post_Id };
    const response = await axiosInstance.post(CREATE_NOTIFICATION, data);
    console.log("notification-------");
    socket.emit("notification", data);
    socket.on("notification", () => {
      console.log("notification");
    });
    return response;
  };

  return { createNotification, notification };
}

export default useNotification;
