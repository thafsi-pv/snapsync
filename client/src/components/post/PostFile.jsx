import React from "react";

function PostFile({
  media_type,
  media_url,
  extra,
  autoplay = false,
  loop = false,
}) {
  if (!media_type && !media_url) return null;
  return (
    <>
      {media_type.startsWith("image/") ? (
        <img
          src={media_url}
          id="Element3"
          className={`relative  object-fit max-w-3xl lg:rounded-l-md h-full  w-fit max-h-fit ${extra}`}
        />
      ) : (
        <video
          src={media_url}
          controls
          autoPlay={autoplay}
          loop={loop}
          playsInline
          poster={media_url.replace(/\.mp4$/, ".jpg")}
          className={`relative  max-w-xl xl:max-h-full  lg:rounded-l-md   bg-black ${extra}`}
        />
      )}
    </>
  );
}

export default PostFile;
