import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IoCreateOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import NewChatModal from "../../components/modal/NewChatModal";
import ChatListScreen from "../../components/modal/components/ChatListScreen";
import NoMessage from "../../components/modal/components/NoMessage";
import RecentChatList from "../../components/modal/components/RecentChatList";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { GET_CHATS_API } from "../../services/api/const";
import { genericError } from "../../services/api/genericError";
import { SocketContext } from "../../services/providers/SocketContext";
import { UserActionContext } from "../../services/providers/UserActionContext";
import useChat from "../../hooks/useChat";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

function Messages() {
  const navigate = useNavigate();
  const chatListRef = useRef(null);
  const [chatUser, setChatUser] = useState(null);
  const { userData, setNavbar } = useContext(UserActionContext);
  const { socket, messages, setMessages } = useContext(SocketContext);
  const { sendMessage } = useChat();

  const [message, setMessage] = useState("");
  const [showEmoji, setshowEmoji] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const [recentChatList, setRecentChatList] = useState();

  useEffect(() => {
    getRecentChats();
    setNavbar("hidden");
    const topNav = document.getElementById("topNavId");
    const bottomNav = document.getElementById("bottmNavId");
    if (topNav || bottomNav) {
      console.log("🚀 ~ file: Messages.jsx:41 ~ useEffect ~ topNav:", topNav);
      topNav.style.display = "none";
      bottomNav.style.display = "none";
    }
    // // Set body height to screen height
    // document.body.style.height = window.innerHeight - "10px";

    // // Avoid overflow scrolling
    // document.body.style.overflow = "hidden";

    return () => {
      const topNav = document.getElementById("topNavId");
      const bottomNav = document.getElementById("bottmNavId");
      if (topNav || bottomNav) {
        topNav.style.display = "";
        bottomNav.style.display = "";
      }
      document.body.style.height = ""; // Reset height
      document.body.style.overflow = ""; // Reset overflow
    };
  }, [userData]);

  // useLayoutEffect(() => {
  //   if (chatListRef && chatListRef.current) {
  //     chatListRef.current.scrollTo({
  //       top: chatListRef.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // }, []);
  useLayoutEffect(() => {
    if (chatListRef && chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatUser) {
      getChats();
    }
  }, [chatUser]);

  const handleRecentChatClick = (recent) => {
    setMessages([]);
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
      // socket.emit("private message", {
      //   sender: userData._id,
      //   recipient: chatUser._id,
      //   messageType: "TextMessage",
      //   // recipientSocketId: chatUser.socketId,
      //   message,
      // });
      sendMessage(chatUser._id, message, "TextMessage");
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   {
      //     // sender: userData._id,
      //     sender: { _id: userData._id },
      //     recipient: chatUser._id,
      //     message: message,
      //   },
      // ]);
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
    <div className=" flex flex-col lg:flex-row w-full h-screen lg:items-center  max-h-screen">
      <div
        className={`lg:self-end flex flex-row justify-between items-start h-screen  border-r lg:w-2/5 ${
          !chatUser ? "sm:w-full h-full" : "lg:block hidden"
        }`}>
        {/* <div className="flex flex-row gap-6 w-full items-start "> */}
        <div className="relative flex flex-col gap-8  lg:pt-6 lg:pb-16 w-full">
          <div className="relative flex flex-row justify-between lg:gap-12 items-center border-b py-3 mx-4 ">
            <div>
              <Link to="/">
                <MdOutlineKeyboardBackspace className="h-5 w-5 lg:hidden cursor-pointer" />
              </Link>
            </div>
            <div className="text-base  font-semibold lg:self-start flex-1 text-center">
              {userData?.fullName}
            </div>
            <div>
              <IoCreateOutline
                className="w-6 h-6 cursor-pointer"
                onClick={handleNewChat}
              />
            </div>
          </div>
          <RecentChatList
            recentChatList={recentChatList}
            handleRecentChatClick={handleRecentChatClick}
            userData={userData}
          />
        </div>
        {/* </div> */}
      </div>
      <div
        className={`mx-auto w-full p-2 h-full  ${
          !chatUser ? "hidden lg:block" : "block"
        }`}>
        {chatUser != null ? (
          <ChatListScreen
            chatListRef={chatListRef}
            chatUser={chatUser}
            message={message}
            setMessages={setMessages}
            messages={messages}
            showEmoji={showEmoji}
            handleSendMessage={handleSendMessage}
            userData={userData}
            setMessage={setMessage}
            onEmojiClick={onEmojiClick}
            setshowEmoji={setshowEmoji}
            setChatUser={setChatUser}
          />
        ) : (
          <NoMessage handleNewChat={handleNewChat} />
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

export default Messages;
