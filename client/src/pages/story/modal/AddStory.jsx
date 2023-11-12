import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import CreatePost from "../../../assets/svg/createPost";
import useUploadMedia from "../../../hooks/useUploadMedia";
import { UserActionContext } from "../../../services/providers/UserActionContext";
import { FileUploadContext } from "../../../services/providers/FileUploadContext";
import { STORY_API } from "../../../services/api/const";
import { axiosInstance } from "../../../services/api/axiosInterceptor";
import PortalModal from "../../../components/uiPrimitives/modal/PortalModal";

function AddStory() {
  const { addStory, setAddStory } = useContext(UserActionContext);

  const { setUploadProgress } = useContext(FileUploadContext);
  const { uploadFileToCloudinary, uploadProgress } = useUploadMedia();

  const [media, setMedia] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    setUploadProgress(uploadProgress);
  }, [uploadProgress]);

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
            className="object-cover w-full h-full"
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
    setAddStory(false);
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
      mediaUrl: fileUrl,
      media_type: file.type,
    };

    const createdPost = await axiosInstance.post(STORY_API, post);
    if (createdPost.status === 200) {
      // setUploadProgress(0);
      setMedia(null);
      setFile(null);
    }
  };

  if (!addStory) return null;
  return (
    <PortalModal show={addStory}>
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden backdrop-blur-sm ">
        <div
          className="fixed inset-0 bg-black opacity-50 "
          onClick={() => setAddStory(false)}></div>
        <div className="flex flex-col items-center justify-center h-[90%] w-[30%] ">
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setAddStory(false)}>
            <AiOutlineClose className="h-6 w-6 text-white" />
          </div>
          <div className="bg-white w-full h-full relative flex flex-col justify-stretch  overflow-hidden items-stretch pt-4 pb- rounded-[20px]">
            <div className="self-stretch relative flex flex-col flex-grow-0 mr-px   shrink-0 items-center">
              <div className="flex w-full">
                <div className="flex-1 text-lg text-center font-semibold">
                  Create new story
                </div>
                <button
                  onClick={() => handleSharPost()}
                  className="flex-0 self-start mx-3 text-sm font-semibold text-blue-500">
                  Share
                </button>
              </div>
              <div
                id="Line"
                className="border-solid border-[#f4f4f4] self-stretch h-px shrink-0 border-t border-b-0 border-x-0"
              />
            </div>
            <div className="flex w-full justify-start h-full relative ">
              {!media ? (
                <div className="relative flex flex-col flex-grow  h-full  gap-8 justify-center items-center border-r ">
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
                <div className="w-full h-full relative bg-black">
                  <AiOutlineClose
                    className="absolute  h-5 w-5 text-black right-5 top-3 bg-white rounded-full p-1 shadow-lg cursor-pointer hover:bg-gray-100 z-10"
                    onClick={handleImageRemove}
                  />
                  {media}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalModal>
  );
}

export default AddStory;
