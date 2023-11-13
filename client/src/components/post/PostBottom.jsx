import React, { useContext } from "react";
import { LIKE_API } from "../../services/api/const";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { IoIosHeartEmpty } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import CommentIcon from "../../assets/svg/CommentIcon";
import { HiOutlineBookmark } from "react-icons/hi";
import { UserActionContext } from "../../services/providers/UserActionContext";

function PostBottom({ post, posts, setPosts, index }) {
  const { comments, setComments, postId, setPostId } =
    useContext(UserActionContext);

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

  return (
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
        <CommentIcon
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
  );
}

export default PostBottom;
