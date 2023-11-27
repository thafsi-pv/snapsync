import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useHandleMedia from "../../hooks/useHandleMedia";
import { UserActionContext } from "../../services/providers/UserActionContext";
import { animationTransition, animationVariants } from "../../utils/const";
import InputField from "../uiPrimitives/fields/InputField";
import TextField from "../uiPrimitives/fields/TextField";
import PortalModal from "../uiPrimitives/modal/PortalModal";
import CreatePostIcon from "../../assets/svg/CreatePostIcon";

function AddPost() {
  const { userData, addPost, setAddPost } = useContext(UserActionContext);
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

  if (!addPost) return null;
  return (
    <PortalModal show={addPost}>
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden backdrop-blur-sm">
        <div
          className="fixed inset-0 bg-black opacity-50 "
          onClick={() => setAddPost(false)}></div>
        <div className="flex flex-col items-center justify-center h-[70%] lg:w-[60%] w-[95%]">
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
            <div className="flex flex-col lg:flex-row w-full justify-start h-full relative">
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
                      onChange={handleMedia}
                      // Add your file input attributes and event handlers here
                    />
                  </div>
                </div>
              ) : (
                <div className="lg:w-full lg:h-full relative flex justify-center bg-black">
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
