import React from "react";
import InputField from "../../uiPrimitives/fields/InputField";

function SearchUser({searchTerm,usersList,setSearchTerm,onClick}) {
  return (
    <>
      <div className="border-b flex gap-3 px-4 items-center py-1">
        <p className="font-semibold">To:</p>
        {/* <input type="text" placeholder="Search" className="w-full" /> */}
        <InputField
          placeholder="Search.."
          extra="border-0 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="max-h-80 h-80 overflow-y-scroll ">
        {usersList?.length > 0 ? (
          usersList?.map((user) => (
            <div
              key={user._id}
              onClick={() => onClick(user._id)}
              className="p-3 flex gap-3 items-center hover:bg-gray-100 cursor-pointer">
              <img
                src={user.imageUrl}
                className="w-10 h-10 rounded-full
        "
                alt=""
              />
              <div className="leading-3">
                <p>{user.fullName}</p>
                <p className="text-sm text-gray-400">{user.userName}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="px-5 py-5">
            <p className="text-sm text-gray-400">No account found.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchUser;
