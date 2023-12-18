import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import Story from "./Story";
import Suggestions from "./Suggestions";
import Post from "./Post";

// import Comments from "../../../components/modal/Comments";
const Comments = lazy(() => import("../../../components/modal/Comments"));

import { UserActionContext } from "../../../services/providers/UserActionContext";
// import Share from "../../../components/modal/Share";
const Share = lazy(() => import("../../../components/modal/Share"));
import useChat from "../../../hooks/useChat";
import { Loading } from "../../../assets/svg/Loading";
import { SocketContext } from "../../../services/providers/SocketContext";
// import PostDetails from "../../../components/modal/PostDetails";
const PostDetails = lazy(() => import("../../../components/modal/PostDetails"));

/**
 * Container component (page component)
 * Responsible for home page view story component
 * post component and suggestions
 * Using userAction context for modal show hide
 * In first render getting socket connection using useChat hook
 * @returns
 */

function Container() {
  const {
    comments,
    setComments,
    postId,
    share,
    setShare,
    postDetails,
    setPostDetails,
  } = useContext(UserActionContext);
  // const { connectSocket } = useContext(SocketContext);
  const { connectSocket, socket } = useChat();

  useEffect(() => {
    if (!socket.current) {
      connectSocket();
    }
  }, []);

  return (
    <div className="lg:flex overflow-hidden min-h-full min-w-full max-w-full lg:justify-evenly ">
      <div className="self-start flex flex-col gap-7 lg:w-8/12 md:w-7/12 sm:w-full max-w-[680px] ">
        <Story />
        <Post />
      </div>
      <div className="hidden lg:block w-3/12">
        <Suggestions />
      </div>
      {comments && (
        <Suspense fallback={<Loading />}>
          <Comments
            postId={postId}
            show={comments}
            closeModal={() => setComments(false)}
          />
        </Suspense>
      )}
      {share && (
        <Suspense fallback={<Loading />}>
          <Share share={share} setShare={setShare} />
        </Suspense>
      )}
      {postDetails && (
        <Suspense fallback={<Loading />}>
          <PostDetails
            postDetail={postDetails}
            setPostDetails={setPostDetails}
          />
        </Suspense>
      )}
    </div>
  );
}

export default Container;
