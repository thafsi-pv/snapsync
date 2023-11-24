import React, { useContext } from "react";
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

let search = false;
let noti = false;
function MenuList({ showMenuName }) {
  const { userData, setAddPost, navbar, setAddStory } =
    useContext(UserActionContext);
  const { newMessageNotif } = useContext(SocketContext);
  const { notification } = useNotification();

  const handleSearch = () => {
    if (search == false) {
      search = true;
      setNavbar("hidden");
    } else {
      search = false;
      setNavbar("block");
    }
    // const navbar = "hidden";
  };
  const handleNoti = () => {
    if (noti == false) {
      noti = true;
      setNavbar("hidden");
    } else {
      noti = false;
      setNavbar("block");
    }
    // const navbar = "hidden";
  };
  return (
    <>
      <Link to="/">
        <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
          {/* <AiFillHome className="h-7 w-7" /> */}
          <HomeIcon />
          {showMenuName && <p className={`font-semibold ${navbar} `}>Home</p>}
        </div>
      </Link>
      <div
        className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg  cursor-pointer"
        onClick={handleSearch}>
        {/* <AiOutlineSearch className="h-7 w-7" /> */}
        <SearchIcon />
        {showMenuName && <p className={`font-normal ${navbar}`}>Search</p>}
      </div>
      <Link to="/explore" className="hidden md:block lg:block">
        <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
          <AiOutlineCompass className="h-7 w-7" />
          {showMenuName && <p className={`font-normal ${navbar}`}>Explore</p>}
        </div>
      </Link>
      <div
        className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg  cursor-pointer"
        onClick={() => setAddStory(true)}>
        <BiSolidMoviePlay className="h-7 w-7" />
        {showMenuName && <p className={`font-normal ${navbar}`}>Story</p>}
      </div>
      <Link to={`direct/inbox`}>
        <div className=" flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
          <div className="relative">
            {/* <img
              src="https://file.rendit.io/n/UK7bE1RkhuFEzt0TXV09.svg"
              className="w-6 shrink-0"
            /> */}
            <MessengerIcon />
            {newMessageNotif.length > 0 && (
              <p className="absolute -right-2 -top-2 bg-red-500 rounded-full w-5 h-5 text-white text-xs text-center border-2 border-white">
                {newMessageNotif.length}
              </p>
            )}
          </div>
          {showMenuName && <p className={`font-normal ${navbar}`}>Messages</p>}
        </div>
      </Link>
      <div
        className="hidden lg:flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer"
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
      <div
        className="hidden  lg:flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer"
        onClick={() => setAddPost(true)}>
        <img
          src="https://file.rendit.io/n/Qw8xabla0WV1dzCWjhDr.svg"
          className="mb-1 w-6 shrink-0"
        />
        {showMenuName && <p className={`font-normal ${navbar}`}>Create</p>}
      </div>
      <Link to={`/${userData?.userName}`}>
        <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
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
  const { setAddPost } = useContext(UserActionContext);
  const { notification } = useNotification();

  const handleNoti = () => {
    if (noti == false) {
      noti = true;
      setNavbar("hidden");
    } else {
      noti = false;
      setNavbar("block");
    }
    // const navbar = "hidden";
  };

  return (
    <div className="flex gap-px p-1">
      <div
        className="flex items-center hover:bg-gray-100 rounded-lg w-full cursor-pointer"
        onClick={() => setAddPost(true)}>
        <AddPostIcon className="w-12" />
        {/* {showMenuName && <p className={`font-normal ${navbar}`}>Create</p>} */}
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
