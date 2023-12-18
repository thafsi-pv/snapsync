import React, { useContext, useState } from "react";
import UserImage from "./UserImage";
import { Link, useNavigate } from "react-router-dom";
import { UserActionContext } from "../../services/providers/UserActionContext";

function UserStory({ id, imgUrl, userName, extra }) {
  const { loadStory, setLoadStory } = useContext(UserActionContext);

  const navigate = useNavigate();
  const handleLoadStory = () => {
    setLoadStory({ loading: true, id });
    const timeOut = setTimeout(() => {
      navigate(`/story/${id}`);
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="text-sm cursor-pointer" onClick={handleLoadStory}>
      <UserImage
        imgUrl={imgUrl}
        extra="w-[74px] h-[74px]"
        loading={loadStory}
        id={id}
      />
      <p className="text-xs text-center w-18 truncate">{userName}</p>
    </div>
  );
}

export default UserStory;
