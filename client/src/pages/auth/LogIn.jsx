import React from "react";
import logo from "../../assets/img/snapsync_logo.png";
import InputField from "../../components/fields/InputField";

function LogIn() {
  return (
    <div
      id="LogInRoot"
      className="overflow-hidden bg-white flex flex-col justify-end pt-16 gap-5 w-full items-center">
      <div className="flex flex-col gap-3 items-start">
        <div className="relative flex flex-col w-[437px]">
          <div className="w-[335px] h-10 bg-[#0095f6] absolute top-[287px] left-10 flex flex-col items-center pt-1 pb-2 px-[145px] rounded-lg">
            <div className="text-center text-lg font-['Microsoft_Sans_Serif'] tracking-[-0.81] leading-[27.6px] text-white">
              Log in
            </div>
          </div>
          <img
            src=""
            id="Logo"
            className="w-[210px] h-16 bg-[undefined] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat absolute top-16 left-24"
          />
          <div className="border-solid border-[#d7d7d7] relative flex flex-col justify-end gap-20 h-[497px] shrink-0 px-10 py-6 border">
            <div className="flex flex-col mr-5 gap-2">
              <div className="border-solid border-[#d7d7d7] flex flex-col justify-center pl-2 h-12 shrink-0 items-start border rounded">
                <div className="text-sm font-['Microsoft_Sans_Serif'] tracking-[-0.49] text-[#747474]">
                  Phone number, Username, or Email
                </div>
              </div>
              <div className="border-solid border-[#d7d7d7] flex flex-col justify-center pl-2 h-12 shrink-0 items-start border rounded">
                <div className="text-sm font-['Microsoft_Sans_Serif'] tracking-[-0.49] text-[#747474]">
                  Passowrd
                </div>
              </div>
            </div>
            <div className="flex flex-col mr-5 gap-8 items-start">
              <div className="self-stretch flex flex-row gap-5 items-start">
                <div
                  id="Line"
                  className="border-solid border-[#dfdfdf] mt-3 w-2/5 h-px border-t border-b-0 border-x-0"
                />
                <div className="flex flex-row gap-5 w-1/2 items-start">
                  <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[-0.63] text-[#606060]">
                    OR
                  </div>
                  <div
                    id="Line1"
                    className="border-solid border-[#dfdfdf] mt-3 w-32 h-px border-t border-b-0 border-x-0"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-20 gap-6 w-1/2 h-16 shrink-0 items-start">
                <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[-0.63] text-[#606060]">
                  Log in with Facebook
                </div>
                <div className="text-sm font-['Microsoft_Sans_Serif'] tracking-[-0.53] self-end mr-2">
                  Forgot password ?
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-solid border-[#d7d7d7] flex flex-row justify-center gap-px w-[437px] h-20 shrink-0 items-center border">
          <div className="text-lg font-['Poppins'] tracking-[-0.63]">
            Don’t have an account ?
          </div>
          <div className="text-lg font-['Poppins'] font-medium tracking-[-0.63] text-[#0095f6]">
            Sign up
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col gap-3 items-center">
        <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[-0.63]">
          Get the app.
        </div>
        <img src="" id="Image1" className="self-start" />
      </div>
    </div>
  );
}

export default LogIn;
