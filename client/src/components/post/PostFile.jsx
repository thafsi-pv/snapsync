import React from "react";
import { CiCircleChevRight } from "react-icons/ci";

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
        <div className="min-w-full lg:min-w-[480px] lg:max-w-[480px]">
          <img
            src={media_url}
            id="Element3"
            className={`relative  max-w-xl xl:max-h-full    bg-black ${extra}`}
          />
        </div>
      ) : (
        <div className="min-w-full lg:min-w-[480px] lg:max-w-[480px]">
          <video
            src={media_url}
            controls
            autoPlay={autoplay}
            loop={loop}
            playsInline
            poster={media_url.replace(/\.mp4$/, ".jpg")}
            className={`relative  max-w-xl xl:max-h-full    bg-black ${extra}`}
          />
        </div>
      )}
    </>
  );
}

export default PostFile;
