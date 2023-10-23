import React from "react";
import Story from "./Story";
import Suggestions from "./Suggestions";
import Post from "./Post";

function Container() {
  return (
    <div className="flex overflow-hidden min-h-full mx-20 w-fit">
      <div className="self-start flex flex-col gap-16 w-4/6">
        <Story />
        <Post />
      </div>
      <Suggestions />
    </div>
  );
}

export default Container;
