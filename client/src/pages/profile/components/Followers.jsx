import React from "react";
import PortalModal from "../../../components/uiPrimitives/modal/PortalModal";
import Button from "../../../components/uiPrimitives/button";
import { AiOutlineClose } from "react-icons/ai";

function Followers({ showModal, setShowModal }) {
  // if (!showModal) return null;
  return (
    <PortalModal show={showModal}>
      <div
        id=""
        className="fixed inset-0 flex items-center justify-center overflow-hidden ">
        <div
          className="fixed inset-0 bg-black opacity-50 "
          onClick={() => setShowModal(false)}></div>
        <div className="relative flex flex-col  h-[50%] lg:w-[30%] sm:w-[80%] bg-white z-10 rounded-xl">
          <div className="relative flex flex-col h-full ">
            <div className="text-center border-b w-full p-2 flex items-center">
              <div className="text-center flex-1">
                <p className="text-base font-semibold">Followers</p>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => setShowModal(false)}>
                <AiOutlineClose className="h-4 w-4 text-black" />
              </div>
            </div>

            <div className="relative h-full w-full">
              <div className="absolute overflow-y-scroll w-full h-full top-0 left-0 p-5 flex flex-col gap-3 ">
                <div className="flex flex-row gap-4 items-center">
                  <div className="relative flex gap-3 items-center justify-between w-full">
                    <img
                      src="https://res.cloudinary.com/dm4djc1b1/image/upload/v1698830173/e1vczozfwj9ay6ktyoky.jpg"
                      className="relative w-12 rounded-full"
                    />
                    <div className="flex flex-col items-start  flex-1">
                      <p className="text-sm font-semibold mb-[-4px]">
                        UserName
                      </p>
                      <p className="text-xs text-gray-500">FullName</p>
                    </div>
                    <div>
                      <Button
                        label="Remove"
                        extraClass="!bg-gray-200 !text-black !p-1 w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalModal>
  );
}

export default Followers;
