import React from "react";

function ChangePassword() {
  return (
    <div
      id="ChangePasswordRoot"
      className="overflow-hidden bg-white flex flex-col gap-12 w-full h-[1031px] items-center py-40">
      <img
        src=""
        id="Logo"
        className="bg-[undefined] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat"
      />
      <div className="border-solid border-[#d7d7d7] flex flex-col gap-16 h-[497px] shrink-0 items-center py-10 border">
        <div className="text-center text-2xl tracking-[-0.84]">
          Change Password
        </div>
        <div className="flex flex-col gap-12 w-[335px] mx-12">
          <div className="flex flex-col justify-between gap-2">
            <div className="border-solid border-[#d7d7d7] flex flex-col justify-center pl-2 h-12 shrink-0 items-start border rounded">
              <div
                id="CurrentPassword"
                className="text-sm tracking-[-0.49] text-[#747474]">
                Current Password
              </div>
            </div>
            <div className="border-solid border-[#d7d7d7] flex flex-col justify-center pl-2 h-12 shrink-0 items-start border rounded">
              <div
                id="NewPassword"
                className="text-sm tracking-[-0.49] text-[#747474]">
                New password
              </div>
            </div>
            <div className="border-solid border-[#d7d7d7] flex flex-col justify-center pl-2 h-12 shrink-0 items-start border rounded">
              <div className="text-sm tracking-[-0.49] text-[#747474]">
                Confirm Password
              </div>
            </div>
          </div>
          <div className="bg-[#0095f6] flex flex-col items-center pt-1 pb-2 px-[139px] rounded-lg">
            <div className="text-center text-lg tracking-[-0.81] leading-[27.6px] text-white">
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
