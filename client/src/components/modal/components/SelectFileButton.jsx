import React from "react";
import CreatePostIcon from "../../../assets/svg/CreatePostIcon";

function SelectFileButton({handleMedia}) {
  return (
    <div className="relative flex flex-col flex-grow  h-full  gap-8 justify-center items-center border-r">
      <div>
        <CreatePostIcon />
      </div>
      <div className="text-xl  text-[#808080] mr-2">
        Drag photos and videos here
      </div>
      <div className="bg-[#0095f6] self-center flex flex-col justify-center w-[213px] h-10 items-center rounded-lg text-white cursor-pointer">
        <label htmlFor="fileInput" className="cursor-pointer">
          Select from computer
        </label>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          name="file"
          accept="image/*,video/*"
          multiple={true}
          onChange={(e) => handleMedia(Array.from(e.target.files), false)}
          // Add your file input attributes and event handlers here
        />
      </div>
    </div>
  );
}

export default SelectFileButton;
