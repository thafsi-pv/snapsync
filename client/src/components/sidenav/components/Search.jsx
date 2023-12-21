import { motion } from "framer-motion";
import React from "react";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import useSearch from "../../../hooks/useSearch";
import InputField from "../../uiPrimitives/fields/InputField";
import UserImage from "../../user/UserImage";

/**
 * Search Component
 * Responsible for show side search bar with framer motion animation and list search list
 * Using custom hook useSearch
 */

function Search({ navbar, searchBar }) {
  const { handleSearchBar, handleSearch, searchUser, searchTerm, searchList } =
    useSearch();

  return (
    <motion.div
      className={`z-50 fixed left-12 top-0 w-full`}
      initial={{ x: navbar != "hidden" && !searchBar ? "-10%" : "-100%" }}
      exit={{ x: "0%" }}
      animate={{ x: "2%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}>
      <div
        className="absolute w-full h-full -z-10"
        onClick={handleSearchBar}></div>
      <div className=" z-10 left-5 h-screen bg-white  w-96 rounded-r-2xl  shadow-right border">
        <div className="flex flex-col gap-5 p-3">
          <p className="text-2xl font-semibold">Search</p>
          <div className="border-b flex-0 h-fit">
            <div className="p-4 ">
              <InputField
                inputClass="p-2 "
                extra="rounded-lg border-none"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="relative  h-screen">
            <div className="absolute top-0 left-0 h-full w-full flex flex-col overflow-y-scroll">
              {searchList.map((user) => (
                <SearchUserList userData={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Search;

const SearchUserList = ({ userData }) => {
  return (
    <Link to={userData?.userName}>
      <div className="flex justify-center items-center gap-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
        {/* <img className="h5 w-5" src={userData?.imageUrl} alt="" /> */}
        <UserImage
          id={userData?._id}
          imgUrl={userData?.imageUrl}
          extra="w-14 h-14"
          username={userData?.userName}
          imgStyle=""
        />
        <div className="flex-1 ">
          <p>{userData?.fullName}</p>
          <p className="text-xs -mt-[5px]">{userData?.userName}</p>
        </div>
        <div>
          <IoIosClose className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
};
