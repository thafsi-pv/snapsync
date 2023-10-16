import React from "react";

function OTP() {
  return (
    <div id="NewRootRoot" className="flex flex-col w-full">
      <div
        id="OTP"
        className="overflow-hidden bg-white flex flex-col gap-12 h-[1031px] shrink-0 items-center py-40">
        <img
          src=""
          id="Logo"
          className="bg-[undefined] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat"
        />
        <div className="border-solid border-[#d7d7d7] flex flex-col justify-between h-[490px] shrink-0 items-start pt-10 pb-20 pl-4 border">
          <div className="flex flex-col mr-5 gap-8 w-[413px]">
            <div className="flex flex-col gap-3 items-start ml-1 mr-20">
              <div className="text-center text-2xl font-['Microsoft_Sans_Serif'] tracking-[-0.84] self-end mr-20">
                Enter OTP
              </div>
              <div className="font-['Microsoft_Sans_Serif'] tracking-[-0.56]">
                OTP has been sent to your registered email/phone
                <br />
                debugmedia@gmail.com
              </div>
            </div>
            <div className="flex flex-row justify-between items-start">
              <div className="border-solid border-[#d7d7d7] bg-white w-12 shrink-0 h-12 border rounded" />
              <div className="border-solid border-[#d7d7d7] bg-white w-12 shrink-0 h-12 border rounded" />
              <div className="border-solid border-[#d7d7d7] bg-white w-12 shrink-0 h-12 border rounded" />
              <div className="border-solid border-[#d7d7d7] bg-white w-12 shrink-0 h-12 border rounded" />
              <div className="border-solid border-[#d7d7d7] bg-white w-12 shrink-0 h-12 border rounded" />
              <div className="border-solid border-[#d7d7d7] bg-white w-12 shrink-0 h-12 border rounded" />
            </div>
          </div>
          <div className="flex flex-col ml-8 gap-3 w-[335px] items-start">
            <div className="bg-[#0095f6] self-stretch flex flex-col justify-center h-12 shrink-0 items-center rounded-lg">
              <div className="text-center text-lg font-['Microsoft_Sans_Serif'] tracking-[-0.81] leading-[27.6px] text-white">
                Submit
              </div>
            </div>
            <div className="text-sm font-['Microsoft_Sans_Serif'] tracking-[0.35] text-[#0095f6] ml-px">
              Resend OTP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTP;
