import React from "react";
import UserImage from "./UserImage";
import { Link } from "react-router-dom";

function UserStory({ imgUrl, userName, extra }) {
  return (
    <Link to="/story">
      <div className="text-sm ">
        <div className="circle">
          <UserImage
            imgUrl={imgUrl}
            extra="rounded-full object-cover w-full h-full  bg-white"
          />
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ enableBackground: "new -580 439 577.9 194" }}
            xml:space="preserve">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>
        <p className="text-xs  text-center mt-1">{userName}</p>
      </div>
    </Link>
  );
}

export default UserStory;
