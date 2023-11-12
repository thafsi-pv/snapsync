import axios from "axios";
import React, { useEffect, useState } from "react";
import { CLOUDINARY_IMAGE_UPLOAD_URL, CLOUDINARY_VIDEO_UPLOAD_URL } from "../services/api/const";


const useUploadMedia = () => {
  const [uploadedUrl, setUploadedUrl] = useState();
  const [uploadProgress, setUploadProgress] = useState();
  const [fileSize, setFileSize] = useState(0);

  const uploadFileToCloudinary = async (file) => {
    setFileSize(file.size / (1024 * 1024));
    const formData = new FormData();
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    formData.append("file", file);

    var cloudinaryUrl = "";
    if (file.type.startsWith("image/")) {
      cloudinaryUrl = CLOUDINARY_IMAGE_UPLOAD_URL;
    } else if (file.type.startsWith("video/")) {
      cloudinaryUrl = CLOUDINARY_VIDEO_UPLOAD_URL;
    }

    try {
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: false,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      const responseData = response.data;
      return responseData.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    return () => {
      setUploadProgress(0);
      setUploadedUrl(null);
    };
  }, []);

  return { uploadFileToCloudinary, uploadedUrl, uploadProgress, fileSize };
};

export default useUploadMedia;
