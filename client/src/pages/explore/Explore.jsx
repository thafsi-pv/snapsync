import React, { useContext, useEffect, useState } from "react";
import { ENTIRE_API } from "../../services/api/const";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { UserActionContext } from "../../services/providers/UserActionContext";
import Comments from "../../components/modal/Comments";

function Explore() {
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
              ${
                post.media_type.startsWith("image/") ? "" : "row-span-2"
              } cursor-pointer`}>
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
