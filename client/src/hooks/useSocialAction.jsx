import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserActionContext } from "../services/providers/UserActionContext";
import { genericError } from "../services/api/genericError";
import {
  COMMENT_API,
  LIKE_API,
  POST_API,
  SAVE_POST_API,
} from "../services/api/const";
import { axiosInstance } from "../services/api/axiosInterceptor";
import useNotification from "./useNotification";

/**
 * useSocialAction custom hook
 * Responsible for like, comment save post from home page and comments popup
 */

function useSocialAction() {
  const [posts, setPosts] = useState([]);

  const { comments, setComments, postId, setPostId } =
    useContext(UserActionContext);

  const { createNotification } = useNotification(); //notification hook

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const post = await axiosInstance.get(POST_API);
    setPosts(post.data);
  };

  const likePost = async (index, post_id, postss) => {
    try {
      const data = [...postss];
      const postData = { liked: !data[index].liked, post_id };
      const response = await axiosInstance.post(LIKE_API, postData);
      if (response.status === 200) {
        const updatedData = [...data];
        updatedData[index] = {
          ...data[index],
          liked: !data[index].liked,
          likeCount:
            parseInt(data[index].likeCount) + (data[index].liked ? -1 : 1),
        };
        setPosts(updatedData);

        //notification only when like not for unlike
        if (updatedData[index].liked) {
          const noti = await createNotification(
            "like",
            updatedData[index].user[0]._id,
            updatedData[index]._id
          );
        }
      }
    } catch (error) {
      genericError(error);
    }
  };

  const savePost = async (post_id) => {
    try {
      const data = { post_id };
      const response = await axiosInstance.post(SAVE_POST_API, data);
      const postIndex = posts.findIndex((item) => item._id === post_id);
      if (postIndex !== -1) {
        const updatedPosts = [...posts];
        updatedPosts[postIndex].saved = response.data.flag;
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error handling save post:", error);
    }
  };

  const viewComments = (postId) => {
    setComments(true);
    setPostId(postId);
  };

  const addComment = async (postId, values) => {
    const data = { post_id: postId, comment: values.comment };
    const createdPost = await axiosInstance.post(COMMENT_API, data);
    return createdPost;
  };

  const getCommentsByPostId = async (postId) => {
    const comments = await axiosInstance.get(
      `${COMMENT_API}?post_id=${postId}`
    );
    return comments.data[0];
  };

  //post likes from comment modal update db and return current post details
  const likePostInCommentModal = async (postDetails) => {
    try {
      const data = { ...postDetails };
      const postData = { liked: !postDetails.liked, post_id: data._id };
      const response = await axiosInstance.post(LIKE_API, postData);
      data.liked = !data.liked;
      data.likeCount = parseInt(data.likeCount) + (data.liked ? 1 : -1);
      return data;
    } catch (error) {
      genericError(error);
    }
  };

  const savePostInCommentModal = async (post_id) => {
    try {
      const data = { post_id };
      const response = await axiosInstance.post(SAVE_POST_API, data);
      return response;
    } catch (error) {
      console.error("Error handling save post:", error);
    }
  };

  return {
    posts,
    setPosts,
    likePost,
    savePost,
    addComment,
    viewComments,
    getCommentsByPostId,
    likePostInCommentModal,
    savePostInCommentModal,
  };
}

export default useSocialAction;
