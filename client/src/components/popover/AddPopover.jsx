import React from "react";

function AddPopover({ handleclose }) {
  return (
    <div className="flex flex-col w-fit lg:w-1/2 relative m-9 ">
      <div
        className="fixed top-0 left-0 right-0 w-screen h-screen"
        onClick={handleclose}></div>
      <div className="shadow-2xl bg-white flex flex-col justify-between h-fit shrink-0 py-6 rounded-[21px] border z-10">
        <div className="flex flex-col gap-6 w-full shrink-0 items-start p-2">
          <div className="flex flex-row gap-3 items-center w-full hover:bg-gray-300 hover:rounded-md">
            <img
              src="https://file.rendit.io/n/LxVGRgkUcHki0oQQ4qEv.svg"
              className="w-4 shrink-0"
            />
            <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] ">
              Post
            </div>
          </div>
          <div className="flex flex-row gap-3 w-20 items-center">
            <img
              src="https://file.rendit.io/n/pIGsoPoYe9y0aVxXtVDt.svg"
              className="mt-px w-4 shrink-0"
            />
            <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54]">
              Story
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPopover;
