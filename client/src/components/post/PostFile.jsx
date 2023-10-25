import React from "react";

function PostFile({ media_type, media_url }) {
  if (!media_type && !media_url) return null;
  return (
    <>
      {media_type.startsWith("image/") ? (
        <img src={media_url} id="Element3" className="relative rounded-sm" />
      ) : (
        <video
          src={media_url}
          controls="false"
          autoPlay
          className="object-fit w-full h-full rounded-sm"
        />
      )}
    </>
  );
}

export default PostFile;
