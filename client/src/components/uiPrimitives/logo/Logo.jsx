import React from "react";
import logo from "../../../assets/img/snapsync_logo.png";

function Logo({ extra }) {
  return (
    <img
      src={logo}
      id="Logo"
      className={`bg-cover scale-75 mt-7 lg:w-48 ${extra}`}
    />
  );
}

export default Logo;
