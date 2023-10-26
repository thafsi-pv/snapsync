import React, { useEffect, useState } from "react";
import PortalModal from "../../../components/modal/PortalModal";
import InputField from "../../../components/fields/InputField";
import { FiMoreHorizontal } from "react-icons/fi";
import { useFormik } from "formik";
import { COMMENT_API } from "../../../axios/const";
import { axiosInstance } from "../../../axios/axiosInterceptor";
import PostFile from "../../../components/post/PostFile";
import { timeAgo } from "../../../utils/timeAgo";

function Comments({ show, closeModal, postId }) {
  const [postDetails, setPostDetails] = useState();
  console.log(
    "🚀 ~ file: Comments.jsx:11 ~ Comments ~ postDetails:",
    postDetails
  );

  useEffect(() => {
    if (show) {
      getCommentsByPostId();
    }
  }, [show]);

  const getCommentsByPostId = async () => {
    const comments = await axiosInstance.get(
      `${COMMENT_API}?post_id=${postId}`
    );
    console.log(
      "🚀 ~ file: Comments.jsx:16 ~ getCommentsByPostId ~ comments:",
      comments
    );
    setPostDetails(comments.data[0]);
  };

  const commentFormik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => {
      console.log("🚀 ~ file: AddPost.jsx:62 ~ AddPost ~ values:", values);
      handleAddComment(values);
    },
  });

  const handleAddComment = async (values) => {
    const data = { post_id: postId, comment: values.comment };
    const createdPost = await axiosInstance.post(COMMENT_API, data);
  };

  if (!show) return null;
  return (
    <PortalModal show={show}>
      <div className="fixed  flex items-center justify-center w-[80%] h-full overflow-hidden ">
        <div
          className="fixed inset-0 bg-black opacity-50 "
          onClick={closeModal}></div>
        <div className="shadow-[0px_0px_15px_0px_rgba(0,_0,_0,_0.25)]  w-4/5 h-[80%] bg-white  flex z-10  rounded">
          <div className="w-3/5 h-full">
            <PostFile
              media_type={postDetails?.media_type}
              media_url={postDetails?.media_url}
            />
          </div>
          <div className="p-4 w-2/5 h-full flex flex-col justify-between ">
            <div className="flex flex-row h-full justify-between items-start ">
              <div className="flex flex-col gap-4 w-full items-start">
                <div className="bg-cover flex w-full items-center p-1 gap-3 border-b">
                  <img
                    src={postDetails?.user[0].imageUrl}
                    className="w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">
                      {postDetails?.user[0].fullName}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between  w-5 shrink-0 items-start">
                    <FiMoreHorizontal className="w-8 h-8" />
                  </div>
                </div>
                <div className=" flex flex-col gap-4  items-start overflow-y-auto w-full h-72 bg-green-300">
                  {postDetails?.comments?.map((cmt) => (
                    <div className="bg-cover flex w-full items-start p-1 gap-3">
                      <img
                        src={cmt.user.imageUrl}
                        className="w-10 rounded-full"
                      />
                      <div>
                        <div className=" flex flex-wrap  items-start  text-sm">
                          <span className=" font-semibold text-[#262626]">
                            {cmt.user?.fullName} {"  "}
                          </span>
                          {cmt.comment}
                        </div>
                        <span className="text-xs text-gray-400">
                          {timeAgo(cmt.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-start mx-px w-full ">
              <div className="flex flex-col mt-px gap-8 items-start w-full">
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex flex-row ml-1 gap-6 items-start  w-full">
                    <img
                      src="https://file.rendit.io/n/KPc56gwGRYr6L0IST5t6.svg"
                      className="mt-px w-6 shrink-0"
                    />
                    <img
                      src="https://file.rendit.io/n/2ojGnkou9SjgxNjbxFKw.svg"
                      className="mr-px w-6 shrink-0"
                    />
                    <img
                      src="https://file.rendit.io/n/5qjbxZc2qX75hQkoeJkP.svg"
                      className="mt-px w-6 shrink-0"
                    />
                    <div className="w-full flex-1 flex justify-end">
                      <img
                        src="https://file.rendit.io/n/ZBptTs4cywonhTOHsg0y.svg"
                        className="ml-1 w-8"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mr-6 gap-1 items-start">
                    <div className="text-base font-['Microsoft_Sans_Serif']">
                      {postDetails?.likeCount} likes
                    </div>
                    <div className="text-xs text-gray-400">
                     {timeAgo(postDetails?.createdAt)}
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={commentFormik.handleSubmit}
                  className="flex flex-row ml-1 gap-5 w-full  items-center border-t">
                  <img
                    src="https://file.rendit.io/n/sW1YVBq1yktiO0tHe8fZ.svg"
                    className="w-6 shrink-0"
                  />
                  <div className=" w-full h-full">
                    <InputField
                      placeholder="Add a comment"
                      extra="border-none bg-white"
                      inputClass="border-none "
                      className="h-full"
                      id="comment"
                      name="comment"
                      onChange={commentFormik.handleChange}
                      onBlur={commentFormik.handleBlur}
                      value={commentFormik.values.comment}
                    />
                  </div>
                  {commentFormik.values.comment && (
                    <button
                      type="submit"
                      className="font-semibold text-[#149df7]">
                      Post
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalModal>
  );
}

export default Comments;