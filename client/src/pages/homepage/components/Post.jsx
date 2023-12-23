import { motion } from "framer-motion";
import React, {
  createRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";
import GradiantHeartIcon from "../../../assets/svg/GradiantHeartIcon";
import PostBottom from "../../../components/post/PostBottom";
import PostComment from "../../../components/post/PostComment";
import PostFile from "../../../components/post/PostFile";
import PostHead from "../../../components/post/PostHead";
import PostLikeAndCaption from "../../../components/post/PostLikeAndCaption";
import PostShimmer from "../../../components/shimmerUi/PostShimmer";
import AllCaughtUp from "../../../components/uiPrimitives/AllCaughtUp";
import useSocialAction from "../../../hooks/useSocialAction";
import { FileUploadContext } from "../../../services/providers/FileUploadContext";
import { CiCircleChevRight } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

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
    setPostDetails,
  } = useSocialAction();
  console.log("🚀 ~ file: Post.jsx:40 ~ Post ~ posts:", posts);
  const [item, setItem] = useState(0);
  const [items, setItems] = useState(posts.map(() => 0));
  console.log("🚀 ~ file: Post.jsx:43 ~ Post ~ items:", items);

  useEffect(() => {
    setItems(posts.map(() => 0));
  }, [posts]);

  const { uploadStatus } = useContext(FileUploadContext); //using for rerender after new post upload
  const [ref, inView] = useInView();
  // const postContainerRef = useRef();
  // Initialize postContainerRefs as an empty array
  const postContainerRefs = useRef([]);

  // Update postContainerRefs when posts are available
  useEffect(() => {
    postContainerRefs.current = posts.map(() => createRef());
  }, [posts]);

  //after post upload set post empty page=1 and get all posts with new post
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

  // const handleScroll = (scrollOffset) => {
  //   console.log("handle scroll");

  //   const container = postContainerRef.current;
  //   if (container) {
  //     console.log(
  //       "🚀 ~ file: Post.jsx:57 ~ handleScroll ~ container:",
  //       container
  //     );
  //     container.scrollBy({ left: scrollOffset, behavior: "smooth" });
  //   }
  // };
  const handleScroll = (index, scrollOffset) => {
    const container = postContainerRefs.current[index]?.current;
    if (container) {
      container.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
    // updateState(scrollOffset);
    if (scrollOffset === 480 && items[index] < posts[index]?.files.length - 1) {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] += 1;
        return newItems;
      });
    } else if (scrollOffset === -480 && items[index] > 0) {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] -= 1;
        return newItems;
      });
    }
  };

  // const updateState = (index, scrollOffset) => {
  //   if (scrollOffset === 480) {
  //     setPosts((prevPosts) => {
  //       const updatedPosts = [...prevPosts];
  //       if (updatedPosts[index]) {
  //         updatedPosts[index].item = (updatedPosts[index].item || 0) + 1;
  //       }
  //       return updatedPosts;
  //     });
  //   } else {
  //     setPosts((prevPosts) => {
  //       const updatedPosts = [...prevPosts];
  //       if (updatedPosts[index]) {
  //         updatedPosts[index].item = (updatedPosts[index].item || 0) - 1;
  //       }
  //       return updatedPosts;
  //     });
  //   }
  // };

  // Use useEffect to ensure re-render after state update
  useEffect(() => {
    // Additional actions or logging can be added here
  }, [posts]); // Ensure useEffect runs when 'posts' state changes

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
                    <div
                      className="relative flex flex-col items-center w-full"
                      onDoubleClick={() => handleDoubleClick(index, post._id)}
                      onTouchStart={() => handleTouchStart(index, post._id)}>
                      <div
                        className="flex overflow-scroll items-center w-full relative bg-black rounded-md scrollbar-hide"
                        ref={postContainerRefs.current[index]}>
                        {post.files.map((file) => (
                          <PostFile
                            key={file._id}
                            media_url={file.fileUrl}
                            media_type={file.fileType}
                            extra="relative object-fit !w-full lg:!max-w-[480px] lg:!max-h-[600px] sm:!w-full !max-h-[490px]  bg-black"
                          />
                        ))}
                      </div>

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
                      {items[index] < post.files.length - 1 && (
                        <div
                          className="absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointers"
                          onClick={() => handleScroll(index, 480)}>
                          <FaAngleRight className="w-5 h-5 text-black bg-white rounded-full bg-opacity-60 shadow-md p-0.5 cursor-pointer" />
                        </div>
                      )}
                      {items[index] > 0 && (
                        <div
                          className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointers"
                          onClick={() => handleScroll(index, -480)}>
                          <FaAngleLeft className="w-5 h-5 text-black bg-white rounded-full bg-opacity-60 shadow-md p-0.5 cursor-pointer" />
                        </div>
                      )}
                      {post.files.length > 1 && (
                        <div className="absolute  bottom-2 transform -translate-y-1/2 cursor-pointers flex gap-1">
                          {post.files.map((item, i) => (
                            <div
                              className={`h-1.5 w-1.5 rounded-full  ${
                                items[index] == i ? `bg-white` : `bg-gray-400`
                              }`}></div>
                          ))}
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
        <div ref={ref}>
          <PostShimmer />
        </div>
      )}
    </div>
  );
}

export default Post;
