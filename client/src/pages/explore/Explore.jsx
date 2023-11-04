import React, { useContext, useEffect, useState } from "react";
import PostFile from "../../components/post/PostFile";
import Contents from "./components/Contents";
import { axiosInstance } from "../../axios/axiosInterceptor";
import { ENTIRE_API } from "../../axios/const";
import Comments from "../homepage/modal/Comments";
import { UserActionContext } from "../../context/UserActionContext";

function Explore() {
  const [exploreList, setExploreList] = useState();
  const { comments, setComments, postId, setPostId } =
    useContext(UserActionContext);
  console.log("🚀 ~ file: Explore.jsx:9 ~ Explore ~ exploreList:", exploreList);

  useEffect(() => {
    getEntirePost();
  }, []);

  const getEntirePost = async () => {
    const postList = await axiosInstance.get(ENTIRE_API);
    console.log(
      "🚀 ~ file: Explore.jsx:17 ~ getEntirePost ~ postList:",
      postList
    );
    setExploreList(postList.data);
  };
  const handleViewComments = (postId) => {
    setComments(true);
    setPostId(postId);
  };

  return (
    <div className="container mx-auto py-6">
      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 grid-flow-row-dense max-w-4xl">
        {exploreList?.map((post) => (
          <div
            key={post._id}
            onClick={() => {
              handleViewComments(post._id);
            }}
            className={`
              ${post.media_type.startsWith("image/") ? "" : "row-span-2" } cursor-pointer`
            }>
            {post.media_type.startsWith("image/") && (
              <img
                src={post.media_url}
                alt="Post"
                className="w-full h-full object-cover hover:bg-gray-500"
              />
            )}
            {post.media_type.startsWith("video/") && (
              <video
                controls={false}
                className="w-full h-full object-cover hover:bg-gray-500 row-span-2">
                <source src={post.media_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          //   <div key={post.id} className="bg-white rounded-md shadow-md hover:bg-gray-500">
          //     {post.image && (
          //       <img
          //         src={post.url}
          //         alt="Post"
          //         className="w-full h-fit object-cover rounded-t-md hover:bg-gray-500"
          //       />
          //     )}
          //     {post.video && (
          //       <video
          //         controls={false}
          //         className="w-full h-fit object-cover rounded-t-md hover:bg-gray-500">
          //         <source src={post.url} type="video/mp4" />
          //         Your browser does not support the video tag.
          //       </video>
          //     )}
          //     {/* <Contents media_type={post.media_type} media_url={post.url}/> */}
          //     {/* <div className="p-4">
          //       <div className="flex items-center justify-between">
          //         <div>
          //           <span className="text-lg font-semibold">
          //             Likes: {post.likes}
          //           </span>
          //         </div>
          //         <div>
          //           <span className="text-lg font-semibold">
          //             Comments: {post.comments}
          //           </span>
          //         </div>
          //       </div>
          //     </div> */}
          //   </div>
        ))}
      </div>
      <Comments
        postId={postId}
        show={comments}
        closeModal={() => setComments(false)}
      />
    </div>
  );
}

export default Explore;
