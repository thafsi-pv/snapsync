import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CreatePost from "../../../assets/svg/createPost";
import { AiOutlineClose } from "react-icons/ai";
import PortalModal from "../../../components/modal/PortalModal";
import { UserActionContext } from "../../../context/UserActionContext";
import TextField from "../../../components/fields/TextField";
import InputField from "../../../components/fields/InputField";
import { motion } from "framer-motion";
import handleUploadMedia from "../../../utils/uploasMedia";
import { useFormik } from "formik";
import { axiosInstance } from "../../../axios/axiosInterceptor";
import { POST_API } from "../../../axios/const";
import useUploadMedia from "../../../hooks/useUploadMedia";
import { FileUploadContext } from "../../../context/FileUploadContext";

function AddPost({ show, closeModal }) {
  const { setUploadProgress } = useContext(FileUploadContext);
  const { userData, addPost, setAddPost } = useContext(UserActionContext);
  const { uploadFileToCloudinary, uploadProgress } = useUploadMedia();

  const [media, setMedia] = useState();
  const [file, setFile] = useState();

  setUploadProgress(uploadProgress);

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
            className="object-fit w-full h-full"
          />
        );
      } else if (mediaType.startsWith("video/")) {
        const videoURL = URL.createObjectURL(selectedMedia);
        setMedia(
          <video src={videoURL} controls className="object-fit w-full h-full" />
        );
      }
    }
  };

  const handleImageRemove = () => {
    setMedia(null);
  };

  const handleSharPost = async (values) => {
    // const mediaUrl = await handleUploadMedia(file);
    setAddPost(false);
    let fileUrl = null;
    if (file) {
      fileUrl = await uploadFileToCloudinary(file);
    }
    if (fileUrl) {
      handleSavePost(values, fileUrl);
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
      setUploadProgress(0);
      setMedia(null);
      setFile(null);
    }
  };

  const postFormik = useFormik({
    initialValues: {
      caption: "",
      location: "",
    },
    //validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      console.log("🚀 ~ file: AddPost.jsx:62 ~ AddPost ~ values:", values);

      handleSharPost(values);
    },
  });

  const animationVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  const animationTransition = {
    type: "smooth",
    duration: 0.4,
  };

  if (!addPost) return null;
  return (
    <PortalModal show={addPost}>
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden backdrop-blur-sm">
        <div
          className="fixed inset-0 bg-black opacity-50 "
          onClick={() => setAddPost(false)}></div>
        <div className="flex flex-col items-center justify-center h-[70%] w-[60%] ">
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setAddPost(false)}>
            <AiOutlineClose className="h-6 w-6 text-white" />
          </div>
          <div className="bg-white w-full h-full relative flex flex-col justify-stretch  overflow-hidden items-stretch pt-4 pb- rounded-[20px]">
            <div className="self-stretch relative flex flex-col flex-grow-0 mr-px   shrink-0 items-center">
              <div className="flex w-full">
                <div className="flex-1 text-lg text-center font-semibold">
                  Create new post
                </div>
                <button
                  onClick={() => postFormik.submitForm()}
                  className="flex-0 self-start mx-3 text-sm font-semibold text-blue-500">
                  Share
                </button>
              </div>
              <div
                id="Line"
                className="border-solid border-[#f4f4f4] self-stretch h-px shrink-0 border-t border-b-0 border-x-0"
              />
            </div>
            <div className="flex w-full justify-start h-full relative">
              {!media ? (
                <div className="relative flex flex-col flex-grow  h-full  gap-8 justify-center items-center border-r">
                  <div>
                    <CreatePost />
                  </div>
                  <div className="text-xl  text-[#808080] mr-2">
                    Drag photos and videos here
                  </div>
                  <div className="bg-[#0095f6] self-center flex flex-col justify-center w-[213px] h-10 items-center rounded-lg text-white cursor-pointer">
                    <label htmlFor="fileInput" className="cursor-pointer">
                      Select from computer
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      name="file"
                      accept="image/*,video/*"
                      onChange={handleMedia}
                      // Add your file input attributes and event handlers here
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <AiOutlineClose
                    className="absolute  h-5 w-5 text-black right-5 top-3 bg-white rounded-full p-1 shadow-lg cursor-pointer hover:bg-gray-100 z-10"
                    onClick={handleImageRemove}
                  />
                  {media}
                </div>
              )}
              {media && (
                <>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={animationVariants}
                    transition={animationTransition}
                    className=" w-2/4">
                    <div className="p-4 flex gap-2">
                      <img
                        src={userData.imageUrl}
                        className="w-7 h-7 rounded-full"
                        alt=""
                      />
                      <p>{userData.userName}</p>
                    </div>
                    <TextField
                      rows={8}
                      placeholder="Write a caption"
                      inputClass="border-none"
                      id="caption"
                      name="caption"
                      onChange={postFormik.handleChange}
                      onBlur={postFormik.handleBlur}
                      value={postFormik.values.caption}
                    />
                    <InputField
                      placeholder="Enter Location"
                      id="location"
                      name="location"
                      onChange={postFormik.handleChange}
                      onBlur={postFormik.handleBlur}
                      value={postFormik.values.location}
                    />
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalModal>
  );
}

export default AddPost;
