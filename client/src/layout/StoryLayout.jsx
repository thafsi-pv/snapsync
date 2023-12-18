import React from "react";
import logo6 from "../assets/img/snapsync_logo5.png";
import { Link, Outlet } from "react-router-dom";

function StoryLayout({ children }) {
  return (
    <div className="relative w-screen h-screen bg-black ">
      <Link to="/">
        <div className="fixed top-5 left-5 w-32 cursor-pointer">
          <img src={logo6} alt="snapsync" />
        </div>
      </Link>
     {children}
    </div>
  );
}

export default StoryLayout;
