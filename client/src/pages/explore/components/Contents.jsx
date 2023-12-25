import React from "react";

function Contents({ post, handleViewComments }) {
  console.log("🚀 ~ file: Contents.jsx:4 ~ Contents ~ post:", post);
  if (!post) return null;
  return (
    <div
      key={post?._id}
      onClick={() => {
        handleViewComments(post?._id);
      }}
      className={`
              ${
                post?.files[0]?.fileType?.startsWith("image/") ? "" : "row-span-2"
              } cursor-pointer`}>
      {post.files[0]?.fileType?.startsWith("image/") && (
        <img
          src={post.files[0].fileUrl}
          alt="Post"
          className="w-full h-full object-cover hover:bg-gray-500"
        />
      )}
      {post?.files[0]?.fileType?.startsWith("video/") && (
        <video
          controls={false}
          className="w-full h-full object-cover hover:bg-gray-500 row-span-2">
          <source src={post?.files[0]?.fileUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

export default Contents;
