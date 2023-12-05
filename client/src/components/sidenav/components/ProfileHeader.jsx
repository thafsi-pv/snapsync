import React, { useContext, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import AddUserIcon from "../../../assets/svg/AddUserIcon";
import SettingsIcon from "../../../assets/svg/SettingsIcon";
import Suggestions from "../../../pages/homepage/components/Suggestions";
import { UserActionContext } from "../../../services/providers/UserActionContext";
import PortalModal from "../../uiPrimitives/modal/PortalModal";
import More from "./More";

/**
 * ProfileHeader Component
 * Responsible for show header nav in sm devices only
 * In user own profile shows settings icon and suggestions list
 * other user profile shows back button
 * @param {*} param0
 * @returns
 */

function ProfileHeader({ isOwnProfile }) {
  const { more, setMore } = useContext(UserActionContext);
  const [suggestions, setSuggestions] = useState(false);
  return (
    <div className="flex  p-2 justify-end w-full border-b" id="profileHeaderId">
      {isOwnProfile ? (
        <>
          <div
            className="flex items-start hover:bg-gray-100 rounded-lg w-full cursor-pointer"
            onClick={() => setMore(true)}>
            <SettingsIcon className="w-12" />
          </div>
          <div
            className="flex items-end hover:bg-gray-100 rounded-lg  cursor-pointer"
            onClick={() => setSuggestions((prev) => !prev)}>
            <div className="relative">
              <AddUserIcon />
            </div>
          </div>
          {suggestions && (
            <div className=" w-full z-[9]">
              <PortalModal close={() => setSuggestions(false)}>
                <Suggestions />
              </PortalModal>
            </div>
          )}
        </>
      ) : (
        <div
          className="flex items-start hover:bg-gray-100 rounded-lg w-full cursor-pointer"
          onClick={() => window.history.back()}>
          <IoChevronBack className="w-12" />
        </div>
      )}
      {more && (
        <div className=" w-full z-[9]">
          <PortalModal close={() => setMore(false)}>
            <More more={more} setMore={setMore} />
          </PortalModal>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
