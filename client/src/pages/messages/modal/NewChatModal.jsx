import React from "react";
import PortalModal from "../../../components/modal/PortalModal";
import InputField from "../../../components/fields/InputField";

function NewChatModal({ newChat, setNewChat }) {
  if (!newChat) return null;
  return (
    <PortalModal>
      <div
        className="fixed inset-0 bg-black opacity-50 "
        onClick={() => setNewChat(false)}></div>
      <div className="bg-white w-1/3 shadow-2xl rounded-lg z-20">
        <div className="flex px-2 border-b p-2">
          <div className="flex-1 text-center font-semibold">New Message</div>
          <div>close</div>
        </div>
        <div className="border-b flex gap-3 px-4 items-center">
          <p className="font-semibold">To:</p>
          {/* <input type="text" placeholder="Search" className="w-full" /> */}
          <InputField placeholder="Search.." extra="border-0 bg-white" />
        </div>
        <div className="max-h-80 h-80 overflow-y-scroll ">
          <div className="p-3 flex gap-3 items-center hover:bg-gray-100 cursor-pointer">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="w-10 h-10 rounded-full
              "
              alt=""
            />
            <div className="leading-3">
              <p>Full Name</p>
              <p className="text-sm text-gray-400">username</p>
            </div>
          </div>
          <div className="p-3 flex gap-3 items-center hover:bg-gray-100 cursor-pointer">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="w-10 h-10 rounded-full
              "
              alt=""
            />
            <div className="leading-3">
              <p>Full Name</p>
              <p className="text-sm text-gray-400">username</p>
            </div>
          </div>
          <div className="p-3 flex gap-3 items-center hover:bg-gray-100 cursor-pointer">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="w-10 h-10 rounded-full
              "
              alt=""
            />
            <div className="leading-3">
              <p>Full Name</p>
              <p className="text-sm text-gray-400">username</p>
            </div>
          </div>
        </div>
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
