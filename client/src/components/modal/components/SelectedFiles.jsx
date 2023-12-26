import React from "react";
import useHandleMedia from "../../../hooks/useHandleMedia";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function SelectedFiles({
  media,
  itemref,
  itemNo,
  setItemNo,
  isEditPost,
  handleImageRemove,
}) {
  const { handleScrollz } = useHandleMedia();
  return (
    <div className="lg:w-full lg:h-full relative flex justify-center bg-black overflow-scroll">
      <div className="relative flex flex-col items-center w-full">
        <div
          className={`flex overflow-scroll items-center w-full relative bg-black  scrollbar-hide`}
          ref={itemref}>
          {media.map((med, index) => (
            <div className="lg:w-full lg:h-full relative flex justify-center">
              {!isEditPost && (
                <AiOutlineClose
                  className="absolute  h-5 w-5 text-black right-5 top-3 bg-white rounded-full p-1 shadow-lg cursor-pointer hover:bg-gray-100 z-10"
                  onClick={() => handleImageRemove(index)}
                />
              )}
              {med}
            </div>
          ))}
        </div>
        {itemNo < media.length - 1 && (
          <div
            className="absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointers"
            onClick={() => handleScrollz(480, itemref, itemNo, setItemNo)}>
            <FaAngleRight className="w-5 h-5 text-black bg-white rounded-full bg-opacity-60 shadow-md p-0.5 cursor-pointer" />
          </div>
        )}
        {itemNo > 0 && (
          <div
            className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointers"
            onClick={() => handleScrollz(480, itemref, itemNo, setItemNo)}>
            <FaAngleLeft className="w-5 h-5 text-black bg-white rounded-full bg-opacity-60 shadow-md p-0.5 cursor-pointer" />
          </div>
        )}
        {media.length > 1 && (
          <div className="absolute  bottom-2 transform -translate-y-1/2 cursor-pointers flex gap-1">
            {media.map((item, ind) => (
              <div
                className={`h-1.5 w-1.5 rounded-full  ${
                  itemNo == ind ? `bg-white` : `bg-gray-400`
                }`}></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectedFiles;
