import React, { useContext } from "react";
import Comment from "../../pages/homepage/components/Comment";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { COMMENT_API } from "../../services/api/const";
import { UserActionContext } from "../../services/providers/UserActionContext";

function PostComment({ post }) {
  const { comments, setComments, postId, setPostId } =
    useContext(UserActionContext);

  const handleAddComment = async (postId, values) => {
    const data = { post_id: postId, comment: values.comment };
    const createdPost = await axiosInstance.post(COMMENT_API, data);
  };
  const handleViewComments = (postId) => {
    setComments(true);
    setPostId(postId);
  };
  return (
    <div className="flex flex-col   shrink-0 w-full">
      {post.commentCount > 0 && (
        <div
          className="text-xs cursor-pointer my-1"
          onClick={() => {
            handleViewComments(post._id);
          }}>
          View all {post.commentCount} comments
        </div>
      )}
      <Comment postId={post._id} callBack={handleAddComment} />
    </div>
  );
}

export default PostComment;
