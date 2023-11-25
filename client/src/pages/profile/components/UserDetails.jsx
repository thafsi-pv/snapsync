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
    <div className="flex flex-col justify-between items-start lg:ml-20 w-full ">
      <div className="flex">
        <div className=" m-6 ">
          {profile && (
            <UserImage
              id={profile?._id}
              imgUrl={profile?.imageUrl}
              extra="lg:w-44 lg:h-44 "
              imgStyle="!p-3 lg:!p-4"
              username={profile?.userName}
            />
          )}
        </div>

        <div className="flex flex-col gap-4 w-2/3 items-start text-sm ">
          <div className="self-stretch flex flex-row ml-px gap-2 items-start flex-wrap">
            <div className="text-xl">{profile?.fullName}</div>
            <div className="bg-[rgba(217,_217,_217,_0.4)] flex flex-col justify-center  p-2 items-center rounded-lg">
              <Link to="/accounts/edit">
                <div className="text-xs ">Edit profile</div>
              </Link>
            </div>

            <div className="flex flex-row gap-2 shrink-0 items-start">
              <img
                src="https://file.rendit.io/n/uXmNQrw03s12xLMCnK7x.svg"
                id="Settingsline"
                className=" w-8 shrink-0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-6 lg:gap-10  items-start p-2">
              <div className="text-base font-semibold text-center">
                {postCount} <span className="font-normal">posts</span>
              </div>
              <div
                className="text-base font-semibold cursor-pointer text-center"
                onClick={() => handleFollowersOring("followed")}>
                {profile?.followedCount}{" "}
                <span className="font-normal">followers</span>
              </div>
              <div
                className="text-base font-semibold cursor-pointer text-center"
                onClick={() => handleFollowersOring("following")}>
                {profile?.followingCount}{" "}
                <span className="font-normal">following</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 lg:ml-52 lg:-mt-28 lg:mb-10">
        <div className="flex flex-col gap-1 items-start ml-px mr-20">
          <div className="text-lg">{profile?.userName}</div>
          <div className="self-stretch flex flex-col gap-px items-start">
            <div className=" text-[#a7a1a1]">UI/UX desginer</div>
            <div className="text-sm">Front end developer & Game Desginer</div>
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
