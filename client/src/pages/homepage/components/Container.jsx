import React, { useContext, useState } from "react";
import Story from "./Story";
import Suggestions from "./Suggestions";
import Post from "./Post";
import Comments from "../../../components/modal/Comments";
import { UserActionContext } from "../../../services/providers/UserActionContext";

function Container() {
  const { comments, setComments, postId } = useContext(UserActionContext);

  // const [comments, setComments] = useState(false);
  // const [postId, setPostId] = useState(null);

  return (
    <div className="flex overflow-hidden min-h-full min-w-full justify-evenly ">
      <div className="self-start flex flex-col gap-16 lg:w-8/12 md:w-7/12 sm:w-full max-w-[680px]">
        <Story />
        <Post />
      </div>
      <div className="hidden lg:block w-3/12">
        <Suggestions />
      </div>
      <Comments
        postId={postId}
        show={comments}
        closeModal={() => setComments(false)}
      />
    </div>
  );
}

export default Container;
