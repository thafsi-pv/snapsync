import { motion, useAnimation } from "framer-motion";
import React, { useRef, useState } from "react";
import { BiHeart } from "react-icons/bi";
import GradiantHeartIcon from "../../../assets/svg/GradiantHeartIcon";
import PostBottom from "../../../components/post/PostBottom";
import PostComment from "../../../components/post/PostComment";
import PostFile from "../../../components/post/PostFile";
import PostHead from "../../../components/post/PostHead";
import PostLikeAndCaption from "../../../components/post/PostLikeAndCaption";
import useSocialAction from "../../../hooks/useSocialAction";

function Post() {
  const { posts, setPosts, likePost, viewComments, savePost, sharePost } =
    useSocialAction();
  const [likedId, setLikedId] = useState();
  const controls = useAnimation();
  // const [posts, setPosts] = useState();
  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  // const getAllPosts = async () => {
  //   const post = await axiosInstance.get(POST_API);
  //   setPosts(post.data);
  // };

  const lastTapTimeRef = useRef(0);

  const handleDoubleClick = (index, id) => {
    console.log("Double click!");
    // Your double-click logic here
    handleClick(index,id);
  };

  const handleTouchStart = (index, id) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTimeRef.current;

    if (tapLength < 300) {
      console.log("Double tap!");
      // Your double-tap logic here
      handleClick(index, id);
    }

    lastTapTimeRef.current = currentTime;
  };

  const handleClick = async (index, id) => {
    console.log("double click");
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

  return (
    <div className="flex flex-col gap-4 lg:mx-20 w-full">
      {posts?.map((post, index) => {
        return (
          <div
            className="mb-px lg:ml-4 lg:mr-5 lg:max-w-[500px] w-full"
            key={index}>
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
      })}
    </div>
  );
}

export default Post;
