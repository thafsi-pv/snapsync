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
  const [file, setFile] = useState((prev) => prev);

  const handleMedia = (fileArray, isEdit) => {
    // const files = e.target.files;
    // const fileArray = Array.from(files);
    setFile(fileArray);
    const data = fileArray.map((file, index) => {
      const selectedMedia = file;
      if (selectedMedia) {
        const mediaType = !isEdit
          ? selectedMedia?.type
          : selectedMedia?.fileType;
        const fileUrl = !isEdit
          ? URL.createObjectURL(selectedMedia)
          : selectedMedia.fileUrl;
        if (mediaType.startsWith("image/")) {
          return (
            <div className="min-w-[340px] max-w-[340px] lg:min-w-[580px] lg:max-w-[580px] divide-x">
              <img
                key={index}
                src={fileUrl}
                alt="Selected Image"
                className="object-fit lg:w-full lg:h-full h-full flex items-center"
              />
            </div>
          );
        } else if (mediaType.startsWith("video/")) {
          return (
            <div className=" min-w-[340px] max-w-[340px] lg:min-w-[580px] lg:max-w-[580px] divide-x">
              <video
                key={index}
                src={fileUrl}
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

  const handleImageRemove = (i) => {
    const filterList = file.filter((item, index) => index != i);
    setFile(filterList);
    const mediaList = media.filter((item, index) => index != i);
    setMedia(mediaList.length > 0 ? mediaList : null);
  };

  const handleUploadPost = async (values) => {
    try {
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
      // if (values._id) {
      const uploadStatus = handleSavePost(values, files);
      setUploadStatus(uploadStatus);
      //setPage(0);
      //getAllPosts();
      // }
    } catch (error) {
      console.log(
        "🚀 ~ file: useHandleMedia.jsx:127 ~ handleUploadPost ~ error:",
        error
      );
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

  const handleScrollz = (scrollOffset, itemref, itemNo, setItemNo) => {
    if (itemref.current) {
      itemref.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
    if (scrollOffset === 480 && itemNo < media.length - 1) {
      setItemNo((prev) => prev + 1);
    } else if (scrollOffset === -480 && itemNo > 0) {
      setItemNo((prev) => prev - 1);
    }
  };

  return {
    media,
    setMedia,
    file,
    setFile,
    handleMedia,
    handleUploadPost,
    handleImageRemove,
    handleScrollz,
  };
}

export default useHandleMedia;
