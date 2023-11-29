import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function NextPrevButton({ onClick, side }) {
  return (
    <div
      className={`sticky top-9 ${side=='left'?'left-5':'right-5'} bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-gray-200 z-10 hidden lg:block`}
      onClick={onClick}>
      {side == "left" ? <BiChevronLeft /> : <BiChevronRight />}
    </div>
  );
}

export default NextPrevButton;
