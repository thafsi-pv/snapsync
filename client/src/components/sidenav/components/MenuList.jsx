import React, { useContext, useState } from "react";
import { AiFillHome, AiOutlineCompass, AiOutlineSearch } from "react-icons/ai";
import { BiSolidMoviePlay } from "react-icons/bi";
import { Link } from "react-router-dom";
import { UserActionContext } from "../../../services/providers/UserActionContext";
import { SocketContext } from "../../../services/providers/SocketContext";
import useNotification from "../../../hooks/useNotification";
import AddPostIcon from "../../../assets/svg/AddPostIcon";
import LikeButton from "../../../assets/svg/LikeButton";
import HeartIcon from "../../../assets/svg/HeartIcon";
import MessengerIcon from "../../../assets/svg/MessengerIcon";
import HomeIcon from "../../../assets/svg/HomeIcon";
import SearchIcon from "../../../assets/svg/SearchIcon";
import ReelIcon from "../../../assets/svg/ReelIcon";
import { getIdFromUrl } from "../../../utils/getIdFromUrl";
import AddPopover from "../../popover/AddPopover";

function MenuList({ showMenuName }) {
  const {
    userData,
    setAddPost,
    navbar,
    setNavbar,
    setAddStory,
    searchBar,
    setSearchBar,
    notificationBar,
    setNotificationBar,
    popover,
    setPopover,
  } = useContext(UserActionContext);
  const { newMessageNotif } = useContext(SocketContext);
  const { notification } = useNotification();

  const handleSearch = () => {
    if (searchBar == false) {
      setSearchBar(true);
      setNavbar("hidden");
    } else {
      setSearchBar(false);

      const currentURL = window.location.href;
      const id = getIdFromUrl(currentURL);
      if (id != "inbox") {
        setNavbar("block");
      }
    }
    // const navbar = "hidden";
  };
  const handleNoti = () => {
    if (notificationBar == false) {
      setNotificationBar(true);
      setNavbar("hidden");
    } else {
      setNotificationBar(false);
      const currentURL = window.location.href;
      const id = getIdFromUrl(currentURL);
      if (id != "inbox") {
        setNavbar("block");
      }
    }
    // const navbar = "hidden";
  };

  const handleclose = () => {
    setPopover(false);
  };
  const handleOnClick = () => {
    setSearchBar(false);
    setNotificationBar(false);
  };
  return (
    <>
      <Link to="/" onClick={handleOnClick}>
        <div className="flex items-center gap-3 hover:bg-gray-100 p-2 lg:p-4 rounded-lg w-full cursor-pointer">
          {/* <AiFillHome className="h-7 w-7" /> */}
          <HomeIcon />
          {showMenuName && <p className={`font-semibold ${navbar} `}>Home</p>}
        </div>
      </Link>
      <div
        className="flex items-center gap-3 hover:bg-gray-100 p-2 lg:p-4 rounded-lg  cursor-pointer"
        onClick={handleSearch}>
        {/* <AiOutlineSearch className="h-7 w-7" /> */}
        <SearchIcon />
        {showMenuName && <p className={`font-normal ${navbar}`}>Search</p>}
      </div>
      <Link
        to="/explore"
        className="hidden md:block lg:block"
        onClick={handleOnClick}>
        <div className="flex items-center gap-3 hover:bg-gray-100 p-2 lg:p-4 rounded-lg w-full cursor-pointer">
          <AiOutlineCompass className="h-7 w-7" />
          {showMenuName && <p className={`font-normal ${navbar}`}>Explore</p>}
        </div>
      </Link>
      <Link to="/reels">
        <div className="flex items-center gap-3 hover:bg-gray-100 p-2 lg:p-4 rounded-lg  cursor-pointer">
          {/* <BiSolidMoviePlay className="h-7 w-7" /> */}
          <ReelIcon color="black" outline={true} className="w-6 h-6" />
          {showMenuName && <p className={`font-normal ${navbar}`}>Reels</p>}
        </div>
      </Link>
      <Link to={`direct/inbox`} onClick={handleOnClick}>
        <div className=" flex items-center gap-3 hover:bg-gray-100 p-2 lg:p-4 rounded-lg w-full cursor-pointer">
          <div className="relative">
            {/* <img
              src="https://file.rendit.io/n/UK7bE1RkhuFEzt0TXV09.svg"
              className="w-6 shrink-0"
            /> */}
            <MessengerIcon />
            {newMessageNotif > 0 && (
              <p className="absolute -right-2 -top-2 bg-red-500 rounded-full w-5 h-5 text-white text-xs text-center border-2 border-white">
                {newMessageNotif}
              </p>
            )}
          </div>
          {showMenuName && <p className={`font-normal ${navbar}`}>Messages</p>}
        </div>
      </Link>
      <div
        className="hidden lg:flex items-center gap-3 hover:bg-gray-100 p-2 lg:p-4 rounded-lg w-full cursor-pointer"
        onClick={handleNoti}>
        <div className="relative">
          <img
            src="https://file.rendit.io/n/rUqLdTtW8OUyBPEOsSWF.svg"
            className="w-6 shrink-0"
          />
          {notification?.length > 0 &&
            notification.map(() => (
              <p
                key={notification[0]._id}
                className="absolute -right-2 -top-2 bg-red-500 rounded-full w-5 h-5 text-white text-xs text-center border-2 border-white ping-animation">
                {notification?.length}
              </p>
            ))}
        </div>
        {showMenuName && (
          <p className={`font-normal ${navbar}`}>Notification</p>
        )}
      </div>
      <div className="relative hidden lg:flex items-center w-full ">
        <div
          onClick={() => setPopover((prev) => !prev)}
          className="relative flex w-full h-full  gap-3 hover:bg-gray-100 lg:p-4 rounded-lg cursor-pointer">
          <img
            src="https://file.rendit.io/n/Qw8xabla0WV1dzCWjhDr.svg"
            className="mb-1 w-6 shrink-0"
          />
          {showMenuName && <p className={`font-normal ${navbar}`}>Create</p>}
        </div>
        {popover && (
          <div className="absolute top-0 -right-20 -mt-[80px] -mr-9 w-full z-[9]">
            <AddPopover handleclose={handleclose} />
          </div>
        )}
      </div>
      <Link to={`/${userData?.userName}`} onClick={handleOnClick}>
        <div className="flex items-center gap-3 hover:bg-gray-100 p-2 lg:p-4 rounded-lg w-full cursor-pointer">
          <img
            src={userData?.imageUrl}
            alt=""
            className="w-7 h-7 rounded-full"
          />
          {showMenuName && <p className={`font-normal ${navbar}`}>Profile</p>}
        </div>
      </Link>
    </>
  );
}

export default MenuList;

export const TopSmMenuList = () => {
  const {
    setAddPost,
    notificationBar,
    setNotificationBar,
    navbar,
    setNavbar,
    popover,
    setPopover,
  } = useContext(UserActionContext);
  const { notification } = useNotification();

  const handleNoti = () => {
    if (notificationBar == false) {
      setNotificationBar(true);
      setNavbar("hidden");
    } else {
      setNotificationBar(false);
      setNavbar("block");
    }
    // const navbar = "hidden";
  };
  const handleclose = () => {
    setPopover(false);
  };
  return (
    <div className="flex gap-px p-1">
      {/* <div
        className="flex items-center hover:bg-gray-100 rounded-lg w-full cursor-pointer"
        onClick={() => setAddPost(true)}>
        <AddPostIcon className="w-12" /> */}
      {/* {showMenuName && <p className={`font-normal ${navbar}`}>Create</p>} */}
      {/* </div> */}
      <div className="relative flex items-center w-full ">
        <div
          onClick={() => setPopover((prev) => !prev)}
          className="relative flex w-full h-full  gap-3 hover:bg-gray-100 lg:p-4 rounded-lg cursor-pointer">
          <AddPostIcon className="w-12" />
        </div>
        {popover && (
          <div className="fixed top-0 right-0 z-[9] ">
            <AddPopover handleclose={handleclose} />
          </div>
        )}
      </div>
      <div
        className="flex items-center hover:bg-gray-100 rounded-lg w-full cursor-pointer"
        onClick={handleNoti}>
        <div className="relative">
          {/* <img
            src="https://file.rendit.io/n/rUqLdTtW8OUyBPEOsSWF.svg"
            className="w-6 shrink-0"
          /> */}
          <HeartIcon />
          {notification?.length > 0 &&
            notification.map(() => (
              <p
                key={notification[0]._id}
                className="absolute -right-2 -top-2 bg-red-500 rounded-full w-5 h-5 text-white text-xs text-center border-2 border-white ping-animation">
                {notification?.length}
              </p>
            ))}
        </div>
        {/* {showMenuName && <p className={`font-normal ${navbar}`}>Notification</p>} */}
      </div>
    </div>
  );
};
