import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useChat from "../../hooks/useChat";
import useDebounce from "../../hooks/useDebounce";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { SEARCH_USER_API } from "../../services/api/const";
import { UserActionContext } from "../../services/providers/UserActionContext";
import PortalModal from "../uiPrimitives/modal/PortalModal";
import SearchUser from "./components/SearchUser";

function Share({ share, setShare }) {
  console.log("🚀 ~ file: Share.jsx:12 ~ Share ~ share:", share);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [usersList, setUsersList] = useState(null);
  const { sendMessage } = useChat();
  const { postId } = useContext(UserActionContext);


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

  const handleShareMessage = (recipientId) => {
    sendMessage(recipientId, postId, "PostMessage");
  };

  if (!share) return null;
  return (
    <PortalModal>
      <div
        className="fixed inset-0 bg-black opacity-50  "
        onClick={() => setShare(false)}></div>
      <div className="bg-white w-[90%] lg:w-1/3 shadow-2xl rounded-lg z-20 max-w-[95%] lg:max-w-[90%]">
        <div className="flex px-2 border-b p-2">
          <div className="flex-1 text-center font-semibold">Share</div>
          <div className="cursor-pointer" onClick={() => setShare(false)}>
            <AiOutlineClose className="w-5 h-5" />
          </div>
        </div>
        <SearchUser
          searchTerm={searchTerm}
          usersList={usersList}
          setSearchTerm={setSearchTerm}
          onClick={handleShareMessage}
        />
        <div className="p-2 rounded-lg">
          <button className="p-2 w-full bg-blue-500 rounded-lg text-white font-semibold">
            Share
          </button>
        </div>
      </div>
    </PortalModal>
  );
}

export default Share;
