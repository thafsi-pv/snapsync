import React from "react";
import { timeAgo } from "../../../utils/timeAgo";

function RecentChatList({ recentChatList, handleRecentChatClick, userData }) {
  return (
    <div className="flex flex-col gap-3 w-full h-fit">
      {recentChatList?.map((recent) => (
        <div
          onClick={() => handleRecentChatClick(recent)}
          key={recent._id}
          className="relative flex flex-col justify-end items-start mb-px px-3 cursor-pointer hover:bg-gray-100 m-2 rounded-md">
          <div className="flex flex-row gap-4 items-center w-full">
            <div className="relative w-16 h-16 shrink-0 flex-0">
              <img
                src={
                  recent.senderInfo._id == userData?._id
                    ? recent.recipientInfo.imageUrl
                    : recent.senderInfo.imageUrl
                }
                className="w-full h-full rounded-full object-cover"
              />
              <span
                className={`absolute bottom-1 right-0 w-4 h-4 rounded-full  ${
                  recent.socketId != 0 ? "bg-green-500" : "bg-red-500"
                } border-2 border-white `}></span>
            </div>
            <div className="text-sm flex-1">
              <p>
                {recent.senderInfo._id == userData?._id
                  ? recent.recipientInfo.fullName
                  : recent.senderInfo.fullName}
              </p>
              <p className="flex gap-3 text-xs text-gray-500">
                <span className="line-clamp-1">
                  {recent.senderInfo._id == userData?._id ? "You: " : ""}
                  {recent.messageType != "TextMessage"
                    ? "sent an attachment."
                    : recent.messageTypeDetails.text}
                </span>
                · {timeAgo(recent.createdAt)}
              </p>
            </div>
            {!recent.isRead && recent.senderInfo._id != userData?._id && (
              <div className="relative h-2 w-2  flex-0">
                <span className="absolute w-full h-full bg-blue-500 rounded-full"></span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentChatList;
