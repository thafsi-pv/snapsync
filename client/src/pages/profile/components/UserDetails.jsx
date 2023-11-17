import React, { memo, useState } from "react";
import UserImage from "../../../components/user/UserImage";
import { Link } from "react-router-dom";
import Followers from "./Followers";

let listType = "";
function UserDetails({ profile, postCount }) {
  const [showModal, setShowModal] = useState(false);

  const handleFollowersOring = (type) => {
    listType = type;
    setShowModal(true);
  };

  return (
    <div className="flex flex-row justify-between items-start ml-20 w-full ">
      <div className=" m-6 ">
        {profile && (
          <UserImage
            id={profile?._id}
            imgUrl={profile?.imageUrl}
            extra="w-44 h-44"
            imgStyle="!p-4"
            username={profile?.userName}
          />
        )}
      </div>
      <div className="flex flex-col gap-8 w-2/3 items-start text-sm">
        <div className="self-stretch flex flex-row ml-px gap-2 items-start">
          <div className="flex flex-row mt-1 gap-3 w-full items-center">
            <div className="text-xl">{profile?.fullName}</div>
            <div className="flex flex-row gap-2 w-1/2 items-center">
              <div className="bg-[rgba(217,_217,_217,_0.4)] flex flex-col justify-center w-1/2 p-2 items-center rounded-lg">
                <Link to="/accounts/edit">
                  {" "}
                  <div className="text-xs ">Edit profile</div>
                </Link>
              </div>
              <div className="bg-[rgba(217,_217,_217,_0.4)] flex flex-col justify-center w-1/2 p-2 items-center rounded-lg">
                <div className="text-xs ">View archive</div>
              </div>
              <div className="flex flex-row gap-2 shrink-0 items-start">
                <img
                  src="https://file.rendit.io/n/uXmNQrw03s12xLMCnK7x.svg"
                  id="Settingsline"
                  className=" w-8 shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-row gap-10 items-start">
            <div className="text-sm font-semibold">{postCount} posts</div>
            <div
              className="text-sm font-semibold cursor-pointer"
              onClick={() => handleFollowersOring("followed")}>
              {profile?.followedCount} followers
            </div>
            <div
              className="text-sm font-semibold"
              onClick={() => handleFollowersOring("following")}>
              {profile?.followingCount} following
            </div>
          </div>
          <div className="flex flex-col gap-1 items-start ml-px mr-20">
            <div className="text-lg">{profile?.userName}</div>
            <div className="self-stretch flex flex-col gap-px items-start">
              <div className=" text-[#a7a1a1]">UI/UX desginer</div>
              <div className="text-sm">Front end developer & Game Desginer</div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Followers
          listType={listType}
          userName={profile?.userName}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default memo(UserDetails);
