import React from "react";
import PortalModal from "../uiPrimitives/modal/PortalModal";

function PostDetails({ postDetail, setPostDetails }) {
  if (!postDetail) return null;
  return (
    <PortalModal>
      <div
        className="fixed inset-0  "
        onClick={() => setPostDetails(false)}></div>
      <div className="flex flex-col bg-white w-1/6 h-1/3 justify-center items-center border shadow-lg rounded-md z-10">
        <div className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer">
          Edit
        </div>
        <div className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer text-red-500">
          Delete
        </div>
        <div className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer text-red-500">
          Unfollow
        </div>
        <div className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer">
          Share
        </div>
        <div className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer">
          About this account{" "}
        </div>
      </div>
    </PortalModal>
  );
}

export default PostDetails;
