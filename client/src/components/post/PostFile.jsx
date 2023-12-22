import React from "react";
import { CiCircleChevRight } from "react-icons/ci";

function PostFile({
  media_type,
  media_url,
  extra,
  autoplay = false,
  loop = false,
  postContainerRef
}) {
  if (!media_type && !media_url) return null;
  return (
    <>
      {media_type.startsWith("image/") ? (
        <div className="relative h-full overflow-x-auto scrollbar-hide" ref={postContainerRef}>
          <div className="flex w-fit relative">
            <img
              src={media_url}
              id="Element3"
              className={`relative object-fit max-w-3xl lg:rounded-l-md h-full w-fit max-h-fit ${extra} m-0 md:mx-5 lg:mx-5`}
            />
            <img
              src={media_url}
              id="Element3"
              className={`relative object-fit max-w-3xl lg:rounded-l-md h-full w-fit max-h-fit ${extra}`}
            />
          </div>
        </div>
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
