import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { SocketContext } from "../../services/providers/SocketContext";
import { SEARCH_USER_API } from "../../services/api/const";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import PortalModal from "../uiPrimitives/modal/PortalModal";
import InputField from "../uiPrimitives/fields/InputField";
import SearchUser from "./components/SearchUser";

function NewChatModal({ newChat, setNewChat, setChatUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [usersList, setUsersList] = useState(null);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm != "") {
      searchUser();
    }
  }, [debouncedSearchTerm]);

  const searchUser = async () => {
    console.log("search for inside if", debouncedSearchTerm);
    const result = await axiosInstance.get(
      `${SEARCH_USER_API}?param=${debouncedSearchTerm}`
    );

    setUsersList(result.data);
  };

  const handleNewChat = (userId) => {
    socket.emit("newChat", userId);
    socket.on("usersocketId", (socketId) => {
      console.log("🚀 ~ file: NewChatModal.jsx:40 ~ socket.on ~ id:", socketId);

      const user = usersList.find((user) => {
        return (user._id = userId);
      });
      console.log("🚀 ~ file: NewChatModal.jsx:43 ~ socket.on ~ user:", user);
      user.socketId = socketId;
      setChatUser(user);
      setNewChat(false);
      const newURL = `/direct/inbox/${userId}`;
      navigate(newURL);
    });
  };

  if (!newChat) return null;
  return (
    <PortalModal>
      <div
        className="fixed inset-0 bg-black opacity-50 "
        onClick={() => setNewChat(false)}></div>
      <div className="bg-white w-full m-5 lg:w-1/3 shadow-2xl rounded-lg z-20">
        <div className="flex px-2 border-b p-2">
          <div className="flex-1 text-center font-semibold">New Message</div>
          <div className="cursor-pointer" onClick={() => setNewChat(false)}>
            <AiOutlineClose className="w-5 h-5" />
          </div>
        </div>
        {/* <div className="border-b flex gap-3 px-4 items-center py-1">
          <p className="font-semibold">To:</p>
          <InputField
            placeholder="Search.."
            extra="border-0 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="max-h-80 h-80 overflow-y-scroll ">
          {usersList?.length > 0 ? (
            usersList?.map((user) => (
              <div
                key={user._id}
                onClick={() => handleNewChat(user._id)}
                className="p-3 flex gap-3 items-center hover:bg-gray-100 cursor-pointer">
                <img
                  src={user.imageUrl}
                  className="w-10 h-10 rounded-full
              "
                  alt=""
                />
                <div className="leading-3">
                  <p>{user.fullName}</p>
                  <p className="text-sm text-gray-400">{user.userName}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-5">
              <p className="text-sm text-gray-400">No account found.</p>
            </div>
          )}
        </div> */}

        <SearchUser
          searchTerm={searchTerm}
          usersList={usersList}
          setSearchTerm={setSearchTerm}
          onClick={handleNewChat}
        />
        <div className="p-2 rounded-lg">
          <button className="p-2 w-full bg-blue-500 rounded-lg text-white font-semibold">
            Chat
          </button>
        </div>
      </div>
    </PortalModal>
  );
}

export default NewChatModal;
