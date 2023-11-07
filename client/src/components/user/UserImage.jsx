import React from "react";
import { Link } from "react-router-dom";

function UserImage({ imgUrl, extra }) {
  return <img src={imgUrl} alt="" className={`rounded-full`} />;
}

export default UserImage;
