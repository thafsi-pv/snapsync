import React, { useContext, useEffect, useState } from "react";
import { UserActionContext } from "../services/providers/UserActionContext";
import useUploadToCloudinary from "./useUploadToCloudinary";
import { FileUploadContext } from "../services/providers/FileUploadContext";
import { axiosInstance } from "../services/api/axiosInterceptor";
import { POST_API } from "../services/api/const";
import useSocialAction from "./useSocialAction";

function useHandleMedia() {
  const { userData, addPost, setAddPost } = useContext(UserActionContext);
  const { uploadFileToCloudinary, uploadProgress, fileSize } =
    useUploadToCloudinary();
  const { setUploadProgress, setFileSize, setUploadStatus } =
    useContext(FileUploadContext);

  const { getAllPosts, setPage } = useSocialAction();

  const [media, setMedia] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    setUploadProgress(uploadProgress);
    setFileSize(fileSize);
  }, [uploadProgress, fileSize]);

  const handleMedia = (e) => {
    const selectedMedia = e.target.files[0];
    if (selectedMedia) {
      const mediaType = selectedMedia.type;
      setFile(selectedMedia);
      if (mediaType.startsWith("image/")) {
        const imageURL = URL.createObjectURL(selectedMedia);
        setMedia(
          <img
            src={imageURL}
            alt="Selected Image"
            className="object-fit lg:w-full lg:h-full w-1/2 h-full "
          />
        );
      } else if (mediaType.startsWith("video/")) {
        const videoURL = URL.createObjectURL(selectedMedia);
        setMedia(
          <video
            src={videoURL}
            controls
            className="object-fit lg:w-full lg:h-full  w-1/2 h-full"
          />
        );
      }
    }
  };

  const handleImageRemove = () => {
    setMedia(null);
  };

  const handleUploadPost = async (values) => {
    setAddPost(false);
    setUploadStatus(false);
    setUploadProgress(0);
    let fileUrl = null;
    if (file) {
      fileUrl = await uploadFileToCloudinary(file);
    }
    if (fileUrl) {
      const uploadStatus = handleSavePost(values, fileUrl);
      setUploadStatus(uploadStatus);
      //setPage(0);
      //getAllPosts();
    }
  };

  const handleSavePost = async (values, fileUrl) => {
    const post = {
      media_url: fileUrl,
      location: values.location,
      caption: values.caption,
      media_type: file.type,
    };

    const createdPost = await axiosInstance.post(POST_API, post);
    if (createdPost.status === 200) {
      setMedia(null);
      setFile(null);
      return true;
    } else return false;
  };

  return {
    media,
    setMedia,
    file,
    setFile,
    handleMedia,
    handleUploadPost,
    handleImageRemove,
  };
}

export default useHandleMedia;
