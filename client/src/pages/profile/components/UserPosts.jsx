import React from "react";
import ReelIcon from "../../../assets/svg/ReelIcon";

function UserPosts({posts}) {
  return (
    <div className="w-full text-sm font-medium text-center text-gray-500 border-t border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mt-px justify-center gap-6">
        <li className="mr-2">
          <a
            href="#"
            className="inline-block p-4 border-t-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
            POSTS
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#"
            className="inline-block p-4 text-blue-600 border-t-2 border-blue-600 rounded-b-lg active dark:text-blue-500 dark:border-blue-500"
            aria-current="page">
            REELS
          </a>
        </li>
        <li className="mr-2 flex ">
          <img
            src="https://file.rendit.io/n/LDe6sBzq16q9E7Pc61H1.svg"
            className="w-4 shrink-0"
          />
          <a
            href="#"
            className="inline-block p-4 pl-1 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
            SAVED
          </a>
        </li>
      </ul>
      <div className="flex justify-center items-center">
        <div className=" columns-3 gap-1">
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
                  <ReelIcon />
                </div>
                <video
                  className="h-72 w-72 py-[1px] object-cover"
                  src={post.media_url}></video>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPosts;
