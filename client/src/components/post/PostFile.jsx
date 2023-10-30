import React from "react";

function PostFile({ media_type, media_url }) {
  if (!media_type && !media_url) return null;
  return (
    <>
      {media_type.startsWith("image/") ? (
        <img
          src={media_url}
          id="Element3"
          className="relative rounded-sm w-fit max-w-[500px] max-h-[500px] "
        />
      ) : (
        <video
          src={media_url}
          controls
          autoPlay={true}
          loop={true}
          className="relative object-fit w-full h-full rounded-sm  max-h-fit bg-black"
        />
      )}
    </>
  );
}

export default PostFile;
