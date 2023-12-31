import React, { Suspense, lazy, useContext } from "react";
import { BsGrid3X3 } from "react-icons/bs";
import MultiPostIcon from "../../../assets/svg/MultiPostIcon";
import ReelIcon from "../../../assets/svg/ReelIcon";
const Comments = lazy(() => import("../../../components/modal/Comments"));
import { UserActionContext } from "../../../services/providers/UserActionContext";
import { Loading } from "../../../assets/svg/Loading";

function UserPosts({ posts, type, setType, userId }) {
  const { userData, comments, setComments, postId, setPostId } =
    useContext(UserActionContext);

  const handleViewComments = (postId) => {
    setComments(true);
    setPostId(postId);
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
        {userData._id == userId && (
          <li className="flex " onClick={() => setType(3)}>
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
        )}
      </ul>
      <div className="flex justify-center items-center mt-4">
        {posts?.length > 0 ? (
          <div className=" columns-3 gap-0.5 grid grid-cols-3">
            {posts?.map(
              (post) => (
                // post.media_type.startsWith("image/") ? (
                //   <img
                //     className="h-72 w-72 py-[1px] aspect-video"
                //     src={post.media_url}
                //     alt=""
                //     onClick={() => {
                //       handleViewComments(post._id);
                //     }}
                //   />
                // ) : (
                <div
                  className="relative"
                  onClick={() => {
                    handleViewComments(post._id);
                  }}>
                  {post.files.length == 1 &&
                    post.files[0].fileType.startsWith("video/") && (
                      <div className="absolute right-3 top-2 ">
                        <ReelIcon color="#ffffff" />
                      </div>
                    )}
                  {post.files.length > 1 && (
                    <div className="absolute right-3 top-2 ">
                      <MultiPostIcon color="#ffffff" />
                    </div>
                  )}
                  {/* <video
                    className="h-72 w-72 py-[1px] object-cover"
                    src={post.media_url}></video> */}
                  <img
                    className="h-36 lg:h-72 lg:w-72 py-[0px] aspect-video object-cover"
                    src={post.files[0].fileUrl.replace(/\.mp4$/, ".jpg")}
                    alt=""
                    onClick={() => {
                      handleViewComments(post._id);
                    }}
                  />
                </div>
              )
              // )
            )}
          </div>
        ) : (
          <div>
            <p className="text-gray-400">No data found</p>
          </div>
        )}
      </div>
      <Suspense fallback={<Loading />}>
        <Comments
          postId={postId}
          show={comments}
          closeModal={() => setComments(false)}
        />
      </Suspense>
    </div>
  );
}

export default UserPosts;
