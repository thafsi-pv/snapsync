import React from "react";

function Settings() {
  return (
    <div id="NewRootRoot" className="flex flex-col w-full">
      <div className="border-solid border-[#c9c9c9] bg-white flex flex-col justify-between h-[805px] shrink-0 items-start pt-6 pb-24 pl-40 border">
        <div className="flex flex-col gap-16 w-2/3">
          <div className="text-center text-2xl font-['Microsoft_Sans_Serif'] tracking-[0.75] leading-[38.4px] self-start mb-1 ml-1">
            Edit profile
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col ml-3 gap-4">
              <div className="flex flex-row justify-between mr-2 items-start">
                <div className="flex flex-row gap-12 w-1/2 items-start">
                  <img src="" className="w-12 shrink-0" />
                  <div className="relative flex flex-col justify-end pt-6 w-2/3 items-start">
                    <div className="text-center text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] leading-[27.6px] absolute top-0 left-px h-6 w-[178px]">
                      Abdul_ahad_desgins
                    </div>
                    <div className="text-center font-['Microsoft_Sans_Serif'] tracking-[-0.72] leading-[24.6px] text-[#1895f6] relative">
                      Change profile photo
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm font-['Microsoft_Sans_Serif'] tracking-[-0.84] leading-[21.5px] text-[#0095f6] self-end mb-1">
                  Change Password
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start">
                <div className="self-stretch flex flex-row gap-6 items-center">
                  <div className="text-center text-lg font-['Microsoft_Sans_Serif'] tracking-[-0.81] leading-[27.6px]">
                    Website
                  </div>
                  <div className="bg-[#d9d9d9] self-start flex flex-col w-[444px] h-10 items-start pl-4 py-2 rounded">
                    <div className="text-center font-['Microsoft_Sans_Serif'] tracking-[-0.72] leading-[24.6px] text-[#5b5757]">
                      Website
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-20 w-3/5 items-start">
                  <div className="text-center text-sm font-['Microsoft_Sans_Serif'] tracking-[-0.63] leading-[21.5px] text-[#716b6b]">
                    Editing your links only available on mobile. visit the
                    instagran{" "}
                  </div>
                  <div className="text-center text-sm font-['Microsoft_Sans_Serif'] tracking-[-0.63] leading-[21.5px] text-[#716b6b]">
                    app and edit your profile to change the websites in your
                    bio.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
              <div className="text-center text-lg font-['Microsoft_Sans_Serif'] tracking-[-0.81] leading-[27.6px] mt-px">
                Full Name
              </div>
              <div className="flex flex-col gap-1 w-[444px] items-start">
                <div className="border-solid border-[#b9a6a6] self-stretch h-8 shrink-0 border rounded" />
                <div className="text-center text-xs font-['Microsoft_Sans_Serif'] tracking-[-0.54] leading-[18.4px] text-[#716b6b] ml-1">
                  0 / 50
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row ml-12 gap-6 items-start">
            <div className="text-center text-lg font-['Microsoft_Sans_Serif'] tracking-[-0.81] leading-[27.6px] mt-1">
              Bio
            </div>
            <div className="flex flex-col gap-2 w-[444px] items-start">
              <div className="border-solid border-[#b9a6a6] self-stretch flex flex-col h-20 shrink-0 items-start pl-4 py-1 border rounded">
                <div className="text-center font-['Microsoft_Sans_Serif'] tracking-[-0.72] leading-[24.6px] text-[#716b6b]">
                  UI/UX desginer
                </div>
              </div>
              <div className="text-center text-xs font-['Microsoft_Sans_Serif'] tracking-[-0.54] leading-[18.4px] text-[#716b6b] ml-1">
                36 / 150
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#0095f6] flex flex-col ml-24 w-24 items-center px-5 py-1 rounded-lg">
          <div className="text-center text-lg font-['Microsoft_Sans_Serif'] tracking-[-0.81] leading-[27.6px] text-white">
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
