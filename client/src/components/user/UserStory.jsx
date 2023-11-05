import React from "react";
import UserImage from "./UserImage";
import { Link } from "react-router-dom";

function UserStory({ imgUrl, extra }) {
  return (
    <Link to='/story'>
      <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px]  h-[70px] m-2 p-[2px] ">
        <UserImage
          imgUrl={imgUrl}
          extra="rounded-full object-cover w-full h-full p-[1px] bg-white"
        />
        <p className="text-xs"> Zia_queen</p>
      </div>
    </Link>
  );
}

export default UserStory;
