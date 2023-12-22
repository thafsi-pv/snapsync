import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../services/api/axiosInterceptor";
import { NOTIFICATION } from "../services/api/const";
import { SocketContext } from "../services/providers/SocketContext";
import { UserActionContext } from "../services/providers/UserActionContext";

function useNotification() {
  const { socket } = useContext(SocketContext);
  const [notificationList, setNotificationList] = useState([]); //all notification list
  const [notification, setNotification] = useState([]); //notification count
  const { setNavbar, setNotificationBar, navbar, notificationBar } =
    useContext(UserActionContext);

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
    socket.current.emit("notification", data);

    return response;
  };

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    const response = await axiosInstance.get(NOTIFICATION);
    const arrayOfKeyValueObjects = Object.entries(response.data[0]).map(
      ([key, value]) => ({ key, value })
    );
    setNotificationList(arrayOfKeyValueObjects);
  };

  //when click notification handle notification side modal
  const handleNotiBar = () => {
    setNotificationBar(false);
    const currentURL = window.location.href;
    const id = getIdFromUrl(currentURL);
    if (id != "inbox") {
      setNavbar("block");
    }
  };

  return {
    createNotification,
    notification,
    notificationList,
    handleNotiBar,
    setNavbar,
    setNotificationBar,
    navbar,
    notificationBar,
  };
}

export default useNotification;
