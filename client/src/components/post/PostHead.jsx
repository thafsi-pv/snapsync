import React, { memo } from "react";
import UserImgName from "../user/UserImgName";
import { IoIosMore } from "react-icons/io";
import { timeAgo } from "../../utils/timeAgo";
import VerifiedBadgeIcon from "../../assets/svg/VerifiedBadgeIcon";
import useSocialAction from "../../hooks/useSocialAction";

function PostHead({ post, setPostDetails }) {
  const handlePostDetails = () => {
    setPostDetails(post);
  };
  return (
    <div className="flex flex-row justify-between items-center mb-2 lg:px-0 px-1">
      <div className="flex flex-row gap-3 items-start w-full">
        <div className="flex gap-3 w-full items-center">
          <UserImgName
            fullName={post.user[0].fullName}
            desc={post.location}
            extra="w-12 h-12"
            id={post.user[0]._id}
            username={post.user[0].userName}
            imgUrl={post.user[0].imageUrl}
          />
          {post.user[0].isVerified && (
            <div className="-mt-3">
              <VerifiedBadgeIcon />
            </div>
          )}
          <div className="flex items-center text-xs text-gray-400 gap-1 -mt-3">
            <div className="flex justify-center items-center font-bold">•</div>
            <div className=" text-xs font-normal ">
              {timeAgo(post.createdAt)}
            </div>
          </div>
        </div>
      </div>
      <div>
        <IoIosMore className="font-bold text-xl" onClick={handlePostDetails} />
      </div>
    </div>
  );
}

export default memo(PostHead);
