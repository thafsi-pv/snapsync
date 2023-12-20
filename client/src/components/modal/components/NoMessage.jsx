import React from "react";
import Button from "../../uiPrimitives/button";

function NoMessage({ handleNewChat }) {
  return (
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
        <div
          className="bg-[#0095f6] self-center flex flex-col justify-center py-2 px-3 shrink-0 items-start rounded-lg cursor-pointer"
          onClick={handleNewChat}>
          <p className="text-white text-sm font-semibold">Send Message</p>
        </div>
      </div>
    </div>
  );
}

export default NoMessage;
