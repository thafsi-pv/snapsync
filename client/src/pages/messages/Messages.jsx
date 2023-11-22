import EmojiPicker from "emoji-picker-react";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import NewChatModal from "./modal/NewChatModal";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../services/providers/SocketContext";
import { UserActionContext } from "../../services/providers/UserActionContext";
import { containsOnlyEmojis } from "../../utils/containsOnlyEmojis";
import { timeAgo } from "../../utils/timeAgo";
import { genericError } from "../../services/api/genericError";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { GET_CHATS_API } from "../../services/api/const";

function Messages() {
  const navigate = useNavigate();
  const chatListRef = useRef(null);
  const { userData, setNavbar } = useContext(UserActionContext);
  console.log("🚀 ~ file: Messages.jsx:27 ~ Messages ~ userData:", userData);
  const [chatUser, setChatUser] = useState(null);
  const { socket, messages, setMessages } = useContext(SocketContext);

  const [message, setMessage] = useState("");
  const [showEmoji, setshowEmoji] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const [recentChatList, setRecentChatList] = useState();

  useEffect(() => {
    getRecentChats();
    setNavbar("hidden");
  }, [userData]);

  useLayoutEffect(() => {
    if (chatListRef && chatListRef.current) {
      chatListRef.current.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (chatUser) {
      getChats();
    }
  }, [chatUser]);

  const handleRecentChatClick = (recent) => {
    const chatUser =
      recent.senderInfo._id == userData._id
        ? recent.recipientInfo
        : recent.senderInfo;
    chatUser.socketId = recent.socketId;
    setChatUser(chatUser);
    const newURL = `/direct/inbox/${chatUser._id}`;
    navigate(newURL);
  };

  const getChats = async () => {
    try {
      const dt = { sender: userData._id, recipient: chatUser._id };
      const data = await axiosInstance.post(GET_CHATS_API, dt);

      if (data.status == 200) {
        const chats = data?.data.map((chat) => ({
          ...chat,
          sender: chat.sender,
          recipient: chat.recipient,
        }));
        setMessages(chats);
        console.log("🚀 ~ file: Messages.jsx:63 ~ chats ~ chats:", chats);
        const response = await axiosInstance.post(READALL_CHATS_API, dt);
      }
    } catch (error) {
      console.log("🚀 ~ file: Chat.jsx:89 ~ getChats ~ error:", error);
    }
  };

  const handleNewChat = () => {
    setNewChat((prev) => !prev);
  };

  const handleSendMessage = () => {
    if (chatUser && message) {
      socket.emit("private message", {
        sender: userData._id,
        recipient: chatUser._id,
        messageType: "TextMessage",
        recipientSocketId: chatUser.socketId,
        message,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          // sender: userData._id,
          sender: { _id: userData._id },
          recipient: chatUser._id,
          message: message,
        },
      ]);
      setMessage("");
    }
  };

  // const createChat = async (newChat) => {
  //   const data = await axios.post(`${CREATE_CHAT}`, newChat);
  // };

  const onEmojiClick = (event) => {
    setMessage((prev) => prev + event.emoji);
    setshowEmoji(false);
  };

  const getRecentChats = async () => {
    try {
      socket.emit("recentChatList", userData._id);
      socket.on("recentChatList", (recentList) => {
        setRecentChatList(recentList);
      });
    } catch (error) {
      genericError(error);
    }
  };

  return (
    <div className="overflow-hidden flex flex-row w-full h-screen items-center  max-h-screen">
      <div className="self-end flex flex-row justify-between items-start h-screen  border-r w-2/5">
        <div className="flex flex-row gap-6 w-full items-start ">
          <div className="relative flex flex-col gap-8  pt-12 pb-16 w-full">
            <div className="relative flex flex-row gap-12 items-centermr-5 border-b pb-3 mx-4">
              <div className="text-base  font-semibold self-start flex-1">
                {userData?.fullName}
              </div>
              <div>
                <IoCreateOutline
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleNewChat}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full h-full overflow-y-scroll">
              {recentChatList?.map((recent) => (
                <div
                  onClick={() => handleRecentChatClick(recent)}
                  key={recent._id}
                  className="relative flex flex-col justify-end items-start mb-px px-3 cursor-pointer hover:bg-gray-100 m-2 rounded-md">
                  <div className="flex flex-row gap-4 items-center">
                    <div className="relative w-16 h-16 shrink-0">
                      <img
                        src={
                          recent.senderInfo._id == userData._id
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
                    <div className="text-sm ">
                      <p>
                        {recent.senderInfo._id == userData._id
                          ? recent.recipientInfo.fullName
                          : recent.senderInfo.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        <span className="line-clamp-1">
                          {recent.senderInfo._id == userData._id ? "You: " : ""}
                          {recent.message}
                        </span>
                        . {timeAgo(recent.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full p-2 h-full ">
        {chatUser != null ? (
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
            <div
              className="p-2 flex-1 overflow-y-scroll"
              h-full
              ref={chatListRef}>
              {messages.map((msg) => (
                <ChatMessage
                  message={msg.message}
                  isMine={msg.sender._id == userData._id ? true : false}
                />
              ))}

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
                        👋 Hey Developers | ⚠️ Save It For Later Post by:
                        @codebustler 👉 Regular Expression | RegEx | JavaScript
                        | In Detail 🔔 Follow me @codebustler for more content
                        like this. Don't Forget To Like ♥️ | Share 📲 | Save 📥
                        ----------------------------------------- #regex
                        #webdevelopment #computerscience #html #css #javascript
                        #coders #fullstack #codingisfun #codingbootcamp
                        #codingchallenge #learncode #reactjs #vscode
                        #programmerslife #100daysofcode #csstricks
                        #100daysofcodechallenge #frontenddev #codebustler
                        #frontenddeveloper #frontendengineer #html5 #htmlcoding
                        #htmltutorial #html5website #htmlcode #html_css
                        #codebustler #javascript #react
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
        ) : (
          <div className="flex flex-col align-middle gap-8 mx-auto h-full overflow-hidden ">
            <div className="flex flex-col gap-6 items-center justify-center m-auto">
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
              <div className="bg-[#0095f6] self-center flex flex-col justify-center p-3 shrink-0 items-start rounded-lg">
                <div
                  className="text-sm  text-white cursor-pointer"
                  onClick={handleNewChat}>
                  Send message
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <NewChatModal
        setChatUser={setChatUser}
        newChat={newChat}
        setNewChat={setNewChat}
      />
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
            ? "bg-blue-500 text-white rounded-l-2xl rounded-tr-2xl"
            : "bg-gray-300 rounded-r-2xl rounded-tl-2xl"
        }  ${containsOnlyEmojis(message) == true ? "text-5xl" : ""}`}>
        {message}
      </div>
    </div>
  );
};

export default Messages;
