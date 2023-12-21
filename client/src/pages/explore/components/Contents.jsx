import React from "react";

function Contents({ post, handleViewComments }) {
  if (!post) return null;
  return (
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
  );
}

export default Contents;
