import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function AllCaughtUp() {
  return (
    <div className="flex flex-col justify-center items-center p-5">
      <IoMdCheckmarkCircleOutline className="w-20 h-20 text-green-600" />
      <p className="text-center text-gray-500">You're All Caught Up!</p>
    </div>
  );
}

export default AllCaughtUp;
