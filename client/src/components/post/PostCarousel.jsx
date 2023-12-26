import React, { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import GradiantHeartIcon from "../../assets/svg/GradiantHeartIcon";
import PostFile from "./PostFile";
import useSocialAction from "../../hooks/useSocialAction";
import { motion } from "framer-motion";

function PostCarousel({ post, index, extraClass = "", extraFileClass, loop }) {
  const itemref = useRef(null);
  const [itemNo, setItemNo] = useState(0);
  const { handleDoubleClick, handleTouchStart, likedId, controls } =
    useSocialAction();

  const handleScrollz = (scrollOffset) => {
    if (itemref.current) {
      itemref.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
    if (scrollOffset === 480 && itemNo < post?.files.length - 1) {
      setItemNo((prev) => prev + 1);
    } else if (scrollOffset === -480 && itemNo > 0) {
      setItemNo((prev) => prev - 1);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center w-full"
      onDoubleClick={() => handleDoubleClick(index, post._id)}
      onTouchStart={() => handleTouchStart(index, post._id)}>
      <div
        className={`flex overflow-scroll items-center w-full relative bg-black  scrollbar-hide ${extraClass}`}
        ref={itemref}>
        {post.files.map((file) => (
          <PostFile
            key={file._id}
            media_url={file.fileUrl}
            media_type={file.fileType}
            extra={`relative  !w-full   bg-black ${extraFileClass}`}
            loop={loop}
          />
        ))}
      </div>

      {likedId == post._id && (
        <div className="absolute inset-1/2 -ml-8 -mt-6 ping-animation ">
          <motion.div
            className={`heart-icon ${likedId ? "liked" : ""}`}
            // onClick={handleClick}
            animate={controls}>
            <GradiantHeartIcon className="" />
          </motion.div>
        </div>
      )}
      {itemNo < post.files.length - 1 && (
        <div
          className="absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointers"
          onClick={() => handleScrollz(480)}>
          <FaAngleRight className="w-5 h-5 text-black bg-white rounded-full bg-opacity-60 shadow-md p-0.5 cursor-pointer" />
        </div>
      )}
      {itemNo > 0 && (
        <div
          className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointers"
          onClick={() => handleScrollz(-480)}>
          <FaAngleLeft className="w-5 h-5 text-black bg-white rounded-full bg-opacity-60 shadow-md p-0.5 cursor-pointer" />
        </div>
      )}
      {post.files.length > 1 && (
        <div className="absolute  bottom-2 transform -translate-y-1/2 cursor-pointers flex gap-1">
          {post.files.map((item, ind) => (
            <div
              key={ind}
              className={`h-1.5 w-1.5 rounded-full  ${
                itemNo == ind ? `bg-white` : `bg-gray-400`
              }`}></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostCarousel;
