import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";
import BookmarkIcon from "../../../assets/svg/BookmarkIcon";
import CommentIcon from "../../../assets/svg/CommentIcon";
import MessageIcon from "../../../assets/svg/MessageIcon";
import PostFile from "../../../components/post/PostFile";
import PortalModal from "../../../components/uiPrimitives/modal/PortalModal";
import { axiosInstance } from "../../../services/api/axiosInterceptor";
import {
  COMMENT_API,
  LIKE_API,
  SAVE_POST_API,
} from "../../../services/api/const";
import { timeAgo } from "../../../utils/timeAgo";
import Comment from "../components/Comment";
import UserImage from "../../../components/user/UserImage";

function Comments({ show, closeModal, postId }) {
  const [postDetails, setPostDetails] = useState();
  console.log(
    "🚀 ~ file: Comments.jsx:22 ~ Comments ~ postDetails:",
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
    setPostDetails(comments.data[0]);
  };

  const handleAddComment = async (postId, values) => {
    const data = { post_id: postId, comment: values.comment };
    const createdPost = await axiosInstance.post(COMMENT_API, data);
    if (createdPost.status == 200) {
      getCommentsByPostId();
    }
  };

  const handleLikePost = async () => {
    const data = { ...postDetails };
    const postData = { liked: !postDetails.liked, post_id: data._id };
    const response = await axiosInstance.post(LIKE_API, postData);
    data.liked = !data.liked;
    data.likeCount = parseInt(data.likeCount) + (data.liked ? 1 : -1);
    setPostDetails(data);
  };

  const handleSavePost = async (post_id) => {
    try {
      const data = { post_id };
      const response = await axiosInstance.post(SAVE_POST_API, data);
      const postdata = { ...postDetails };
      postdata.saved = !postdata.saved;
      setPostDetails(postdata);
    } catch (error) {
      console.error("Error handling save post:", error);
    }
  };

  if (!show) return null;
  return (
    <PortalModal show={show}>
      <div className="fixed  flex items-center justify-center min-w-[70%] max-w-[90%] h-full overflow-hidden ">
        <div
          className="fixed inset-0 bg-black opacity-50 "
          onClick={closeModal}></div>
        {postDetails && (
          <div className="shadow-[0px_0px_15px_0px_rgba(0,_0,_0,_0.25)]  w-4/5 h-[90%] bg-white  flex z-10  rounded-md">
            <div className=" flex justify-center items-center bg-black rounded-l-md">
              <PostFile
                autoplay={true}
                loop={true}
                media_type={postDetails?.media_type}
                media_url={postDetails?.media_url}
              />
            </div>
            <div className="p-4 flex-1 h-full flex flex-col justify-between ">
              <div className="flex flex-col h-full justify-between items-start ">
                {/* <div className="flex flex-col gap-4 w-full items-start"> */}
                <div className="relative flex w-full items-center p-1 gap-3 border-b">
                  {/* <img
                  src={postDetails?.user[0].imageUrl}
                  className="w-10 rounded-full"
                /> */}
                  <UserImage
                    id={postDetails?.user[0]._id}
                    imgUrl={postDetails?.user[0].imageUrl}
                    username={postDetails?.user[0].userName}
                    imgStyle="w-14 object-cover"
                    extra="w-14"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">
                      {postDetails?.user[0].fullName}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        {postDetails?.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between  w-5 shrink-0 items-start">
                    <FiMoreHorizontal className="w-8 h-8" />
                  </div>
                </div>
                <div className=" flex flex-col gap-4 flex-1 items-start overflow-y-auto w-full h-72">
                  <div className="bg-cover flex w-full items-start p-1 gap-3">
                    {/* <img
                    src={postDetails?.user[0].imageUrl}
                    className="w-10 rounded-full"
                  /> */}
                    <div className="flex-0">
                      <UserImage
                        id={postDetails?.user[0]._id}
                        imgUrl={postDetails?.user[0].imageUrl}
                        username={postDetails?.user[0].userName}
                        extra="w-14 "
                        imgStyle=""
                      />
                    </div>
                    <div className="flex-1">
                      <div className=" flex flex-wrap  items-start  text-sm gap-2">
                        <span className=" font-semibold text-[#262626]">
                          {postDetails?.user[0].fullName}
                        </span>
                        {postDetails?.caption}
                      </div>
                      <span className="text-xs text-gray-400">
                        {timeAgo(postDetails?.createdAt)}
                      </span>
                    </div>
                  </div>
                  {postDetails?.comments?.map((cmt) => (
                    <div
                      key={cmt._id}
                      className="bg-cover flex w-full items-start p-1 gap-3">
                      {/* <img
                      src={cmt.user.imageUrl}
                      className="w-10 rounded-full"
                    /> */}
                      <div className="flex-0">
                        <UserImage
                          id={cmt.user._id}
                          imgUrl={cmt.user.imageUrl}
                          username={cmt.user.userName}
                          extra="w-14 "
                          imgStyle=""
                        />
                      </div>
                      <div className="flex-1 w-[90%] ">
                        <div className=" flex flex-wrap  items-start  text-sm gap-2">
                          <span className=" font-semibold text-[#262626]">
                            {cmt.user?.fullName}
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
                <div className="flex flex-row justify-between items-start mx-px w-full ">
                  <div className="flex flex-col mt-px gap-8 items-start w-full">
                    <div className="flex flex-col gap-6 w-full">
                      <div className="flex flex-row ml-1 gap-6 items-start  w-full">
                        <div onClick={() => handleLikePost(postDetails._id)}>
                          {postDetails?.liked ? (
                            <AiFillHeart
                              key={postDetails?._id}
                              className={`h-7 w-7 cursor-pointer hover:text-red-500 text-red-600 ping-animation`}
                              id={`like-button-${postDetails?._id}`}
                            />
                          ) : (
                            <IoIosHeartEmpty
                              className={`h-7 w-7 cursor-pointer hover:text-gray-400}`}
                              id={`like-button-${postDetails?._id}`}
                            />
                          )}
                        </div>
                        <CommentIcon />
                        <MessageIcon />
                        <div
                          className="cursor-pointer w-full flex-1 flex justify-end"
                          onClick={() => handleSavePost(postDetails?._id)}>
                          <BookmarkIcon
                            fill={postDetails?.saved ? "black" : "none"}
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

                    <Comment postId={postId} callBack={handleAddComment} />
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalModal>
  );
}

export default Comments;
