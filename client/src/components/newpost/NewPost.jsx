import React from "react";

function NewPost() {
  return (
    <div id="NewRootRoot" className="flex flex-col w-full">
      <div className="bg-white relative flex flex-col justify-between gap-[364px] items-start pt-4 pb-64 rounded-[20px]">
        <div className="self-stretch relative flex flex-col mr-px gap-4 h-10 shrink-0 items-start">
          <div className="text-lg font-['Microsoft_Sans_Serif'] ml-[283px]">
            Cretae new post
          </div>
          <div
            id="Line"
            className="border-solid border-[#f4f4f4] self-stretch h-px shrink-0 border-t border-b-0 border-x-0"
          />
        </div>
        <div className="relative flex flex-col ml-48 gap-8 h-24 shrink-0 items-start">
          <div className="text-xl font-['Microsoft_Sans_Serif'] tracking-[0.9] text-[#808080] mr-2">
            Drag photos and videos here
          </div>
          <div className="bg-[#0095f6] self-end flex flex-col justify-center w-[213px] h-10 shrink-0 items-center rounded-lg">
            <div className="font-['Microsoft_Sans_Serif'] text-white">
              Select from computer
            </div>
          </div>
        </div>
        <div className="border-solid w-16 h-16 origin-top-left rotate-[-2.42deg] absolute top-[315.7909240722656px] left-[303px] flex flex-col items-start pl-2 py-1 border-black border-2 rounded-lg">
          <img
            src="https://file.rendit.io/n/hNV5ObDIVYlWBYyM9uWq.svg"
            id="Ellipse"
            className="w-3"
          />
        </div>
        <div className="border-solid w-16 h-16 origin-top-left rotate-[2.18deg] bg-white absolute top-[329px] left-[348.513671875px] flex flex-col items-start pl-2 py-2 border-black border-2 rounded-lg">
          <img src="" className="ml-1 w-10" />
        </div>
      </div>
    </div>
  );
}

export default NewPost;
