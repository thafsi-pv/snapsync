import React from "react";
import logo from "../../../assets/img/snapsync_logo.png";
import { useNavigate } from "react-router-dom";

function Logo({ extra }) {
  const navigate = useNavigate();
  const hadleOnclick = () => {
    navigate("/");
  };
  return (
    <img
      onClick={hadleOnclick}
      src={logo}
      id="Logo"
      className={`bg-cover scale-75 mt-7 lg:w-48 ${extra} cursor-pointer`}
    />
  );
}

export default Logo;
