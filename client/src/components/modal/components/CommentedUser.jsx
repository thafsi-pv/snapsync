import React from "react";
import { timeAgo } from "../../../utils/timeAgo";
import UserImage from "../../user/UserImage";

function CommentedUser({cmt}) {
  return (
    <div key={cmt._id} className="bg-cover flex w-full items-start p-1 gap-3">
      <div className="flex-0">
        <UserImage
          id={cmt.user._id}
          imgUrl={cmt.user.imageUrl}
          username={cmt.user.userName}
          extra="w-12 p-0"
          imgStyle="p-0"
        />
      </div>
      <div className="flex-1 w-[90%] ">
        <div className=" flex flex-wrap  items-start  text-sm gap-2">
          <span className=" font-semibold text-[#262626]">
            {cmt.user?.fullName}
          </span>
          {cmt.comment}
        </div>
        <span className="text-xs text-gray-400">{timeAgo(cmt.createdAt)}</span>
      </div>
    </div>
  );
}

export default CommentedUser;
