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
    // if (createdPost.status == 200) {
    //   getAllPosts();
    // }
  };
  const handleViewComments = (postId) => {
    setComments(true);
    setPostId(postId);
  };
  return (
    <div className="flex flex-col   shrink-0">
      {post.commentCount > 0 && (
        <div
          className="text-sm  leading-[18px] cursor-pointer my-2"
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
