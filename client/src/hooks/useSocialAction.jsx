import { useAnimation } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../services/api/axiosInterceptor";
import {
  COMMENT_API,
  LIKE_API,
  POST_API,
  SAVE_POST_API,
} from "../services/api/const";
import { genericError } from "../services/api/genericError";
import { UserActionContext } from "../services/providers/UserActionContext";
import useNotification from "./useNotification";
import { useToast } from "./useToast";

/**
 * useSocialAction custom hook
 * Responsible for like, comment save post from home page
 * Responsible for comments popup
 * Responsible post double tap like fly heart
 */

function useSocialAction() {
  const controls = useAnimation();
  const [posts, setPosts] = useState([]);
  const [likedId, setLikedId] = useState(); //variable for post double tap
  const { userData, comments, setComments, postId, setPostId, setShare } =
    useContext(UserActionContext);

  const { createNotification } = useNotification(); //notification hook
  const { addToast } = useToast();

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
            "liked",
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
        updatedPosts[postIndex].saved && addToast("Post saved");
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

  const sharePost = (postId) => {
    setShare(true);
    setPostId(postId);
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

  //start region post double tap like
  const lastTapTimeRef = useRef(0);

  const handleDoubleClick = (index, id) => {
    handleClick(index, id);
  };

  const handleTouchStart = (index, id) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTimeRef.current;
    if (tapLength < 300) {
      console.log("Double tap!");
      handleClick(index, id);
    }
    lastTapTimeRef.current = currentTime;
  };

  const handleClick = async (index, id) => {
    setLikedId(id);
    if (!posts[index].liked) {
      likePost(index, id, posts);
    }

    // Pop-up animation
    await controls.start({
      opacity: 1,
      scale: 1.5,
      transition: { duration: 0.2 },
    });

    // Shake animation
    await controls.start({
      rotate: [10, 10, 10, 10, 0],
      y: [-10, 10, -10, 10, 0],
      z: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 500,
        damping: 10,
      },
    });

    // Move to the top animation
    await controls.start({
      y: -350,
      rotate: [10, 10, 10, 10, 40],
      opacity: 0,
      transition: { duration: 0.4 },
    });

    // Reset animations
    controls.start({ scale: 1, rotate: 0, y: 0, opacity: 0 });
    setLikedId();
  };
  //end region post double tap like

  return {
    userData,
    posts,
    setPosts,
    likePost,
    savePost,
    addComment,
    viewComments,
    getCommentsByPostId,
    likePostInCommentModal,
    savePostInCommentModal,
    sharePost,
    handleDoubleClick, //for post double click desktop
    handleTouchStart, //for post double tap mobile
    controls, //fley heart animation controls
    likedId,
  };
}

export default useSocialAction;
