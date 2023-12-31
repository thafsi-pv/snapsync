import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserImage from "./UserImage";
import { UserActionContext } from "../../services/providers/UserActionContext";

function UserImgName({ id, username, fullName, desc, imgUrl, extra }) {
  const { setLoadStory } = useContext(UserActionContext);
  const navigate = useNavigate();
  const handleLoadStory = () => {
    setLoadStory({ loading: true, id });
    const timeOut = setTimeout(() => {
      // navigate("/story");
    }, 3000);
    return () => clearTimeout(timeoutId);
  };
  return (
    <div className=" flex gap-2 items-center">
      <div className={extra} onClick={handleLoadStory}>
        {/* <Link to={`/${username}`}> */}
        <UserImage
          imgUrl={imgUrl}
          extra={extra}
          id={id}
          username={username}
          imgStyle="!p-0.5"
        />
        {/* </Link> */}
      </div>

      <div className="w-full gap-2 items-center">
        <Link to={`/${username}`}>
          <p className="text-sm font-semibold">{fullName}</p>
        </Link>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

export default UserImgName;
