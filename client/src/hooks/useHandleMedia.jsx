import React, { useContext, useEffect, useState } from "react";
import { UserActionContext } from "../services/providers/UserActionContext";
import useUploadToCloudinary from "./useUploadToCloudinary";
import { FileUploadContext } from "../services/providers/FileUploadContext";
import { axiosInstance } from "../services/api/axiosInterceptor";
import { POST_API } from "../services/api/const";
import useSocialAction from "./useSocialAction";

function useHandleMedia() {
  const { userData, addPost, setAddPost } = useContext(UserActionContext);
  const { uploadFilesToCloudinary, uploadProgress, fileSize } =
    useUploadToCloudinary();
  const { setUploadProgress, setFileSize, setUploadStatus } =
    useContext(FileUploadContext);

  const { getAllPosts, setPage } = useSocialAction();

  const [media, setMedia] = useState();
  const [file, setFile] = useState();

  // useEffect(() => {
  //   setUploadProgress(uploadProgress);
  //   setFileSize(fileSize);
  // }, [uploadProgress, fileSize]);

  const handleMedia = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setFile(fileArray);
    const data = fileArray.map((file, index) => {
      const selectedMedia = file;
      if (selectedMedia) {
        const mediaType = selectedMedia.type;
        if (mediaType.startsWith("image/")) {
          const imageURL = URL.createObjectURL(selectedMedia);
          return (
            <div className="min-w-[340px] max-w-[340px] lg:min-w-[580px] lg:max-w-[580px] divide-x">
              <img
                key={index}
                src={imageURL}
                alt="Selected Image"
                className="object-fit lg:w-full lg:h-full h-full flex items-center"
              />
            </div>
          );
        } else if (mediaType.startsWith("video/")) {
          const videoURL = URL.createObjectURL(selectedMedia);
          return (
            <div className=" min-w-[340px] max-w-[340px] lg:min-w-[580px] lg:max-w-[580px] divide-x">
              <video
                key={index}
                src={videoURL}
                controls
                className="object-fit lg:w-full lg:h-full w-1/2 h-full"
              />
            </div>
          );
        } else {
          return <div key={index}>Unsupported file type</div>;
        }
      }
      return null;
    });

    console.log("🚀 ~ file: useHandleMedia.jsx:70 ~ data ~ data:", data);
    setMedia(data);
    // Return the data array
  };

  // const handleMedia = (e) => {
  //   const selectedMedia = e.target.files[0];
  //   if (selectedMedia) {
  //     const mediaType = selectedMedia.type;
  //     setFile(selectedMedia);
  //     if (mediaType.startsWith("image/")) {
  //       const imageURL = URL.createObjectURL(selectedMedia);
  //       setMedia(
  //         <img
  //           src={imageURL}
  //           alt="Selected Image"
  //           className="object-contain lg:w-full lg:h-full w-1/2 h-full "
  //         />
  //       );
  //     } else if (mediaType.startsWith("video/")) {
  //       const videoURL = URL.createObjectURL(selectedMedia);
  //       setMedia(
  //         <video
  //           src={videoURL}
  //           controls
  //           className="object-fit lg:w-full lg:h-full  w-1/2 h-full"
  //         />
  //       );
  //     }
  //   }
  // };

  const handleImageRemove = (i) => {
    // setMedia(null);
    const filterList = file.filter((item, index) => index != i);
    setFile(filterList);
    const mediaList = media.filter((item, index) => index != i);
    setMedia(mediaList.length > 0 ? mediaList : null);
    handleMedia();
  };

  const handleUploadPost = async (values) => {
    setAddPost(false);
    setUploadStatus(false);
    setUploadProgress(0);
    let files = null;
    if (!values._id) {
      if (file) {
        files = await uploadFilesToCloudinary(file);
        //values.media_type = file.type;
      }
    } else {
      files = values.files;
    }
    if (values._id) {
      const uploadStatus = handleSavePost(values, files);
      setUploadStatus(uploadStatus);
      //setPage(0);
      //getAllPosts();
    }
  };

  const handleSavePost = async (values, files) => {
    const post = {
      _id: values._id,
      files,
      location: values.location,
      caption: values.caption,
      media_type: values.media_type,
    };

    const createdPost = await axiosInstance.post(POST_API, post);
    if (createdPost.status === 200) {
      setMedia(null);
      setFile(null);
      return true;
    } else return false;
  };

  // const handleUploadPost = async (values) => {
  //   setAddPost(false);
  //   setUploadStatus(false);
  //   setUploadProgress(0);
  //   let fileUrl = null;
  //   if (!values._id) {
  //     if (file) {
  //       fileUrl = await uploadFileToCloudinary(file);
  //       values.media_type = file.type;
  //     }
  //   } else {
  //     fileUrl = values.media_url;
  //   }
  //   if (fileUrl) {
  //     const uploadStatus = handleSavePost(values, fileUrl);
  //     setUploadStatus(uploadStatus);
  //     //setPage(0);
  //     //getAllPosts();
  //   }
  // };

  // const handleSavePost = async (values, fileUrl) => {
  //   const post = {
  //     _id: values._id,
  //     media_url: fileUrl,
  //     location: values.location,
  //     caption: values.caption,
  //     media_type: values.media_type,
  //   };

  //   const createdPost = await axiosInstance.post(POST_API, post);
  //   if (createdPost.status === 200) {
  //     setMedia(null);
  //     setFile(null);
  //     return true;
  //   } else return false;
  // };

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
