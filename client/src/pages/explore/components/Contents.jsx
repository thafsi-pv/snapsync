import React from "react";

function Contents({ media_type, media_url }) {
  if (!media_type && !media_url) return null;
  return (
    <>
      {media_type.startsWith("image/") ? (
        <img
          src={media_url}
          id="Element3"
          className="relative max-w-sm max-h-[300px]  object-cover  rounded-l-md h-full  w-fit "
        />
      ) : (
        <video
          src={media_url}
          controls
          autoPlay={true}
          loop={true}
          className="relative  max-w-sm xl:max-h-full  rounded-l-md   bg-black "
        />
      )}
    </>
  );
}

export default Contents;
