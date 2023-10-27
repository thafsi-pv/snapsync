import React, { useContext } from "react";
import { UserActionContext } from "../../../context/UserActionContext";

function User() {
  const { userData, setUserData } = useContext(UserActionContext);
  console.log("🚀 ~ file: User.jsx:6 ~ User ~ userData:", userData);

  return (
    <div className="bg-blend-normal bg-no-repeat flex  items-center w-full  gap-3 pt-1 pb-px px-px">
      <img src={userData?.imageUrl} className="ml-px w-11 h-11 rounded-full" />
      <div className="flex flex-col flex-grow">
        <p className="text-sm font-semibold">{userData?.fullName}</p>
        <p className="text-xs text-gray-400">{userData?.userName}</p>
      </div>
      <div className="items-end flex-grow-0 p-2">
        <button className="text-xs font-semibold text-blue-500">Switch</button>
      </div>
    </div>
  );
}

export default User;
