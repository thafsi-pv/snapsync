import React from "react";

function OrLine() {
  return (
    <div className="self-stretch flex flex-row gap-5 items-start">
      <div
        id="Line"
        className="border-solid border-[#dfdfdf] mt-3 w-2/5 h-px border-t border-b-0 border-x-0"
      />
      <div className="flex flex-row gap-5 w-1/2 items-start">
        <div className="text-sm font-semibold tracking-[-0.63] text-[#606060]">
          OR
        </div>
        <div
          id="Line1"
          className="border-solid border-[#dfdfdf] mt-3 w-32 h-px border-t border-b-0 border-x-0"
        />
      </div>
    </div>
  );
}

export default OrLine;
