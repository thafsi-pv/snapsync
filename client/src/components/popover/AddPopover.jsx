import React from "react";
import PostIcon from "../../assets/svg/PostIcon";
import StoryIcon from "../../assets/svg/StoryIcon";
import useSocialAction from "../../hooks/useSocialAction";

function AddPopover({ handleclose }) {
  const { setAddPost, setAddStory } = useSocialAction();
  return (
    <div className="flex flex-col w-fit relative m-9 ">
      <div
        className="fixed top-0 left-0 right-0 w-screen h-screen"
        onClick={handleclose}></div>
      <div className="shadow-2xl bg-white flex flex-col justify-between h-fit shrink-0 py-2 rounded-[21px] border z-10">
        <div className="flex flex-col gap-1 w-full shrink-0 items-start p-2">
          <div
            className="flex flex-row gap-3 items-center justify-around hover:bg-gray-300 hover:rounded-md w-full p-2 cursor-pointer"
            onClick={() => setAddPost(true)}>
            Post
            <PostIcon />
          </div>
          <div
            className="flex flex-row gap-3 items-center justify-around hover:bg-gray-300 hover:rounded-md w-full p-2 cursor-pointer"
            onClick={() => setAddStory(true)}>
            Story
            <StoryIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPopover;
