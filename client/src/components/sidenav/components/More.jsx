import React from "react";
import { Link } from "react-router-dom";

function More({ more, setMore }) {
  const handleMoreBtn = () => {
    setMore((prev) => !prev);
  };
  const handleMoreClose = () => {
    console.log("dsf");
    console.log("🚀 ~ file: SideNav.jsx:26 ~ SideNav ~ before  more:", more);
    setMore(false);
    console.log("🚀 ~ file: SideNav.jsx:26 ~ SideNav ~ afrter  more:", more);
  };
  return (
    <div className="flex flex-col w-full relative ">
      <div className="fixed top-0 left-0 right-0 w-screen h-screen">
        <button onClick={handleMoreBtn}></button>
      </div>
      <div className="shadow-2xl bg-white flex flex-col justify-between h-[310px] shrink-0 py-6 rounded-[21px] z-10">
        <div className="flex flex-col gap-8 items-start">
          <div className="flex flex-col gap-6 w-full h-16 shrink-0 items-start p-2">
            <div className="flex flex-row gap-3 items-center w-full hover:bg-gray-300 hover:rounded-md">
              <img
                src="https://file.rendit.io/n/LxVGRgkUcHki0oQQ4qEv.svg"
                className="w-4 shrink-0"
              />
              <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] ">
                Settings
              </div>
            </div>
            <div className="flex flex-row gap-3 w-20 items-center">
              <img
                src="https://file.rendit.io/n/pIGsoPoYe9y0aVxXtVDt.svg"
                className="mt-px w-4 shrink-0"
              />
              <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54]">
                Saved
              </div>
            </div>
          </div>
          <div className="bg-[#f1f1f1] self-stretch h-2 shrink-0" />
        </div>
        <div className="self-start flex flex-row p-2 gap-3 items-center">
          <img
            src="https://file.rendit.io/n/SWv2jHiBqrkHLDdqe64p.svg"
            className="w-4 shrink-0"
          />
          <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] self-start">
            Dark Mode
          </div>
        </div>
        <div className="flex flex-col gap-6 h-12 shrink-0 items-start">
          <div className="bg-[#f1f1f1] self-stretch h-1 shrink-0" />
          <Link to='/auth/login' className="flex flex-row px-2 gap-1 items-center">
            <img
              src="https://file.rendit.io/n/dXnHZC1XLgB5QGihZwkb.svg"
              className="w-6 shrink-0"
            />
            <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] mt-px">
              Log out
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default More;
