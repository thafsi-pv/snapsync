import React, { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PostBottom from "../../../components/post/PostBottom";
import PostCarousel from "../../../components/post/PostCarousel";
import PostComment from "../../../components/post/PostComment";
import PostHead from "../../../components/post/PostHead";
import PostLikeAndCaption from "../../../components/post/PostLikeAndCaption";
import PostShimmer from "../../../components/shimmerUi/PostShimmer";
import AllCaughtUp from "../../../components/uiPrimitives/AllCaughtUp";
import useSocialAction from "../../../hooks/useSocialAction";
import { FileUploadContext } from "../../../services/providers/FileUploadContext";

function Post() {
  const {
    posts,
    setPosts,
    likePost,
    viewComments,
    savePost,
    sharePost,
    likedId,
    getAllPosts,
    page,
    setPostDetails,
  } = useSocialAction();
  const { uploadStatus } = useContext(FileUploadContext); //using for rerender after new post upload
  const [ref, inView] = useInView();

  useEffect(() => {
    setPosts([]);
    page.current = 1;
    getAllPosts();
  }, [uploadStatus]);

  useEffect(() => {
    if (inView) {
      page.current = page.current + 1;
      getAllPosts();
      console.log("-------In view-----");
    }
  }, [inView]);

  if (!posts || posts.length == 0) return <PostShimmer />;
  return (
    <div className="flex flex-col gap-4 lg:mx-20 w-full relative">
      {posts?.map((post, index) => {
        if (post._id != -1) {
          return (
            <div
              className="mb-px lg:ml-4 lg:mr-5 lg:max-w-[480px] w-full"
              key={post._id}>
              <PostHead post={post} setPostDetails={setPostDetails} />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <PostCarousel
                      post={post}
                      likedId={likedId}
                      index={index}
                      extraClass="lg:rounded-md"
                      extraFileClass="lg:!max-w-[504px] lg:!max-h-[599px] sm:!w-full !max-h-[490px] object-contain"
                    />
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
                  <div className="flex flex-col justify-between items-start lg:px-0 px-1">
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
        <div ref={ref}>
          <PostShimmer />
        </div>
      )}
    </div>
  );
}

export default Post;
