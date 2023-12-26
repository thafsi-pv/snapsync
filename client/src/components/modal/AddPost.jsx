import { useFormik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useHandleMedia from "../../hooks/useHandleMedia";
import { UserActionContext } from "../../services/providers/UserActionContext";
import PortalModal from "../uiPrimitives/modal/PortalModal";
import AddPostInputs from "./components/AddPostInputs";
import SelectFileButton from "./components/SelectFileButton";
import SelectedFiles from "./components/SelectedFiles";

function AddPost() {
  const itemref = useRef(null); //ref using for scroll
  const [itemNo, setItemNo] = useState(0); //state for current active i
  const { posts, addPost, setAddPost, isEditPost, setIsEditPost } =
    useContext(UserActionContext);
    
  const { media, handleMedia, handleUploadPost, handleImageRemove } =
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
        handleMedia(postDetails[0].files, true);
      }
    }
    return () => {
      setIsEditPost(null);
    };
  }, []);

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
                <SelectFileButton handleMedia={handleMedia} />
              ) : (
                <SelectedFiles
                  media={media}
                  itemref={itemref}
                  itemNo={itemNo}
                  setItemNo={setItemNo}
                  isEditPost={isEditPost}
                  handleImageRemove={handleImageRemove}
                />
              )}
              {media && <AddPostInputs postFormik={postFormik} />}
            </div>
          </div>
        </div>
      </div>
    </PortalModal>
  );
}

export default AddPost;
