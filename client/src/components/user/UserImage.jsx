import React from "react";
import { Link } from "react-router-dom";

function UserImage({ imgUrl, extra}) {
  return (
    <div className={`rounded-full ${extra}`}>
      <img src={imgUrl} alt="" className={`rounded-full ${extra}`} />
    </div>
  );

}

export default UserImage;
