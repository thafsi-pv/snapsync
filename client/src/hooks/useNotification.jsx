import React from "react";
import { axiosInstance } from "../services/api/axiosInterceptor";
import { CREATE_NOTIFICATION } from "../services/api/const";

function useNotification() {
  const createNotification = async (type, recipient_Id, post_Id) => {
    const data = { type, recipient_Id, post_Id };
    const response = await axiosInstance.post(CREATE_NOTIFICATION, data);
    return response;
  };

  return { createNotification };
}

export default useNotification;
