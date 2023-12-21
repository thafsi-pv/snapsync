import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../services/api/axiosInterceptor";
import { ENTIRE_API } from "../services/api/const";
import { UserActionContext } from "../services/providers/UserActionContext";

function useExplore() {
  const [exploreList, setExploreList] = useState();
  const { comments, setComments, postId, setPostId } =
    useContext(UserActionContext);

  useEffect(() => {
    getEntirePost();
  }, []);

  const getEntirePost = async () => {
    const postList = await axiosInstance.get(ENTIRE_API);
    setExploreList(postList.data);
  };
  const handleViewComments = (postId) => {
    setComments(true);
    setPostId(postId);
  };
  return { handleViewComments, exploreList ,comments, setComments, postId, setPostId};
}

export default useExplore;
