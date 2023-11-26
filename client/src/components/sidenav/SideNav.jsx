import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { FaThreads } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/img/snapsync_logo.png";
import SnapsyncIcon from "../../assets/svg/SnapsyncIcon";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { NOTIFICATION } from "../../services/api/const";
import { UserActionContext } from "../../services/providers/UserActionContext";
import { timeAgo } from "../../utils/timeAgo";
import InputField from "../uiPrimitives/fields/InputField";
import UserImage from "../user/UserImage";
import MenuList, { TopSmMenuList } from "./components/MenuList";

let search = false;
let noti = false;
function SideNav() {
  const { userData, navbar, setNavbar } = useContext(UserActionContext);

  return (
    <>
      <div
        className={`hidden lg:block md:flex relative  border-r w-[21%]
       ${navbar == "hidden" ? "w-[21%]" : "w-[21%]"}`}>
        <div
          className={`relative self-stretch   flex flex-row  items-start min-h-screen  dark:bg-black z-20`}>
          <div className="fixed flex flex-col  items-center   py-8 pl-2 h-full ">
            <div className="h-10">
              {navbar == "block" && (
                <div className="items-center hidden lg:block">
                  <img src={logo} alt="" className="w-[110px]" />
                </div>
              )}
              {navbar == "hidden" && (
                <div className="">
                  <SnapsyncIcon className="w-10 h-10  " />
                </div>
              )}
            </div>
            <div className="relative flex flex-col shrink-0 items-start mb-1 p-3 w-full ">
              <MenuList showMenuName={true} />
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
        {navbar == "hidden" && search && (
          <SearchComp
            navbar={navbar}
            setNavbar={setNavbar}
            userData={userData}
            search={search}
          />
        )}
        {navbar == "hidden" && noti && (
          <NotificationComp
            navbar={navbar}
            setNavbar={setNavbar}
            userData={userData}
            noti={noti}
          />
        )}
      </div>

      <div
        className="fixed md:hidden lg:hidden  top-0 left-0 right-0 z-10 bg-white  "
        id="topNavId">
        <div className="flex p-0 border-b px-4 py-1 items-center justify-between">
          <div className="items-center">
            <img src={logo} alt="" className="w-[110px] " />
          </div>
          <TopSmMenuList />
        </div>
      </div>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 p-1 bg-white text-black z-10 border-t"
        id="bottmNavId">
        <div className="flex items-center justify-evenly">
          <MenuList showMenuName={false} setNavbar={setNavbar} />
        </div>
      </nav>
    </>
  );
}

export default SideNav;

const SearchComp = ({ navbar, setNavbar, userData, search }) => {
  const handleSearchBar = () => {
    setNavbar("block");
    search = false;
  };

  return (
    <motion.div
      className={`z-[9] fixed left-12 w-full`}
      initial={{ x: navbar != "hidden" && !search ? "-10%" : "-100%" }}
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
              />
            </div>
          </div>
          <div className="relative  h-screen">
            <div className="absolute top-0 left-0 h-full w-full flex flex-col overflow-y-scroll">
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
              <SearchUserList userData={userData} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SearchUserList = ({ userData }) => {
  return (
    <div className="flex justify-center items-center gap-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
      {/* <img className="h5 w-5" src={userData?.imageUrl} alt="" /> */}
      <UserImage
        id={userData?._id}
        imgUrl={userData?.imageUrl}
        extra="w-12"
        username={userData?.userName}
        imgStyle=""
      />
      <div className="flex-1 ">
        <p>Full Name</p>
        <p className="text-xs -mt-[5px]">user Name</p>
      </div>
      <div>
        <IoIosClose className="w-5 h-5" />
      </div>
    </div>
  );
};

const NotificationComp = ({ navbar, setNavbar, userData, noti }) => {
  const handleNotiBar = () => {
    setNavbar("block");
    noti = false;
  };
  const [notificationList, setNotificationList] = useState([]);
  console.log(
    "🚀 ~ file: SideNav.jsx:289 ~ NotificationComp ~ notification:",
    notificationList
  );

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    const response = await axiosInstance.get(NOTIFICATION);
    console.log(
      "🚀 ~ file: SideNav.jsx:297 ~ getNotification ~ response:",
      response
    );
    const arrayOfKeyValueObjects = Object.entries(response.data[0]).map(
      ([key, value]) => ({ key, value })
    );
    setNotificationList(arrayOfKeyValueObjects);
  };

  return (
    <motion.div
      className={`z-[9] fixed left-12 w-full`}
      initial={{ x: navbar != "hidden" && !search ? "-10%" : "-100%" }}
      exit={{ x: "0%" }}
      animate={{ x: "2%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}>
      <div className="absolute w-screen h-screen" onClick={handleNotiBar}></div>
      <div className=" z-10 left-5 h-screen bg-white  w-96 rounded-r-2xl shadow-right border ">
        <div className="flex flex-col gap-5 p-3">
          <p className="text-2xl font-semibold">Notification</p>

          {notificationList?.map((facet) =>
            facet?.value.length > 0 ? (
              <div
                className="flex flex-col gap-4 border-b pb-2"
                key={facet.key}>
                <p className="text-base font-semibold">
                  {facet?.value[0]?.facetName}
                </p>
                {facet?.value.map((noti) => (
                  <div className="flex items-center space-x-4">
                    <div className="">
                      {noti.notifications.length >= 2 ? (
                        <div className="relative">
                          <img
                            src={noti.notifications[0].sender.imageUrl[0]}
                            className="w-8 shrink-0 rounded-full border-2 border-white"
                          />
                          <img
                            src={noti.notifications[1].sender.imageUrl[0]}
                            alt=""
                            className="absolute -right-2 -bottom-2 bg-red-500 rounded-full w-8 h-8 text-white text-xs text-center border-2 border-white"
                          />
                        </div>
                      ) : (
                        <img
                          src={noti.notifications[0].sender.imageUrl[0]}
                          className="w-8 shrink-0 rounded-full border-2 border-white"
                        />
                      )}
                    </div>
                    <div className="flex-1 flex items-center space-x-4 flex-wrap">
                      {noti.notifications.length >= 2 ? (
                        <div
                          className="flex flex-wrap gap-x-1 line-clamp-2 leading-3 items-center"
                          style={{ lineHeight: "1.2" }}>
                          <span className="text-sm font-semibold">
                            {noti.notifications[0].sender.username[0]}
                          </span>
                          <span className="text-sm ">and</span>
                          <span className="text-sm font-semibold">
                            {noti.notifications[1].sender.username[0]}
                          </span>
                          <span className="text-sm ">
                            {noti.notifications.length > 2 &&
                              `and ${
                                noti.notifications.length - 2
                              } others`}{" "}
                            {noti.notifications[0].type} your post.
                          </span>
                          <span className="text-xs text-gray-500">
                            {timeAgo(
                              noti.notifications[noti.notifications.length - 1]
                                .createdAt
                            )}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm flex gap-1 items-center">
                          <span className="font-semibold">
                            {" "}
                            {noti.notifications[0].sender.username[0]}
                          </span>
                          {noti.notifications[0].type} your post.
                          <span className="text-xs text-gray-500">
                            {timeAgo(
                              noti.notifications[noti.notifications.length - 1]
                                .createdAt
                            )}
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <img
                        src={noti?.postDetails[0].media_url.replace(
                          /\.mp4$/,
                          ".jpg"
                        )}
                        alt="Media thumbnail"
                        className="object-cover w-10 h-10 rounded-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};
