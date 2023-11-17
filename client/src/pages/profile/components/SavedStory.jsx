import React, { memo } from "react";

function SavedStory() {
  console.log('saved story rendered.........')
  return (
    <div className="self-start flex flex-col gap-3 mb-1 ml-12 ">
      <div className="flex flex-row justify-between items-center w-full gap-10">
        <div
          id="Ellipse1"
          className="flex flex-col justify-center items-center">
          <img
            src="https://file.rendit.io/n/5BqefhPtK3djYMI5vhZL.svg"
            className=" w-20 h-20"
          />
          <div className="text-xs font-semibold">Highlights</div>
        </div>
        <div
          id="Ellipse1"
          className="flex flex-col justify-center items-center">
          <img
            src="https://file.rendit.io/n/5BqefhPtK3djYMI5vhZL.svg"
            className=" w-20 h-20"
          />
          <div className="text-xs font-semibold">Love</div>
        </div>
        <div
          id="Ellipse1"
          className="flex flex-col justify-center items-center">
          <img
            src="https://file.rendit.io/n/5BqefhPtK3djYMI5vhZL.svg"
            className=" w-20 h-20"
          />
          <div className="text-xs font-semibold">Starts</div>
        </div>
      </div>
    </div>
  );
}

export default memo(SavedStory);
