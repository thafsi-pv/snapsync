import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { axiosInstance } from "../services/api/axiosInterceptor";
import {
  GET_CHATS_API,
  READALL_CHATS_API,
  socketBaseUrl,
} from "../services/api/const";
import { SocketContext } from "../services/providers/SocketContext";
import { UserActionContext } from "../services/providers/UserActionContext";
import { useToast } from "./useToast";
import { useNavigate } from "react-router-dom";
import { genericError } from "../services/api/genericError";

function useChat() {
  const navigate = useNavigate();
  const { userData,userDataRef, setShare } = useContext(UserActionContext);
  console.log("🚀 ~ file: useChat.jsx:18 ~ useChat ~ userData:", userData)
  const { socket, messages, setMessages,setNewMessageNotif } = useContext(SocketContext);
  const [recentChatList, setRecentChatList] = useState();
  const { addToast } = useToast();
  const [chatUser, setChatUser] = useState(null); //currently active chat user
  const [newChat, setNewChat] = useState(false); // new chat modal view
  const [showEmoji, setshowEmoji] = useState(false);
  const [message, setMessage] = useState("");
  // useEffect(() => {
  //   if (socket) {
  //     socket.on("forceDisconnect", (reason) => {
  //       // Handle the forced disconnection here
  //       console.log(`Forced disconnection: ${reason}`);
  //       // You can also redirect the user or show a message
  //       // For example, you can use React Router to navigate to a different page
  //       // history.push('/login');
  //       // navigate("/auth/login");
  //     });

  //     // Clean up the event listener when the component unmounts
  //     return () => {
  //       socket.off("forceDisconnect");
  //     };
  //   }
  // }, [socket]);

  useEffect(() => {
    getRecentChats();
  }, [userData,socket]);

  useEffect(() => {
    if (chatUser) {
      getChats();
    }
  }, [chatUser]);

  // get recent chats of loged in user when enter to messages
  const getRecentChats = async () => {
    try {
      console.log("🚀 ~ file: useChat.jsx:57 ~ getRecentChats ~ socket:", socket)
      socket.current.emit("recentChatList", userDataRef.current._id);
      socket.current.on("recentChatList", (recentList) => {
        setRecentChatList(recentList);
      });
    } catch (error) {
      genericError(error);
    }
  };

  //recent chat list click event
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
        const response = await axiosInstance.post(READALL_CHATS_API, dt);
      }
    } catch (error) {
      console.log("🚀 ~ file: Chat.jsx:89 ~ getChats ~ error:", error);
    }
  };

  function sendMessage(recipientId, message, messageType) {
    if (recipientId && message) {
      socket.current.emit("private message", {
        sender: userData._id,
        recipient: recipientId,
        messageType,
        message,
      });

      if (messageType == "TextMessage") {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            // sender: userData._id,
            sender: { _id: userData._id },
            recipient: recipientId,
            message: { text: message },
            messageType,
          },
        ]);
      }
      if (messageType == "PostMessage") {
        setShare(false);
        addToast("Sent");
      }
    }
  }

  //start new chat
  const handleNewChat = () => {
    setNewChat((prev) => !prev);
  };

  const onEmojiClick = (event) => {
    setMessage((prev) => prev + event.emoji);
    setshowEmoji(false);
  };

  const connectSocket = (token) => {
    const newSocket = io(`${socketBaseUrl}?token=${token}`);
    setSocket(newSocket);
  };

  return {
    messages,
    setMessages,
    recentChatList,
    sendMessage,
    connectSocket,
    handleRecentChatClick,
    chatUser,
    setChatUser,
    handleNewChat,
    newChat,
    setNewChat,
    getChats,
    showEmoji,
    setshowEmoji,
    onEmojiClick,
    message,
    setMessage,
    getRecentChats,
    setNewMessageNotif
  };
}

export default useChat;
