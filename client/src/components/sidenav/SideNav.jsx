import React from "react";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiSolidMoviePlay } from "react-icons/bi";
import { BsChatQuote } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { FaThreads } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/img/snapsync_logo.png";

function SideNav({ setAddPost }) {
  return (
    <div className="self-stretch w-[25%] flex flex-row  items-start min-h-screen bg-white dark:bg-black border-r">
      <div className="fixed flex flex-col  shrink-0 items-start py-8 pl-4 w-[15%] h-full">
        <div className="w-[140px] flex items-center">
          <img src={logo} alt="" className="object-cover" />
        </div>
        <div className="relative flex flex-col shrink-0 items-start mb-1 p-3 w-full">
          <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
            <AiFillHome className="h-7 w-7" />
            <p className="font-semibold">Home</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
            <AiOutlineSearch className="h-7 w-7" />
            <p className="font-normal">Search</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
            <AiOutlineCompass className="h-7 w-7" />
            <p className="font-normal">Explore</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
            <BiSolidMoviePlay className="h-7 w-7" />
            <p className="font-normal">Reels</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
            <BsChatQuote className="h-7 w-7" />
            <p className="font-normal">Messages</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
            <AiOutlineHeart className="h-7 w-7" />
            <p className="font-normal">Notification</p>
          </div>
          <div
            className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer"
            onClick={() => setAddPost(true)}>
            <MdOutlineAddBox className="h-7 w-7" />
            <p className="font-normal">Create</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
            <AiOutlineHeart className="h-7 w-7" />
            <p className="font-normal">Profile</p>
          </div>
        </div>
        <div className="fixed bottom-0 flex flex-col gap-3 p-3">
          <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
            <FaThreads className="h-7 w-7" />
            <p className="font-normal">Threads</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg w-full cursor-pointer">
            <RxHamburgerMenu className="h-7 w-7" />
            <p className="font-normal">More</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
