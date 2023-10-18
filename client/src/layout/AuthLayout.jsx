import React from "react";

function AuthLayout({ children }) {
  return (
    <div
      className="overflow-hidden bg-white flex flex-col justify-end w-full items-center">
      <div className="flex flex-col gap-3 items-center">
        {children}
        <div className="text-center text-base font-['Microsoft_Sans_Serif'] tracking-[-0.77] leading-[26.1px] text-[#6e6e6e]">
          Get the app.
        </div>
      </div>
      <img src="" id="Image1" className="self-start mb-0" />
    </div>
  );
}

export default AuthLayout;
