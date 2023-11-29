import EmojiPicker from "emoji-picker-react";
import React, { useCallback, useContext } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import ReelIcon from "../../../assets/svg/ReelIcon";
import { UserActionContext } from "../../../services/providers/UserActionContext";
import { containsOnlyEmojis } from "../../../utils/containsOnlyEmojis";
import { timeAgo } from "../../../utils/timeAgo";
import Comments from "../Comments";

function ChatListScreen({
  message,
  chatUser,
  messages,
  setMessages,
  showEmoji,
  chatListRef,
  handleSendMessage,
  userData,
  setMessage,
  onEmojiClick,
  setshowEmoji,
  setChatUser,
}) {
  console.log("🚀 ~ file: ChatListScreen.jsx:26 ~ messages:", messages)
  const { comments, setComments, setPostId, postId } =
    useContext(UserActionContext);
  const handleViewComments = useCallback((postId) => {
    setComments(true);
    setPostId(postId);
  }, []);

  const handleBack = () => {
    setChatUser(null);
    setMessages([]);
  };
  return (
    <div className="relative  h-full w-full flex flex-col justify-between overflow-clip">
      <div className="flex gap-3 w-full flex-0 border-b p-1">
        <div className="flex items-center gap-3">
          <MdOutlineKeyboardBackspace
            className="h-5 w-5 lg:hidden cursor-pointer"
            onClick={handleBack}
          />
          <img
            src={chatUser?.imageUrl}
            className="lg:w-14 lg:h-14 w-7 h-7 rounded-full object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-0">
          <p className="font-semibold">{chatUser?.fullName}</p>
          <p className="text-xs">
            {chatUser?.socketId != 0 ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="p-2 flex-1 overflow-y-scroll" h-full ref={chatListRef}>
        {messages &&
          messages?.map((msg) => (
            <ChatMessage
              message={msg.message}
              messageType={msg.messageType}
              handleViewComments={handleViewComments}
              isMine={msg.sender._id == userData?._id ? true : false}
            />
          ))}
      </div>
      <div className=" p-4 border-t flex items-center gap-2">
        {showEmoji && (
          <div className="absolute bottom-24">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              autoFocusSearch={true}
              native
              emojiStyle="apple"
            />
          </div>
        )}
        <BsEmojiSmile
          className="h-7 w-7 txtGreenColor cursor-pointer"
          onClick={() => setshowEmoji((prev) => !prev)}
        />
        <input
          type="text"
          placeholder="Message..."
          className="w-full p-4 border rounded-md flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="button"
          className="p-4 rounded-full border bg-white hover:bg-gray-400"
          onClick={handleSendMessage}>
          <RiSendPlaneFill className="h-7 w-7 txtGreenColor" />
        </button>
      </div>
      <Comments
        postId={postId}
        show={comments}
        closeModal={() => setComments(false)}
      />
    </div>
  );
}

export default ChatListScreen;

const ChatMessage = ({ message, isMine, messageType, handleViewComments }) => {
  if (messageType === "TextMessage") {
    return (
      <div
        className={`flex ${
          isMine ? "justify-end" : "justify-start"
        } mb-4 items-end `}>
        <div
          className={`max-w-xs p-3  whitespace-normal break-all ${
            isMine
              ? "bg-blue-500 text-white rounded-l-2xl rounded-tr-2xl"
              : "bg-gray-300 rounded-r-2xl rounded-tl-2xl"
          }  ${containsOnlyEmojis(message.text) == true ? "text-5xl" : ""}`}>
          {message.text}
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
                src={message.postId.user_id.imageUrl}
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {message.postId.user_id.fullName}
                </span>
                <span className="text-xs text-gray-500">
                  {timeAgo(message.postId.createdAt)}
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
                handleViewComments(message.postId._id);
              }}>
              {message.postId.media_type.startsWith("video/") && (
                <div className="absolute right-3 top-2 ">
                  <ReelIcon color="#ffffff" />
                </div>
              )}
              <img
                alt="Collage"
                className=" w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] object-cover"
                src={message.postId.media_url.replace(/\.mp4$/, ".jpg")}
              />
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-700 line-clamp-3">
                {message.postId.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
