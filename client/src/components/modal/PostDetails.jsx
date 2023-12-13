import React, { useContext, useEffect } from "react";
import PortalModal from "../uiPrimitives/modal/PortalModal";
import { UserActionContext } from "../../services/providers/UserActionContext";
import useSocialAction from "../../hooks/useSocialAction";

function PostDetails({ postDetail, setPostDetails }) {
  const { userData } = useContext(UserActionContext);
  const { handleDeletePost, handlePostEdit } = useSocialAction();
  if (!postDetail) return null;
  return (
    <PortalModal>
      <div
        className="fixed inset-0"
        onClick={() => setPostDetails(false)}></div>
      <div className="relative  flex flex-col bg-white w-1/2 lg:w-1/5 lg:h-fit justify-center items-center border shadow-lg rounded-md z-10">
        {postDetail.user[0]._id == userData._id && (
          <>
            <div
              onClick={()=>handlePostEdit(postDetail._id)}
              className="w-full border-b text-center p-4  font-semibold text-sm cursor-pointer hover:bg-gray-100">
              Edit
            </div>
            <div
              onClick={() => handleDeletePost(postDetail._id)}
              className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer text-red-500 hover:bg-gray-100">
              Delete
            </div>
          </>
        )}
        {postDetail.user[0]._id != userData._id && (
          <div className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer text-red-500 hover:bg-gray-100">
            Unfollow
          </div>
        )}
        <div className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer hover:bg-gray-100">
          Share
        </div>
        <div className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer hover:bg-gray-100">
          Save
        </div>
        <div className="w-full text-center p-4 font-semibold text-sm cursor-pointer hover:bg-gray-100">
          About this account
        </div>
      </div>
    </PortalModal>
  );
}

export default PostDetails;
