import { motion } from "framer-motion";
import React from "react";
import useNotification from "../../../hooks/useNotification";
import NotificationItem from "../../notfication/NotificationItem";

/**
 * Notification Component
 * Responsible for notification fetch all notification and list by category
 * show array first two user name and profile image, rest count only
 * @param {*} param0
 * @returns
 */
export const Notification = () => {
  const { notificationList, handleNotiBar, navbar, notificationBar } =
    useNotification();

  return (
    <motion.div
      className={`z-20 fixed top-0 left-12 w-full h-full`}
      initial={{ x: navbar != "hidden" && !notificationBar ? "-10%" : "-100%" }}
      exit={{ x: "0%" }}
      animate={{ x: "2%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}>
      <div
        className="absolute w-screen h-screen -z-50"
        onClick={handleNotiBar}></div>
      <div className=" z-10 left-5 h-screen bg-white  w-96 rounded-r-2xl shadow-right border">
        <div className="flex flex-col gap-5 p-3 h-full ">
          <p className="text-2xl font-semibold">Notification</p>

          <div className="flex flex-col gap-2 overflow-y-scroll">
            {notificationList?.map((facet) =>
              facet?.value.length > 0 ? (
                <NotificationItem facet={facet} />
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
