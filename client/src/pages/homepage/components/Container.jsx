import React, { useState } from "react";
import Story from "./Story";
import Suggestions from "./Suggestions";
import Post from "./Post";
import Comments from "../modal/Comments";

function Container() {
  const [comments, setComments] = useState(false);
  const [postId, setPostId] = useState(null);

  return (
    <div className="flex overflow-hidden min-h-full mx-20 w-fit">
      <div className="self-start flex flex-col gap-16 w-4/6">
        <Story />
        <Post setPostId={setPostId} setComments={setComments} />
      </div>
      <Suggestions />
      <Comments
        postId={postId}
        show={comments}
        closeModal={() => setComments(false)}
      />
    </div>
  );
}

export default Container;
