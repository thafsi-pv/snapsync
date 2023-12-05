import React, { useContext } from "react";
import SettingsIcon from "../../../assets/svg/SettingsIcon";
import AddUserIcon from "../../../assets/svg/AddUserIcon";
import { UserActionContext } from "../../../services/providers/UserActionContext";
import { IoChevronBack } from "react-icons/io5";

function ProfileHeader({ isOwnProfile }) {
  const { setMore } = useContext(UserActionContext);
  console.log(
    "🚀 ~ file: ProfileHeader.jsx:6 ~ ProfileHeader ~ isOwnProfile:",
    isOwnProfile
  );
  return (
    <div className="flex  p-2 justify-end w-full border-b" id="profileHeaderId">
      {isOwnProfile ? (
        <>
          <div
            className="flex items-start hover:bg-gray-100 rounded-lg w-full cursor-pointer"
            onClick={() => setMore(true)}>
            <SettingsIcon className="w-12" />
          </div>
          <div className="flex items-end hover:bg-gray-100 rounded-lg  cursor-pointer">
            <div className="relative">
              <AddUserIcon />
            </div>
          </div>
        </>
      ) : (
        <div
          className="flex items-start hover:bg-gray-100 rounded-lg w-full cursor-pointer"
          onClick={() => window.history.back()}>
          <IoChevronBack className="w-12" />
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
