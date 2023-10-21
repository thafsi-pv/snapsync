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

function SideNav() {
  return (
    <div className="self-stretch w-[25%] flex flex-row  items-start min-h-screen bg-white dark:bg-black border-r">
      <div className="fixed flex flex-col w-[374px] shrink-0 items-start py-8 px-4 h-full">
        <div className="w-[140px] flex items-center">
          <img src={logo} alt="" className="object-cover" />
        </div>
        <div className="relative flex flex-col gap-8 shrink-0 items-start mb-1 p-3">
          <div className="flex items-center gap-3">
            <AiFillHome className="h-7 w-7" />
            <p className="font-extrabold">Home</p>
          </div>
          <div className="flex items-center gap-3">
            <AiOutlineSearch className="h-7 w-7" />
            <p className="font-semibold">Search</p>
          </div>
          <div className="flex items-center gap-3">
            <AiOutlineCompass className="h-7 w-7" />
            <p className="font-semibold">Explore</p>
          </div>
          <div className="flex items-center gap-3">
            <BiSolidMoviePlay className="h-7 w-7" />
            <p className="font-semibold">Reels</p>
          </div>
          <div className="flex items-center gap-3">
            <BsChatQuote className="h-7 w-7" />
            <p className="font-semibold">Messages</p>
          </div>
          <div className="flex items-center gap-3">
            <AiOutlineHeart className="h-7 w-7" />
            <p className="font-semibold">Notification</p>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineAddBox className="h-7 w-7" />
            <p className="font-semibold">Create</p>
          </div>
          <div className="flex items-center gap-3">
            <AiOutlineHeart className="h-7 w-7" />
            <p className="font-semibold">Profile</p>
          </div>
        </div>
        <div className="fixed bottom-0 flex flex-col gap-3 p-3">
          <div className="flex items-center gap-3">
            <FaThreads className="h-7 w-7" />
            <p className="font-semibold">Threads</p>
          </div>
          <div className="flex items-center gap-3">
            <RxHamburgerMenu className="h-7 w-7" />
            <p className="font-semibold">More</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
