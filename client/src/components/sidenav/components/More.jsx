import React from "react";

function More() {
  return (
    <div id="NewRootRoot" className="flex flex-col w-full">
      <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] bg-white flex flex-col justify-between h-[310px] shrink-0 py-6 rounded-[21px]">
        <div className="flex flex-col gap-8 items-start mx-1">
          <div className="flex flex-col ml-6 gap-6 w-24 h-16 shrink-0 items-start">
            <div className="flex flex-row gap-3 w-24 items-start">
              <img
                src="https://file.rendit.io/n/LxVGRgkUcHki0oQQ4qEv.svg"
                className="w-4 shrink-0"
              />
              <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54]">
                Settings
              </div>
            </div>
            <div className="flex flex-row gap-3 w-20 items-start">
              <img
                src="https://file.rendit.io/n/pIGsoPoYe9y0aVxXtVDt.svg"
                className="mt-px w-4 shrink-0"
              />
              <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54]">
                Saved
              </div>
            </div>
          </div>
          <div className="bg-[#f1f1f1] self-stretch h-3 shrink-0" />
        </div>
        <div className="self-start flex flex-row ml-8 gap-3 items-center">
          <img
            src="https://file.rendit.io/n/SWv2jHiBqrkHLDdqe64p.svg"
            className="w-4 shrink-0"
          />
          <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] self-start">
            Dark Mode
          </div>
        </div>
        <div className="flex flex-col ml-2 gap-6 h-12 shrink-0 items-start">
          <div className="bg-[#f1f1f1] self-stretch h-1 shrink-0" />
          <div className="flex flex-row ml-6 gap-1 w-24 items-start">
            <img
              src="https://file.rendit.io/n/dXnHZC1XLgB5QGihZwkb.svg"
              className="w-6 shrink-0"
            />
            <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] mt-px">
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default More;
