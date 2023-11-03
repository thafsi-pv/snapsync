import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import EmojiPicker from "emoji-picker-react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import NewChatModal from "./modal/NewChatModal";
import { UserActionContext } from "../../context/UserActionContext";
import { SocketContext } from "../../context/SocketContext";
import { axiosInstance } from "../../axios/axiosInterceptor";
import { GET_CHATS_API, GET_RECENT_CHATS_API } from "../../axios/const";
import { genericError } from "../../axios/genericError";
import { timeAgo } from "../../utils/timeAgo";

function Messages() {
  const chatListRef = useRef(null);
  const { userData } = useContext(UserActionContext);
  const [chatUser, setChatUser] = useState(null);
  const { socket } = useContext(SocketContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmoji, setshowEmoji] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const [recentChatList, setRecentChatList] = useState();

  useEffect(() => {
    // socket.emit("login", myUserName);
    // socket.on("userList", (list) => {
    //   setUserList(list);
    // });
    if (socket) {
      socket.on("private message", ({ sender, message }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: sender, message: message },
        ]);
      });
    }
    getRecentChats();
  }, []);
  useLayoutEffect(() => {
    if (chatListRef && chatListRef.current) {
      chatListRef.current.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: "",
      });
    }
  }, []);
  useEffect(() => {
    if (chatUser) {
      getChats();
    }
  }, [chatUser]);

  const getChats = async () => {
    try {
      const dt = { sender: userData._id, recipient: chatUser._id };
      const data = await axiosInstance.post(GET_CHATS_API, dt);

      const chats = data?.data.map((chat) => ({
        ...chat,
        sender: chat.sender.email,
        recipient: chat.recipient.email,
      }));
      console.log("🚀 ~ file: Messages.jsx:63 ~ chats ~ chats:", chats);
      setMessages(chats);
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
        recipientSocketId: chatUser.socketId,
        message,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: userData._id,
          recipient: chatUser._id,
          message: message,
        },
      ]);
      // const senderData = userList.find((user) => user.username == myUserName);
      // const recipientData = userList.find(
      //   (user) => user.username == selectedRecipient?.userName
      // );
      // const newChat = {
      //   sender: senderData.userId,
      //   recipient: recipientData.userId,
      //   message,
      // };
      // createChat(newChat);
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
      const response = await axiosInstance.get(GET_RECENT_CHATS_API);
      console.log(
        "🚀 ~ file: Messages.jsx:123 ~ getRecentChats ~ response:",
        response
      );
      setRecentChatList(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: Messages.jsx:122 ~ getRecentChats ~ error:",
        error
      );
      genericError(error);
    }
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
            <div className="relative flex flex-row gap-12 items-center ml-6 mr-5 border-b pb-3">
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

            <div className="flex flex-col gap-3 h-full overflow-y-scroll">
              {recentChatList?.map((recent) => (
                <div
                  key={recent._id}
                  className="relative flex flex-col justify-end items-start mb-px  px-3">
                  <div className="flex flex-row gap-4 items-center">
                    <div className="relative">
                      <img
                        src={recent.senderInfo._id == userData._id?recent.recipientInfo.imageUrl:recent.senderInfo.imageUrl}
                        className="w-16 h-16 shrink-0 rounded-full object-cover"
                      />
                      <span
                        className={`absolute bottom-1 right-0 w-4 h-4 rounded-full  bg-green-500 border-2 border-white `}></span>
                    </div>

                    <div className="text-sm   ">
                      <p>{recent.senderInfo._id == userData._id?recent.recipientInfo.fullName:recent.senderInfo.fullName}</p>
                      <p className="text-xs text-gray-500">
                        {recent.senderInfo._id == userData._id
                          ? "You: "
                          : ''}
                        {recent.message} . {timeAgo(recent.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full p-5 h-full ">
        {chatUser != null ? (
          <div className="relative  h-full w-full flex flex-col justify-between ">
            <div className="flex gap-3 w-full flex-0 border-b p-1">
              <div>
                <img
                  src={chatUser?.imageUrl}
                  className="w-14 h-14 rounded-full"
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
            <div className="p-2 flex-1 overflow-scroll" ref={chatListRef}>
              {/* <ChatMessage isMine={true} message="Hello 👋🏻,Whats up.." />

              <ChatMessage isMine={false} message="Hi😃 fine im ok.." /> */}
              {messages.map((msg) => (
                <ChatMessage
                  message={msg.message}
                  isMine={msg.sender == userData._id ? true : false}
                />
              ))}
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
                <div className="text-sm  text-white">Send message</div>
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
            ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
            : "bg-gray-300 rounded-r-lg rounded-tl-lg"
        }`}>
        {message}
      </div>
    </div>
  );
};

export default Messages;
