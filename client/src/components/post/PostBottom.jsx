import React, { useContext } from "react";
import { AiFillHeart } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import BookmarkIcon from "../../assets/svg/BookmarkIcon";
import CommentIcon from "../../assets/svg/CommentIcon";
import MessageIcon from "../../assets/svg/MessageIcon";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { LIKE_API, SAVE_POST_API } from "../../services/api/const";
import { UserActionContext } from "../../services/providers/UserActionContext";
import useSocialAction from "../../hooks/useSocialAction";
import { genericError } from "../../services/api/genericError";

function PostBottom({
  post,
  posts,
  setPosts,
  index,
  likePost,
  viewComments,
  savePost,
  sharePost,
}) {
  const { comments, setComments, postId, setPostId } =
    useContext(UserActionContext);

  // const { likePost, viewComments } = useSocialAction();

  // const handleLikePost = async (index, post_id) => {
  //   likePost(index, post_id, posts);

  // try {
  //   const data = [...posts];
  //   // const postData = { liked: !data[index].liked, post_id };
  //   // const response = await axiosInstance.post(LIKE_API, postData);

  //   const likepost = await likePost(!data[index].liked, post_id);
  //   if (likepost.status == 200) {
  //     data[index].liked = !data[index].liked;
  //     data[index].likeCount =
  //       parseInt(data[index].likeCount) + (data[index].liked ? 1 : -1);
  //     setPosts(data);
  //   }
  // } catch (error) {
  //   genericError(error);
  // }
  // };
  // const handleViewComments = (postId) => {
  //   setComments(true);
  //   setPostId(postId);
  // };

  // const handleSavePost = async (post_id) => {
  //   try {
  //     const data = { post_id };
  //     const response = await axiosInstance.post(SAVE_POST_API, data);
  //     const postIndex = posts.findIndex((item) => item._id === post_id);
  //     if (postIndex !== -1) {
  //       const updatedPosts = [...posts];
  //       updatedPosts[postIndex].saved = response.data.flag;
  //       setPosts(updatedPosts);
  //     }
  //   } catch (error) {
  //     console.error("Error handling save post:", error);
  //   }
  // };

  return (
    <div className="flex flex-row justify-between items-center px-4 ">
      <div className="flex flex-row gap-4 items-start">
        <div onClick={() => likePost(index, post._id, posts)}>
          {post.liked ? (
            <AiFillHeart
              key={post._id}
              className={`h-7 w-7 cursor-pointer hover:text-red-500 text-red-600 ping-animation`}
              id={`like-button-${post._id}`}
            />
          ) : (
            <IoIosHeartEmpty
              className={`h-7 w-7 cursor-pointer hover:text-gray-400}`}
              id={`like-button-${post._id}`}
            />
          )}
        </div>
        <div className="cursor-pointer">
          <CommentIcon
            onClick={() => {
              // handleViewComments(post._id);
              viewComments(post._id);
            }}
          />
        </div>
        <div className="cursor-pointer" onClick={() => {
              console.log('dfdsf')
              sharePost(post._id);
            }}>
          <MessageIcon
            
          />
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => savePost(post._id)}>
        <BookmarkIcon fill={post.saved ? "black" : "none"} />
      </div>
    </div>
  );
}

export default PostBottom;
