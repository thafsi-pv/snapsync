import React, {
  Suspense,
  lazy,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
// import NewChatModal from "../../components/modal/NewChatModal";
const NewChatModal = lazy(() => import("../../components/modal/NewChatModal"));

// import ChatListScreen from "../../components/modal/components/ChatListScreen";
const ChatListScreen = lazy(() =>
  import("../../components/modal/components/ChatListScreen")
);
import NoMessage from "../../components/modal/components/NoMessage";
import RecentChatList from "../../components/modal/components/RecentChatList";
import useChat from "../../hooks/useChat";
import { UserActionContext } from "../../services/providers/UserActionContext";
import { Loading } from "../../assets/svg/Loading";

/**
 * Messages component
 *
 * This component handles the display of recent chats, allowing users to send messages.
 * It includes a chat list, a message input area, and a modal for creating new chats.
 *
 * @component
 * @returns {JSX.Element} The rendered Messages component.
 */

function Messages() {
  // Ref for scrolling to the bottom of the chat list
  const chatListRef = useRef(null);

  const { userData, setNavbar } = useContext(UserActionContext);

  const {
    messages,
    setMessages,
    recentChatList,
    sendMessage,
    handleRecentChatClick,
    chatUser,
    setChatUser,
    handleNewChat,
    newChat,
    setNewChat,
    showEmoji,
    setshowEmoji,
    onEmojiClick,
    message,
    setMessage,
    getRecentChats,
  } = useChat();

  //in messages screen hide top navbar and bottom navbar
  useEffect(() => {
    //pollint  for recent chat list in every 5sec
    const pollingInterval = setInterval(() => {
      getRecentChats();
    }, 5000);
    //hide top and bottom nav in mobile
    setNavbar("hidden");
    const topNav = document.getElementById("topNavId");
    console.log("🚀 ~ file: Messages.jsx:58 ~ useEffect ~ topNav:", topNav);
    const bottomNav = document.getElementById("bottmNavId");
    const sideNav = document.getElementById("sideNavId");
    if (sideNav) sideNav.style.width = "7%";
    if (topNav || bottomNav) {
      topNav.style.display = "none";
      bottomNav.style.display = "none";
    }
    //clean up on unmount
    return () => {
      if (topNav || bottomNav) {
        topNav.style.display = "";
        bottomNav.style.display = "";
      }
      sideNav.style.width = "21%";
      clearInterval(pollingInterval);
    };
  }, []);

  //scroll to bottom of message list
  useLayoutEffect(() => {
    if (chatListRef && chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (chatUser && message != "") {
      sendMessage(chatUser._id, message, "TextMessage"); //send message using custom hook useChat
      setMessage("");
    }
  };

  return (
    <div className=" flex flex-col lg:flex-row w-full h-screen lg:items-center  max-h-screen">
      <div
        className={`lg:self-end flex flex-row justify-between items-start h-screen  border-r lg:w-2/5 ${
          !chatUser ? "sm:w-full h-full" : "lg:block hidden"
        }`}>
        {/* <div className="flex flex-row gap-6 w-full items-start "> */}
        <div className="relative flex flex-col gap-8  lg:pt-6 lg:pb-16 w-full overflow-scroll h-full">
          <div className="relative flex flex-row justify-between lg:gap-12 items-center border-b py-3 px-6 ">
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
          <div className="flex-1 overflow-y-scroll h-full">
            <RecentChatList
              recentChatList={recentChatList}
              handleRecentChatClick={handleRecentChatClick}
              userData={userData}
            />
          </div>
        </div>
        {/* </div> */}
      </div>
      <div
        className={`mx-auto w-full  h-full  ${
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
      {newChat && (
        <Suspense fallback={<Loading />}>
          <NewChatModal
            setChatUser={setChatUser}
            newChat={newChat}
            setNewChat={setNewChat}
          />
        </Suspense>
      )}
    </div>
  );
}

export default Messages;
