import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useHandleMedia from "../../hooks/useHandleMedia";
import { UserActionContext } from "../../services/providers/UserActionContext";
import { animationTransition, animationVariants } from "../../utils/const";
import InputField from "../uiPrimitives/fields/InputField";
import TextField from "../uiPrimitives/fields/TextField";
import PortalModal from "../uiPrimitives/modal/PortalModal";
import CreatePostIcon from "../../assets/svg/CreatePostIcon";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function AddPost() {
  const { posts, userData, addPost, setAddPost, isEditPost, setIsEditPost } =
    useContext(UserActionContext);
  const { media, setMedia, handleMedia, handleUploadPost, handleImageRemove } =
    useHandleMedia();
  const postFormik = useFormik({
    initialValues: {
      caption: "",
      location: "",
    },
    onSubmit: (values) => {
      handleUploadPost(values);
    },
  });

  useEffect(() => {
    if (isEditPost) {
      const postDetails = posts.filter((post) => post._id == isEditPost);
      postFormik.initialValues._id = postDetails[0]._id;
      postFormik.initialValues.caption = postDetails[0].caption;
      postFormik.initialValues.location = postDetails[0].location;
      if (postDetails) {
        const data = postFormik.files.map((file, index) => {
          const selectedMedia = file;
          if (selectedMedia) {
            const mediaType = selectedMedia.fileType;
            if (mediaType.startsWith("image/")) {
              const imageURL = selectedMedia.fileUrl;
              return (
                <div className=" min-w-[340px] max-w-[340px] lg:min-w-[580px] lg:max-w-[580px] divide-x">
                  <img
                    key={index}
                    src={imageURL}
                    alt="Selected Image"
                    className="object-fit lg:w-full lg:h-full h-full flex items-center"
                  />
                </div>
              );
            } else if (mediaType.startsWith("video/")) {
              const videoURL = selectedMedia.fileUrl;
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
        });
        setMedia(data);
      }
    }
    return () => {
      setIsEditPost(null);
    };
  }, []);

  const itemref = useRef(null);
  const [itemNo, setItemNo] = useState(0);

  const handleScrollz = (scrollOffset) => {
    if (itemref.current) {
      itemref.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
    if (scrollOffset === 480 && itemNo < media.length - 1) {
      setItemNo((prev) => prev + 1);
    } else if (scrollOffset === -480 && itemNo > 0) {
      setItemNo((prev) => prev - 1);
    }
  };

  if (!addPost) return null;
  return (
    <PortalModal show={addPost}>
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden backdrop-blur-sm">
        <div className="fixed inset-0" onClick={() => setAddPost(false)}></div>
        <div className="flex flex-col items-center justify-center h-[70%] lg:w-[60%] w-[95%] ">
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
                {media && (
                  <button
                    onClick={() => postFormik.submitForm()}
                    className="flex-0 self-start mx-3 text-sm font-semibold text-blue-500">
                    Share
                  </button>
                )}
              </div>
              <div
                id="Line"
                className="border-solid border-[#f4f4f4] self-stretch h-px shrink-0 border-t border-b-0 border-x-0"
              />
            </div>
            <div className="flex flex-col lg:flex-row w-full justify-start h-full relative overflow-y-scroll">
              {!media ? (
                <div className="relative flex flex-col flex-grow  h-full  gap-8 justify-center items-center border-r">
                  <div>
                    <CreatePostIcon />
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
                      multiple={true}
                      onChange={handleMedia}
                      // Add your file input attributes and event handlers here
                    />
                  </div>
                </div>
              ) : (
                <div className="lg:w-full lg:h-full relative flex justify-center bg-black overflow-scroll">
                  <div
                    className="relative flex flex-col items-center w-full"
                    onDoubleClick={() => handleDoubleClick(index, post._id)}
                    onTouchStart={() => handleTouchStart(index, post._id)}>
                    <div
                      className={`flex overflow-scroll items-center w-full relative bg-black  scrollbar-hide`}
                      ref={itemref}>
                      {media.map((med, index) => (
                        <div className="lg:w-full lg:h-full relative flex justify-center">
                          {!isEditPost && (
                            <AiOutlineClose
                              className="absolute  h-5 w-5 text-black right-5 top-3 bg-white rounded-full p-1 shadow-lg cursor-pointer hover:bg-gray-100 z-10"
                              onClick={() => handleImageRemove(index)}
                            />
                          )}
                          {med}
                        </div>
                      ))}
                    </div>
                    {itemNo < media.length - 1 && (
                      <div
                        className="absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointers"
                        onClick={() => handleScrollz(480)}>
                        <FaAngleRight className="w-5 h-5 text-black bg-white rounded-full bg-opacity-60 shadow-md p-0.5 cursor-pointer" />
                      </div>
                    )}
                    {itemNo > 0 && (
                      <div
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointers"
                        onClick={() => handleScrollz(-480)}>
                        <FaAngleLeft className="w-5 h-5 text-black bg-white rounded-full bg-opacity-60 shadow-md p-0.5 cursor-pointer" />
                      </div>
                    )}
                    {media.length > 1 && (
                      <div className="absolute  bottom-2 transform -translate-y-1/2 cursor-pointers flex gap-1">
                        {media.map((item, ind) => (
                          <div
                            className={`h-1.5 w-1.5 rounded-full  ${
                              itemNo == ind ? `bg-white` : `bg-gray-400`
                            }`}></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {media && (
                <>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={animationVariants}
                    transition={animationTransition}
                    className=" lg:w-2/4 w-full">
                    <div className="p-4 flex gap-2">
                      <img
                        src={userData?.imageUrl}
                        className="w-7 h-7 rounded-full"
                        alt=""
                      />
                      <p>{userData?.userName}</p>
                    </div>
                    <TextField
                      rows={5}
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
