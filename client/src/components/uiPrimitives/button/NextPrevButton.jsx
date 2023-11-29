import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function NextPrevButton({ onClick, side }) {
  return (
    <div
      className="hidden md:sticky lg:sticky top-9 left-5 bg-white p-1 rounded-full shadow-xl cursor-pointer hover:bg-gray-200 z-10"
      onClick={() => onClick}>
      {side == "left" ? <BiChevronLeft /> : <BiChevronRight />}
    </div>
  );
}

export default NextPrevButton;
