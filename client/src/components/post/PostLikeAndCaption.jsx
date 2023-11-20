import React from "react";

function PostLikeAndCaption({ post, posts, setPosts, index }) {
  const handleMoreCaption = (index) => {
    const data = [...posts];
    data[index].showFullCaption = true;
    setPosts(data);
  };
  return (
    <div className="self-stretch flex gap-2 flex-col items-start">
      <div className="relative flex text-sm font-semibold ">
        {post.likeCount} likes
      </div>
      <div className=" gap-2 items-start  text-sm">
        <span
          className={`bold text-[#262626] ${
            post.showFullCaption ? "line-clamp-none" : "line-clamp-2"
          }`}>
          <span className=" font-semibold text-[#262626]">
            {post?.user[0]?.fullName}
          </span>
          {post.caption}
        </span>
        {post.caption.length > 50 && !post.showFullCaption && (
          <span
            className="text-[#8e8e8e] cursor-pointer"
            onClick={() => handleMoreCaption(index)}>
            more
          </span>
        )}
      </div>
    </div>
  );
}

export default PostLikeAndCaption;
