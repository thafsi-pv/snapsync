import { useEffect, useState } from "react";
import { axiosInstance } from "../../../services/api/axiosInterceptor";
import { NOTIFICATION } from "../../../services/api/const";

export const MobileNotification = () => {
    const [notificationList, setNotificationList] = useState([]);
  
    useEffect(() => {
      getNotification();
    }, []);
  
    const getNotification = async () => {
      const response = await axiosInstance.get(NOTIFICATION);
      const arrayOfKeyValueObjects = Object.entries(response.data[0]).map(
        ([key, value]) => ({ key, value })
      );
      setNotificationList(arrayOfKeyValueObjects);
    };
    return (
      <div className="fixed top-0 w-full h-full bg-white z-[9] block lg:hidden">
        <div className="flex flex-col gap-5 p-3 h-full ">
          <p className="text-2xl font-semibold">Notification</p>
  
          <div className="flex flex-col gap-2 overflow-y-scroll">
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
      </div>
    );
  };