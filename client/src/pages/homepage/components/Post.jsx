import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import GradiantHeartIcon from "../../../assets/svg/GradiantHeartIcon";
import PostBottom from "../../../components/post/PostBottom";
import PostComment from "../../../components/post/PostComment";
import PostFile from "../../../components/post/PostFile";
import PostHead from "../../../components/post/PostHead";
import PostLikeAndCaption from "../../../components/post/PostLikeAndCaption";
import PostShimmer from "../../../components/shimmerUi/PostShimmer";
import useSocialAction from "../../../hooks/useSocialAction";
import { Loading } from "../../../assets/svg/Loading";
import { useInView } from "react-intersection-observer";
import AllCaughtUp from "../../../components/uiPrimitives/AllCaughtUp";

function Post() {
  const {
    posts,
    setPosts,
    likePost,
    viewComments,
    savePost,
    sharePost,
    handleDoubleClick,
    handleTouchStart,
    controls,
    likedId,
    getAllPosts,
    page,
    setPage,
  } = useSocialAction();

  const [ref, inView] = useInView();

  useEffect(() => {
    getAllPosts();
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      console.log("-------In view-----");
    }
  }, [inView]);

  // If the loader is in view, fetch more data
  // if (inView) {

  // }

  if (!posts || posts.length == 0) return <PostShimmer />;
  return (
    <div className="flex flex-col gap-4 lg:mx-20 w-full">
      {posts?.map((post, index) => {
        if (post._id != -1) {
          return (
            <div
              className="mb-px lg:ml-4 lg:mr-5 lg:max-w-[500px] w-full"
              key={post._id}>
              <PostHead post={post} />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <div
                      className="relative flex flex-col items-center "
                      onDoubleClick={() => handleDoubleClick(index, post._id)}
                      onTouchStart={() => handleTouchStart(index, post._id)}>
                      <PostFile
                        media_url={post.media_url}
                        media_type={post.media_type}
                        extra="relative object-fit lg:rounded-md !w-full lg:!max-w-[480px] lg:!max-h-[600px] sm:!w-full !max-h-[490px]  bg-black"
                      />
                      {likedId == post._id && (
                        <div className="absolute inset-1/2 -ml-8 -mt-6 ping-animation ">
                          <motion.div
                            className={`heart-icon ${likedId ? "liked" : ""}`}
                            // onClick={handleClick}
                            animate={controls}>
                            <GradiantHeartIcon className="" />
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <PostBottom
                      post={post}
                      posts={posts}
                      setPosts={setPosts}
                      index={index}
                      likePost={likePost}
                      viewComments={viewComments}
                      savePost={savePost}
                      sharePost={sharePost}
                    />
                  </div>
                  <div className="flex flex-col justify-between items-start px-4">
                    <PostLikeAndCaption
                      post={post}
                      posts={posts}
                      setPosts={setPosts}
                      index={index}
                    />
                    <PostComment post={post} />
                  </div>
                </div>
              </div>
              <div id="Border2" className="bg-[#efefef] h-px shrink-0" />
            </div>
          );
        }
      })}
      {posts.length > 0 && posts[posts.length - 1]._id === -1 ? (
        <AllCaughtUp />
      ) : (
        <div ref={ref}>Loading.........</div>
      )}
    </div>
  );
}

export default Post;
