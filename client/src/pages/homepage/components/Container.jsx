import React, { Suspense, lazy, useContext, useEffect } from "react";
import { Loading } from "../../../assets/svg/Loading";
import useChat from "../../../hooks/useChat";
import { UserActionContext } from "../../../services/providers/UserActionContext";
import Post from "./Post";
import Story from "./Story";
import Suggestions from "./Suggestions";
const Comments = lazy(() => import("../../../components/modal/Comments"));
const Share = lazy(() => import("../../../components/modal/Share"));
const PostDetails = lazy(() => import("../../../components/modal/PostDetails"));

/**
 * Container component (page component)
 * Responsible for post, story and suggestion list
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
