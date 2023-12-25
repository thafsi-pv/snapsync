import MultiPostIcon from "../../../assets/svg/MultiPostIcon";
import ReelIcon from "../../../assets/svg/ReelIcon";
import { containsOnlyEmojis } from "../../../utils/containsOnlyEmojis";
import { timeAgo } from "../../../utils/timeAgo";

export const ChatMessage = ({
  message,
  isMine,
  messageType,
  handleViewComments,
  isLastMsg,
  isRead,
}) => {
  if (messageType === "TextMessage") {
    return (
      <div
        className={`flex  ${
          isMine ? "justify-end" : "justify-start"
        } mb-4 items-end `}>
        <div className="flex-flex-col items-end">
          <div
            className={`max-w-xs p-3  whitespace-normal break-all ${
              isMine
                ? "bg-blue-500 text-white rounded-l-2xl rounded-tr-2xl"
                : "bg-gray-300 rounded-r-2xl rounded-tl-2xl"
            }  ${containsOnlyEmojis(message.text) == true ? "text-5xl" : ""}`}>
            {message.text}
          </div>
          {isMine && isLastMsg && isRead && (
            <p className="text-xs text-gray-500 items-end w-full flex justify-end">
              seen
            </p>
          )}
        </div>
      </div>
    );
  }
  if (messageType === "PostMessage") {
    return (
      <div
        className={`flex ${
          isMine ? "justify-end" : "justify-start"
        } items-end `}>
        {message?.postId?.files[0] ? (
          <div
            className={`max-w-[250px] lg:max-w-xs  whitespace-normal break-all rounded-l-2xl rounded-tr-2xl `}>
            <div className="flex flex-col items-start max-w-xs mx-auto mb-4  bg-gray-100 rounded-lg">
              <div
                className="flex items-center space-x-2 px-4 py-3"
                href="#"
                target="_blank">
                <img
                  alt="Preview"
                  className="w-10 h-10 rounded-full"
                  src={message?.postId?.user_id?.imageUrl}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {message?.postId?.user_id?.fullName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {timeAgo(message?.postId?.createdAt)}
                  </span>
                </div>
              </div>
              {/* <div className="max-w-xs h-full">
                <img
                  alt="Collage"
                  className="w-full object-cover"
                  referrerpolicy="origin-when-cross-origin"
                  src={message.postId.media_url.replace(/\.mp4$/, ".jpg")}
                />
              </div> */}

              <div
                className="relative max-w-xs "
                onClick={() => {
                  handleViewComments(message?.postId?._id);
                }}>
                {message?.postId?.files[0]?.fileType?.startsWith(
                  "video/"
                ) && (
                  <div className="absolute right-3 top-2 ">
                    <ReelIcon color="#ffffff" />
                  </div>
                )}
                {message?.postId?.files[0]?.fileType?.startsWith(
                  "image/"
                ) && (
                  <div className="absolute right-3 top-2 ">
                    <MultiPostIcon color="#ffffff" />
                  </div>
                )}
                <img
                  alt="Collage"
                  className=" w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] object-cover"
                  src={message?.postId?.files[0]?.fileUrl?.replace(/\.mp4$/, ".jpg")}
                />
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-700 line-clamp-3">
                  {message?.postId?.caption}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-[250px] lg:max-w-xs  whitespace-normal break-all rounded-l-2xl rounded-tr-2xl ">
            <p className="italic p-2 rounded-md text-xs bg-gray-200 my-2">
              Post is unavailable
            </p>
          </div>
        )}
      </div>
    );
  }
};
