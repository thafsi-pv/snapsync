import React, { useContext } from "react";
import ReelIcon from "../../../assets/svg/ReelIcon";
import { UserActionContext } from "../../../services/providers/UserActionContext";
import Comments from "../../homepage/modal/Comments";
import { BsGrid3X3 } from "react-icons/bs";
import { Loading } from "../../../assets/svg/Loading";
import { axiosInstance } from "../../../services/api/axiosInterceptor";
import { GET_SAVED_POST_API } from "../../../services/api/const";

function UserPosts({ posts, setPosts, type, setType }) {
  console.log("🚀 ~ file: UserPosts.jsx:11 ~ UserPosts ~ posts:", posts)
  const { comments, setComments, postId, setPostId } =
    useContext(UserActionContext);

  const handleViewComments = (postId) => {
    setComments(true);
    setPostId(postId);
  };

  const handleSavedPost = async () => {
    setType(3);
    
  };

  return (
    <div className="w-full text-sm font-medium text-center text-gray-500 border-t border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mt-px justify-center gap-6">
        <li
          className="mr-2 flex justify-center items-center"
          onClick={() => setType(0)}>
          <BsGrid3X3 className="w-3 shrink-0" />
          <a
            href="#"
            className={`inline-block p-2 border-t-2  hover:text-gray-600 text-xs font-semibold ${
              type == 0
                ? " text-blue-600 border-t-2 border-blue-600"
                : "border-transparent"
            }`}>
            POSTS
          </a>
        </li>
        <li
          className="mr-2 flex justify-center items-center"
          onClick={() => setType(1)}>
          <ReelIcon className="w-4 shrink-0" outline={true} />
          <a
            href="#"
            className={`inline-block p-2   hover:text-gray-600 text-xs font-semibold  ${
              type == 1
                ? " text-blue-600 border-t-2 border-blue-600"
                : "border-transparent"
            }`}
            aria-current="page">
            REELS
          </a>
        </li>
        <li className="flex " onClick={handleSavedPost}>
          <img
            src="https://file.rendit.io/n/LDe6sBzq16q9E7Pc61H1.svg"
            className="w-4 shrink-0"
          />
          <a
            href="#"
            className={`inline-block p-2 border-t-2 hover:text-gray-600 text-xs font-semibold ${
              type == 3
                ? " text-blue-600 border-t-2 border-blue-600"
                : "border-transparent"
            }`}>
            SAVED
          </a>
        </li>
      </ul>
      <div className="flex justify-center items-center mt-4">
        {posts?.length > 0 ? (
          <div className=" columns-3 gap-1 grid grid-cols-3">
            {posts?.map((post) =>
              post.media_type.startsWith("image/") ? (
                <img
                  className="h-72 w-72 py-[1px] aspect-video"
                  src={post.media_url}
                  alt=""
                  onClick={() => {
                    handleViewComments(post._id);
                  }}
                />
              ) : (
                <div
                  className="relative"
                  onClick={() => {
                    handleViewComments(post._id);
                  }}>
                  <div className="absolute right-3 top-2 ">
                    <ReelIcon color="#ffffff" />
                  </div>
                  <video
                    className="h-72 w-72 py-[1px] object-cover"
                    src={post.media_url}></video>
                </div>
              )
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <Comments
        postId={postId}
        show={comments}
        closeModal={() => setComments(false)}
      />
    </div>
  );
}

export default UserPosts;
