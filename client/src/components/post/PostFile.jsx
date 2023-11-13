import React from "react";

function PostFile({
  media_type,
  media_url,
  extra,
  autoplay = false,
  loop = false,
}) {
  console.log("🚀 ~ file: PostFile.jsx:10 ~ media_url:", media_url)
  if (!media_type && !media_url) return null;
  return (
    <>
      {media_type.startsWith("image/") ? (
        <img
          src={media_url}
          id="Element3"
          className={`relative  object-fit max-w-3xl rounded-l-md h-full  w-fit max-h-fit ${extra}`}
        />
      ) : (
        <video
          src={media_url}
          controls
          autoPlay={autoplay}
          loop={loop}
          className={`relative  max-w-xl xl:max-h-full  rounded-l-md   bg-black ${extra}`}
        />
      )}
    </>
  );
}

export default PostFile;
