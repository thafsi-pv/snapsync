import React, { useEffect, useRef, useState } from "react";
import { BsChat } from "react-icons/bs";
import { HiOutlineBookmark } from "react-icons/hi";
import { IoIosHeartEmpty, IoIosMore } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { LuSend } from "react-icons/lu";
import { axiosInstance } from "../../../axios/axiosInterceptor";
import { COMMENT_API, LIKE_API, POST_API } from "../../../axios/const";
import InputField from "../../../components/fields/InputField";
import { timeAgo } from "../../../utils/timeAgo";
import Comment from "./Comment";
import UserImgName from "../../../components/user/UserImgName";

function Post({ setComments, setPostId }) {
  const [posts, setPosts] = useState();
  console.log("🚀 ~ file: Post.jsx:13 ~ Post ~ posts:", posts);
  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const post = await axiosInstance.get(POST_API);
    console.log("🚀 ~ file: Post.jsx:21 ~ getAllPosts ~ post:", post);
    setPosts(post.data);
  };

  const handleMoreCaption = (index) => {
    const data = [...posts];
    data[index].showFullCaption = true;
    setPosts(data);
  };

  const handleLikePost = async (index, post_id) => {
    const data = [...posts];
    const postData = { liked: !data[index].liked, post_id };
    const response = await axiosInstance.post(LIKE_API, postData);
    data[index].liked = !data[index].liked;
    data[index].likeCount =
      parseInt(data[index].likeCount) + (data[index].liked ? 1 : -1);
    setPosts(data);
  };

  const handleViewComments = (postId) => {
    setComments(true);
    setPostId(postId);
  };

  const handleAddComment = async (postId, values) => {
    const data = { post_id: postId, comment: values.comment };
    const createdPost = await axiosInstance.post(COMMENT_API, data);
    if (createdPost.status == 200) {
      getAllPosts();
    }
  };

  return (
    <div className="flex flex-col gap-4 mx-20">
      {posts?.map((post, index) => {
        return (
          <div className="mb-px ml-4 mr-5 max-w-[500px]" key={index}>
            <div className="flex flex-row justify-between items-center mb-2 ">
              <div className="flex flex-row gap-3 items-start w-full">
                <div className="flex gap-3 w-full items-center">
                  {/* <img
                    src={post.user[0].imageUrl}
                    className="w-8 h-8 absolute left-1 rounded-full"
                  /> */}
                  <UserImgName fullName={post.user[0].fullName} desc= {post.location} extra='w-8 h-8' id={post.user[0]._id} username={post.user[0].userName} imgUrl={post.user[0].imageUrl} />
                  <div className="flex items-center text-xs text-gray-400 gap-1">
                      <div className="flex justify-center items-center font-bold">
                        •
                      </div>
                      <div className=" text-xs font-normal ">
                        {timeAgo(post.createdAt)}
                      </div>
                    </div>
                </div>



                {/* <div className="relative flex flex-col mb-px w-full shrink-0 items-start">
                  <div className="flex text-sm font-semibold w-full gap-2 items-center">
                    <div>{post?.user[0]?.fullName}</div>
                    <div className="flex items-center text-xs text-gray-400 gap-1">
                      <div className="flex justify-center items-center font-bold">
                        •
                      </div>
                      <div className=" text-sm font-normal ">
                        {timeAgo(post.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-row mb-3 gap-px w-full shrink-0 items-center text-gray-400">
                    <div className="text-xs  tracking-[0.39]  w-24">
                      {post.location}
                    </div>
                  </div>
                </div> */}
              </div>
              <div>
                <IoIosMore className="font-bold text-xl" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <div className="relative flex flex-col items-start ">
                    {post.media_type.startsWith("image/") ? (
                      <img
                        src={post.media_url}
                        id="Element3"
                        className="relative object-cover rounded-sm w-[500px] max-w-[480px] max-h-[600px]"
                      />
                    ) : (
                      <video
                        src={post.media_url}
                        controls
                        autoplay={false}
                        className="object-fit w-full h-full rounded-sm max-w-[500px] max-h-[600px] bg-black"
                      />
                    )}
                  </div>
                  <div className="flex flex-row justify-between items-center mr-4">
                    <div className="flex flex-row gap-6 items-start">
                      <div onClick={() => handleLikePost(index, post._id)}>
                        {post.liked ? (
                          <AiFillHeart
                            className={`h-7 w-7 cursor-pointer hover:text-red-500 text-red-600`}
                            id={`like-button-${post._id}`}
                          />
                        ) : (
                          <IoIosHeartEmpty
                            className={`h-7 w-7 cursor-pointer hover:text-gray-400}`}
                            id={`like-button-${post._id}`}
                          />
                        )}
                      </div>

                      <img
                        src="https://file.rendit.io/n/2ojGnkou9SjgxNjbxFKw.svg"
                        className="mr-px w-6 shrink-0 cursor-pointer"
                        onClick={() => {
                          handleViewComments(post._id);
                        }}
                      />
                      <img
                        src="https://file.rendit.io/n/5qjbxZc2qX75hQkoeJkP.svg"
                        className="mt-px w-6 shrink-0 cursor-pointer"
                      />
                    </div>
                    <HiOutlineBookmark className="h-7 w-7" />
                  </div>
                </div>
                <div className="flex flex-row justify-between items-start mr-8">
                  <div className="self-stretch flex gap-2 flex-col items-start">
                    <div className="relative flex text-sm font-semibold ">
                      {post.likeCount} likes
                    </div>
                    <div className=" gap-2 items-start  text-sm">
                      <span
                        className={`bold text-[#262626] ${
                          post.showFullCaption
                            ? "line-clamp-none"
                            : "line-clamp-2"
                        }`}>
                        <span className=" font-semibold text-[#262626]">
                          {post?.user[0]?.fullName} {"  "}
                        </span>
                        {post.caption}
                      </span>
                      {post.caption.length > 50 && !post.showFullCaption && (
                        <span
                          className="text-[#8e8e8e] cursor-pointer"
                          onClick={() => handleMoreCaption(index)}>
                          more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col   shrink-0">
                {post.commentCount > 0 && (
                  <div
                    className="text-sm  leading-[18px] cursor-pointer"
                    onClick={() => {
                      handleViewComments(post._id);
                    }}>
                    View all {post.commentCount} comments
                  </div>
                )}
                <Comment postId={post._id} callBack={handleAddComment} />
              </div>
            </div>
            <div id="Border2" className="bg-[#efefef] h-px shrink-0" />
          </div>
        );
      })}
    </div>
  );
}

export default Post;
