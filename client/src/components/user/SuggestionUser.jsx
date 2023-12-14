import React, { useState } from "react";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { FOLLOW_USER } from "../../services/api/const";
import useSocialAction from "../../hooks/useSocialAction";

function SuggestionUser({ user }) {
  const { followedUserId, handleFollowing } = useSocialAction();

  return (
    <div className="flex flex-row gap-4 items-center ml-px">
      <img src={user?.imageUrl} className="w-11 h-11 shrink-0 rounded-full" />
      <div className="flex flex-col gap-1 w-24 shrink-0 flex-grow items-start">
        <p className="text-sm">{user?.fullName}</p>
        <p className="text-xs  text-[#737373]">Snapsync recommended</p>
      </div>
      <div className="items-end flex-grow-0 p-2">
        {user?._id != followedUserId ? (
          <button
            className="text-xs font-semibold text-blue-500 "
            onClick={() => {
              handleFollowing(user._id, true);
            }}>
            Follow
          </button>
        ) : (
          <button
            className="text-xs font-semibold text-gray-500 "
            onClick={() => {
              handleFollowing(user?._id, false);
            }}>
            Unfollow
          </button>
        )}
      </div>
    </div>
  );
}

export default SuggestionUser;
