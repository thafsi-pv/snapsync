import EmojiPicker from "emoji-picker-react";
import React from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { containsOnlyEmojis } from "../../../utils/containsOnlyEmojis";

function ChatListScreen({
  message,
  chatUser,
  messages,
  showEmoji,
  chatListRef,
  handleSendMessage,
  userData,
  setMessage,
  onEmojiClick,
  setshowEmoji,
}) {
  return (
    <div className="relative  h-full w-full flex flex-col justify-between ">
      <div className="flex gap-3 w-full flex-0 border-b p-1">
        <div>
          <img
            src={chatUser?.imageUrl}
            className="w-14 h-14 rounded-full object-cover"
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
        {messages.map((msg) => (
          <ChatMessage
            message={msg.message}
            messageType={msg.messageType}
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
        <BsFillEmojiSmileFill
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
    </div>
  );
}

export default ChatListScreen;

const ChatMessage = ({ message, isMine, messageType }) => {
  console.log(
    "🚀 ~ file: ChatListScreen.jsx:79 ~ ChatMessage ~ isMine:",
    isMine
  );
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
      <div className={`flex justify-end mb-4 items-end `}>
        <div
          className={`max-w-xs  whitespace-normal break-all rounded-l-2xl rounded-tr-2xl`}>
          <div className="flex flex-col items-start max-w-xs mx-auto mb-4  bg-gray-100 rounded-lg">
            <div
              className="flex items-center space-x-2 px-4 py-3"
              href="#"
              target="_blank">
              <img
                alt="Preview"
                className="w-10 h-10 rounded-full"
                src="https://scontent.cdninstagram.com/v/t51.2885-19/292444789_186040730434478_2118414605648019121_n.jpg?stp=dst-jpg_s50x50&amp;_nc_cat=108&amp;ccb=1-7&amp;_nc_sid=c4dd86&amp;_nc_ohc=tThTUxmtQboAX8wCuGE&amp;_nc_ht=scontent.cdninstagram.com&amp;oh=00_AfA6udp30_h8r6_8pU1uubi7Wk9uzM2FLFfzWh4mGhAZ4Q&amp;oe=65622847&amp;ig_cache_key=MzkyMjEwNTQzMTU%3D.2-ccb7-5"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">g</span>
                <span className="text-xs text-gray-500">4d</span>
              </div>
            </div>
            <div className="max-w-xs">
              <img
                alt="Collage"
                className="w-full"
                referrerpolicy="origin-when-cross-origin"
                src="https://scontent.cdninstagram.com/v/t51.29350-15/396546931_871734677915879_7755603533089303028_n.webp?stp=dst-jpg&amp;_nc_cat=102&amp;ccb=1-7&amp;_nc_sid=c4dd86&amp;_nc_ohc=xos5T_SQNJ8AX9SwhfQ&amp;_nc_ht=scontent.cdninstagram.com&amp;oh=00_AfBbwZIL99JkeCrSOC7bIDCMMIINKPEQ1X-P5VJQxkJc5g&amp;oe=6561E08D"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 line-clamp-3">
                👋 Hey Developers | ⚠️ Save It For Later Post by: @codebustler
                👉 Regular Expression | RegEx | JavaScript | In Detail 🔔 Follow
                me @codebustler for more content like this. Don't Forget To Like
                ♥️ | Share 📲 | Save 📥
                ----------------------------------------- #regex #webdevelopment
                #computerscience #html #css #javascript #coders #fullstack
                #codingisfun #codingbootcamp #codingchallenge #learncode
                #reactjs #vscode #programmerslife #100daysofcode #csstricks
                #100daysofcodechallenge #frontenddev #codebustler
                #frontenddeveloper #frontendengineer #html5 #htmlcoding
                #htmltutorial #html5website #htmlcode #html_css #codebustler
                #javascript #react
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
