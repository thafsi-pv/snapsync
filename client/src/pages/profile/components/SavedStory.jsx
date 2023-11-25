import React, { memo } from "react";

function SavedStory() {
  console.log('saved story rendered.........')
  return (
    <div className="self-start flex flex-col gap-3 mb-1  w-full">
      <div className="flex flex-row justify-start items-start w-full gap-10 mx-3">
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
