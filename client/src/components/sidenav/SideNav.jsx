import React, { useContext, useState } from "react";
import { AiFillHome, AiOutlineSearch, AiOutlineCompass } from "react-icons/ai";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaThreads } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/img/snapsync_logo.png";
import { UserActionContext } from "../../context/UserActionContext";
import { Link } from "react-router-dom";
import SnapsyncIcon from "../../assets/svg/SnapsyncIcon";
import InputField from "../fields/InputField";
import { SocketContext } from "../../context/SocketContext";

let search = false;
function SideNav() {
  const { userData, setAddPost, navbar, setNavbar, setAddStory } =
    useContext(UserActionContext);
  const { notification } = useContext(SocketContext);
  // const { navbar, setNavbar } = useState('hidden');
  // const [search, setSearch] = useState(false);
  console.log("🚀 ~ file: SideNav.jsx:23 ~ SideNav ~ search:", search);

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

  return (
    <div
      className={`flex relative  ${
        navbar == "hidden" ? "w-[7%]" : "w-[21%]"
      } border-r `}>
      <div
        className={`relative self-stretch ${
          navbar == "hidden" ? "w-[7%]" : "w-[21%]"
        }  flex flex-row  items-start min-h-screen  dark:bg-black  z-10`}>
        <div className="fixed flex flex-col  items-center   py-8 pl-2 h-full ">
          <div className="h-10">
            {navbar == "block" && (
              <div className="items-center hidden lg:block">
                <img src={logo} alt="" className="w-[140px]" />
              </div>
            )}
            {navbar == "hidden" && (
              <div className="">
                <SnapsyncIcon className="w-10 h-10  " />
              </div>
            )}
          </div>
          <div className="relative flex flex-col shrink-0 items-start mb-1 p-3 w-full ">
            <Link to="/">
              <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
                <AiFillHome className="h-7 w-7" />
                <p className={`font-semibold ${navbar} `}>Home</p>
              </div>
            </Link>
            <div
              className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer"
              onClick={handleSearch}>
              <AiOutlineSearch className="h-7 w-7" />
              <p className={`font-normal ${navbar}`}>Search</p>
            </div>
            <Link to="/explore">
              <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
                <AiOutlineCompass className="h-7 w-7" />
                <p className={`font-normal ${navbar}`}>Explore</p>
              </div>
            </Link>

            <div
              className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer"
              onClick={() => setAddStory(true)}>
              <BiSolidMoviePlay className="h-7 w-7" />
              <p className={`font-normal ${navbar}`}>Story</p>
            </div>

            <Link to={`direct/inbox`}>
              <div className=" flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
                {/* <BsChatQuote className="h-7 w-7" /> */}
                <div className="relative">
                  <img
                    src="https://file.rendit.io/n/UK7bE1RkhuFEzt0TXV09.svg"
                    className="w-6 shrink-0"
                  />
                  {notification.length > 0 && (
                    <p className="absolute -right-2 -top-2 bg-red-500 rounded-full w-5 h-5 text-white text-xs text-center border-2 border-white">
                      {notification.length}
                    </p>
                  )}
                </div>
                <p className={`font-normal ${navbar}`}>Messages</p>
              </div>
            </Link>
            <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
              {/* <AiOutlineHeart className="h-7 w-7" /> */}

              <div className="relative">
                <img
                  src="https://file.rendit.io/n/rUqLdTtW8OUyBPEOsSWF.svg"
                  className="w-6 shrink-0"
                />
                {
                  <p className="absolute -right-2 -top-2 bg-red-500 rounded-full w-5 h-5 text-white text-xs text-center border-2 border-white">
                    2
                  </p>
                }
              </div>
              <p className={`font-normal ${navbar}`}>Notification</p>
            </div>
            <div
              className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer"
              onClick={() => setAddPost(true)}>
              {/* <MdOutlineAddBox className="h-7 w-7" /> */}
              <img
                src="https://file.rendit.io/n/Qw8xabla0WV1dzCWjhDr.svg"
                className="mb-1 w-6 shrink-0"
              />
              <p className={`font-normal ${navbar}`}>Create</p>
            </div>
            <Link to={`/${userData?.userName}`}>
              <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
                <img
                  src={userData?.imageUrl}
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
                <p className={`font-normal ${navbar}`}>Profile</p>
              </div>
            </Link>
          </div>
          <div className="absolute left-0.5 bottom-0 flex flex-col gap-3 p-3">
            <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
              <FaThreads className="h-7 w-7" />
              <p className={`font-normal ${navbar}`}>Threads</p>
            </div>
            <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
              <RxHamburgerMenu className="h-7 w-7" />
              <p className={`font-normal ${navbar}`}>More</p>
            </div>
          </div>
        </div>
      </div>
      {navbar == "hidden" && search == true && (
        <div className="fixed z-10 left-24 h-screen bg-white  w-96 rounded-r-2xl drop-shadow-xl ">
          <div className="flex flex-col gap-5 p-3">
            <p className="text-2xl">Search</p>
            <div className="p-4">
              <InputField
                inputClass="p-2"
                extra="rounded-lg"
                placeholder="Search"
              />
            </div>
            <div className="">
              <div>
                <img className="h5 w-5" src={userData?.imageUrl} alt="" />
                <p>Name</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideNav;
