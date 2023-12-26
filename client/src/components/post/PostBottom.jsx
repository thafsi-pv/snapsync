import React, { useRef } from "react";
import { AiFillHeart } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import BookmarkIcon from "../../assets/svg/BookmarkIcon";
import CommentIcon from "../../assets/svg/CommentIcon";
import MessageIcon from "../../assets/svg/MessageIcon";

function PostBottom({
  post,
  posts,
  index,
  likePost,
  viewComments,
  savePost,
  sharePost,
}) {
  return (
    <div className="flex flex-row justify-between items-center lg:px-0 px-1">
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
        <div
          className="cursor-pointer"
          onClick={() => {
            sharePost(post._id);
          }}>
          <MessageIcon />
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => savePost(post._id)}>
        <BookmarkIcon fill={post.saved ? "black" : "none"} />
      </div>
    </div>
  );
}

export default PostBottom;
