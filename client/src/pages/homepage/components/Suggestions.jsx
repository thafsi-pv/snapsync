import React from "react";
import User from "./User";

function Suggestions() {
  return (
    <div className="relative flex flex-col w-full gap-12 items-start mt-10 mx-14">
      <div className="flex flex-row justify-between ml-px w-full  items-center">
        <div className="self-start flex flex-col gap-8 w-full items-start">
          <User />
          <div className="self-stretch flex flex-col ml-1 gap-5 items-start">
            <div className="text-base  tracking-[0.24] text-[#737373]">
              Suggesed for you
            </div>
            <div className="self-stretch flex flex-col justify-between ml-1 gap-5">
              <div className="flex flex-row gap-4 items-center ml-px">
                <img
                  src="https://4.img-dpreview.com/files/p/E~C667x0S5333x4000T1200x900~articles/3925134721/0266554465.jpeg"
                  className="w-11 h-11 shrink-0 rounded-full"
                />
                <div className="flex flex-col gap-1 w-24 shrink-0 flex-grow items-start">
                  <p className="text-sm  tracking-[0.42]">Zia_queen_hell</p>
                  <p className="text-xs  tracking-[0.39] text-[#737373]">
                    Followed by zia
                  </p>
                </div>
                <div className="items-end flex-grow-0 p-2">
                  <button className="text-xs font-semibold text-blue-500">
                    Follow
                  </button>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center ml-px">
                <img
                  src="https://4.img-dpreview.com/files/p/E~C667x0S5333x4000T1200x900~articles/3925134721/0266554465.jpeg"
                  className="w-11 h-11 shrink-0 rounded-full"
                />
                <div className="flex flex-col gap-1 w-24 shrink-0 flex-grow items-start">
                  <p className="text-sm  tracking-[0.42]">Zia_queen_hell</p>
                  <p className="text-xs  tracking-[0.39] text-[#737373]">
                    Followed by zia
                  </p>
                </div>
                <div className="items-end flex-grow-0 p-2">
                  <button className="text-xs font-semibold text-blue-500">
                    Follow
                  </button>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center ml-px">
                <img
                  src="https://4.img-dpreview.com/files/p/E~C667x0S5333x4000T1200x900~articles/3925134721/0266554465.jpeg"
                  className="w-11 h-11 shrink-0 rounded-full"
                />
                <div className="flex flex-col gap-1 w-24 shrink-0 flex-grow items-start">
                  <p className="text-sm  tracking-[0.42]">Zia_queen_hell</p>
                  <p className="text-xs  tracking-[0.39] text-[#737373]">
                    Followed by zia
                  </p>
                </div>
                <div className="items-end flex-grow-0 p-2">
                  <button className="text-xs font-semibold text-blue-500">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 w-[279px] h-20 shrink-0">
        <div className="flex flex-col gap-2 items-start">
          <div className="text-xs font-['Microsoft_Sans_Serif'] tracking-[0.39] text-gray-400">
            About . Help .Press .API .Jobs . Prtivacy . Terms .
          </div>
          <div className="text-xs font-['Microsoft_Sans_Serif'] tracking-[0.39] text-gray-400">
            Locations . Languages .Meta Verified
          </div>
        </div>
        <div className="text-xs font-['Microsoft_Sans_Serif'] tracking-[0.39] text-gray-400">
          © 2023 FROM SNAPSYNC WITH ♥️
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
