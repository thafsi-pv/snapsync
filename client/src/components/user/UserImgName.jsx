import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserImage from "./UserImage";
import { UserActionContext } from "../../context/UserActionContext";

function UserImgName({ id, username, fullName, desc, imgUrl, extra }) {
  console.log("🚀 ~ file: UserImgName.jsx:7 ~ UserImgName ~ id:", id);
  const { loadStory, setLoadStory } = useContext(UserActionContext);
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
        <UserImage imgUrl={imgUrl} extra={extra} id={id} username={username} imgStyle='!p-0.5'/>
        {/* </Link> */}
      </div>

      <div className="w-full gap-2 items-center">
        <p className="text-sm font-semibold">{fullName}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

export default UserImgName;
