import React, { useContext, useEffect } from "react";
import PortalModal from "../uiPrimitives/modal/PortalModal";
import { UserActionContext } from "../../services/providers/UserActionContext";
import useSocialAction from "../../hooks/useSocialAction";

function PostDetails({ postDetail, setPostDetails }) {
  console.log(
    "🚀 ~ file: PostDetails.jsx:7 ~ PostDetails ~ postDetail:",
    postDetail
  );
  const { userData } = useContext(UserActionContext);
  console.log(
    "🚀 ~ file: PostDetails.jsx:8 ~ PostDetails ~ userDetails:",
    userData
  );

  if (!postDetail) return null;
  return (
    <PortalModal>
      <div
        className="fixed inset-0"
        onClick={() => setPostDetails(false)}></div>
      <div className="relative  flex flex-col bg-white w-1/2 lg:w-1/5 lg:h-fit justify-center items-center border shadow-lg rounded-md z-10">
        {postDetail.user[0]._id == userData._id && (
          <>
            {" "}
            <div className="w-full border-b text-center p-4  font-semibold text-sm cursor-pointer">
              Edit
            </div>
            <div className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer text-red-500">
              Delete
            </div>
          </>
        )}
        {postDetail.user[0]._id != userData._id && (
          <div className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer text-red-500">
            Unfollow
          </div>
        )}
        <div className="w-full border-b text-center p-4 font-semibold text-sm cursor-pointer">
          Share
        </div>
        <div className="w-full text-center p-4 font-semibold text-sm cursor-pointer">
          About this account
        </div>
      </div>
    </PortalModal>
  );
}

export default PostDetails;
