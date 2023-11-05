import React from "react";
import { Link } from "react-router-dom";
import UserImage from "./UserImage";

function UserImgName({ id, username, fullName, desc, imgUrl, extra }) {
  return (
    <div className=" flex gap-3 items-center">
      <Link to={`/${username}`}>
        <UserImage imgUrl={imgUrl} extra={extra} />
      </Link>

      <div className="w-full gap-2 items-center">
        <p className="text-sm font-semibold">{fullName}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

export default UserImgName;
