import React from "react";

function User() {
  return (
    <div className="bg-blend-normal bg-no-repeat flex  items-center w-full  gap-3 pt-1 pb-px px-px">
      <img
        src="https://4.img-dpreview.com/files/p/E~C667x0S5333x4000T1200x900~articles/3925134721/0266554465.jpeg"
        className="ml-px w-11 h-11 rounded-full"
      />
      <div className="flex flex-col flex-grow">
        <p className="text-sm font-semibold">John</p>
        <p className="text-xs text-gray-400">john.123</p>
      </div>
      <div className="items-end flex-grow-0 p-2">
        <button className="text-xs font-semibold text-blue-500">Switch</button>
      </div>
    </div>
  );
}

export default User;
