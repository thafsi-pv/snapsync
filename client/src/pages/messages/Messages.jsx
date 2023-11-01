import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import NewChatModal from "./modal/NewChatModal";

function Messages() {
  const [chatUser, setChatUser] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmoji, setshowEmoji] = useState(false);
  const [newChat, setNewChat] = useState(false);

  const handleSendMessage = () => {
    // if (selectedRecipient && message) {
    //   socket.emit("private message", {
    //     sender: myUserName,
    //     recipient: selectedRecipient?.userName,
    //     message,
    //   });
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     {
    //       sender: myUserName,
    //       recipient: selectedRecipient?.userName,
    //       message: message,
    //     },
    //   ]);
    //   const senderData = userList.find((user) => user.username == myUserName);
    //   const recipientData = userList.find(
    //     (user) => user.username == selectedRecipient?.userName
    //   );
    //   const newChat = {
    //     sender: senderData.userId,
    //     recipient: recipientData.userId,
    //     message,
    //   };
    //   createChat(newChat);
    //   setMessage("");
    // }
  };

  const handleNewChat = () => {
    setNewChat((prev) => !prev);
  };

  const onEmojiClick = (event) => {
    setMessage((prev) => prev + event.emoji);
    setshowEmoji(false);
  };
  return (
    <div className="overflow-hidden bg-white flex flex-row w-full h-screen items-center  max-h-screen ">
      <div className="self-end flex flex-row justify-between items-start h-screen overflow-y-auto border-r">
        <div className="flex flex-row gap-6 w-full items-start ">
          <div className="relative flex flex-col gap-8 w-72 pt-12 pb-16">
            <div
              id="Line"
              className="border-solid border-[#9b9b9b] w-px h-[1040px] absolute top-0 left-0 border-r border-l-0 border-y-0"
            />
            <div className="relative flex flex-row gap-12 items-center ml-6 mr-5">
              <div className="text-base  font-semibold self-start">
                Next_new_idea
              </div>
              <div>
                <IoCreateOutline
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleNewChat}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="relative flex flex-col justify-end items-start mb-px  px-3">
                <div className="flex flex-row gap-4 items-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="w-16 shrink-0 rounded-full"
                  />
                  <div className="text-sm   ">
                    <p>Next_new_idea</p>
                    <p> You: Hey . 4h</p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col justify-end items-start mb-px  px-3">
                <div className="flex flex-row gap-4 items-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="w-16 shrink-0 rounded-full"
                  />
                  <div className="text-sm   ">
                    <p>Next_new_idea</p>
                    <p> You: Hey . 4h</p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col justify-end items-start mb-px  px-3">
                <div className="flex flex-row gap-4 items-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="w-16 shrink-0 rounded-full"
                  />
                  <div className="text-sm   ">
                    <p>Next_new_idea</p>
                    <p> You: Hey . 4h</p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col justify-end items-start mb-px  px-3">
                <div className="flex flex-row gap-4 items-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="w-16 shrink-0 rounded-full"
                  />
                  <div className="text-sm">
                    <p>Next_new_idea</p>
                    <p> You: Hey . 4h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full p-5 h-full">
        <div className="relative  h-full w-full flex flex-col justify-between ">
          <div className="flex gap-3 w-full flex-0 border-b p-1">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="w-14 h-14 rounded-full"
              alt=""
            />
            <div className="flex flex-col items-start justify-center gap-0">
              <p className="font-semibold">Full Name</p>
              <p className="text-xs">Online</p>
            </div>
          </div>
          <div className="p-2 flex-1 overflow-scroll">
            <ChatMessage isMine={true} message="Hello 👋🏻,Whats up.." />
            <ChatMessage isMine={true} message="Hello 👋🏻,Whats up.." />
            <ChatMessage isMine={true} message="Hello 👋🏻,Whats up.." />
            <ChatMessage isMine={true} message="Hello 👋🏻,Whats up.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={true} message="Hello 👋🏻,Whats up.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={true} message="Hello 👋🏻,Whats up.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={true} message="Hello 👋🏻,Whats up.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
            <ChatMessage isMine={false} message="Hi😃 fine im ok.." />
          </div>
          <div>
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
        </div>

        {/* <div className="flex flex-col gap-8 mx-auto max-h-screen overflow-hidden bg-green-400">
          <div className="flex flex-col gap-6 items-center">
            <div className="relative flex flex-col items-center">
              <img
                src="https://file.rendit.io/n/NpHATgkgrvymz8IjD21b.svg"
                className="w-16 h-16 absolute top-8 left-8"
              />
              <img
                src="https://file.rendit.io/n/9881IRyN80GkZElSiSrQ.svg"
                id="Ellipse"
                className="relative"
              />
            </div>
            <div className="self-stretch flex flex-col gap-3 items-center">
              <div className="text-xl tracking-[0.21] self-center">
                Your messages
              </div>
              <div className="text-sm tracking-[0.15] text-[#9b9b9b]">
                Send private photos and messages to a friend or group
              </div>
            </div>
          </div>
          <div className="bg-[#0095f6] self-center flex flex-col justify-center p-3 shrink-0 items-start rounded-lg">
            <div className="text-sm  text-white">Send message</div>
          </div>
        </div> */}
      </div>
      <NewChatModal newChat={newChat} setNewChat={setNewChat} />
    </div>
  );
}

const ChatMessage = ({ message, isMine }) => {
  return (
    <div
      className={`flex ${
        isMine ? "justify-end" : "justify-start"
      } mb-4 items-end `}>
      <div
        className={`max-w-xs p-3  whitespace-normal break-all ${
          isMine
            ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
            : "bg-gray-300 rounded-r-lg rounded-tl-lg"
        }`}>
        {message}
      </div>
    </div>
  );
};

export default Messages;
