import React from "react";

function SideNav() {
  return (
    <div
      id="NewRootRoot"
      className="relative flex flex-col justify-between gap-64 w-full items-start px-px py-12">
      <img
        src="https://file.rendit.io/n/ebdzk6Er1taN7MvfyWHS.svg"
        className="w-4 h-6 origin-top-left rotate-[46.3deg] absolute top-[147px] left-4"
      />
      <img
        src="https://file.rendit.io/n/3OduApP8Njl3HgqCj8Vd.svg"
        className="w-4 h-4 origin-top-left rotate-[-44.16deg] absolute top-40 left-3"
      />
      <div className="relative flex flex-col gap-16 w-1/2 items-start">
        <img
          src=""
          id="Logo"
          className="bg-[undefined] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat ml-1"
        />
        <div className="self-stretch flex flex-col gap-10 h-[520px] shrink-0">
          <div className="self-start flex flex-row gap-5 w-24 items-start mb-px ml-1">
            <div className="relative flex flex-col mb-px w-6 shrink-0 items-start">
              <img
                src="https://file.rendit.io/n/kvORmX7vPhmL6yEfKXtV.svg"
                className="w-6 h-6 absolute top-0 left-0"
              />
              <img
                src="https://file.rendit.io/n/kvORmX7vPhmL6yEfKXtV.svg"
                className="relative w-6"
              />
            </div>
            <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] mt-2">
              Home
            </div>
          </div>
          <div className="flex flex-row gap-5 items-start mb-px ml-1 mr-12">
            <img
              src="https://file.rendit.io/n/2vkMpaafZzr7sduSvsKm.svg"
              className="w-6 shrink-0"
            />
            <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] mt-px">
              Search
            </div>
          </div>
          <div className="flex flex-row gap-5 items-start mb-px ml-px mr-8">
            <img
              src="https://file.rendit.io/n/WGrPMUc0s6Cy2IdmAT0B.svg"
              className="w-6 shrink-0"
            />
            <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] mt-1">
              Explore
            </div>
          </div>
          <div className="self-start flex flex-row gap-6 w-24 items-start mb-1 ml-px">
            <img src="" className="w-6 shrink-0" />
            <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] mt-px">
              Reels
            </div>
          </div>
          <div className="flex flex-row gap-5 items-start mb-1 ml-1 mr-6">
            <img
              src="https://file.rendit.io/n/Cb8toI9fgX8Hsg2uUGWl.svg"
              className="w-6 shrink-0"
            />
            <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] mt-px">
              Messages
            </div>
          </div>
          <div className="flex flex-row gap-5 items-start mb-1 ml-px">
            <img
              src="https://file.rendit.io/n/wAK42WACeDcBDCxNV0Ev.svg"
              className="w-6 shrink-0"
            />
            <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54] mt-px">
              Notificaions
            </div>
          </div>
          <div className="flex flex-row gap-6 items-center ml-px mr-12">
            <img
              src="https://file.rendit.io/n/gIPHCveSiaZ6zR8ZYuh4.svg"
              className="self-start w-6 shrink-0"
            />
            <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54]">
              Create
            </div>
          </div>
          <div className="flex flex-row mr-10 gap-5 items-start">
            <div
              id="Ellipse"
              className="bg-[url(https://file.rendit.io/n/I4NUMRbC5bNjbvxV0ZuP.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col w-8 shrink-0 items-center p-px">
              <img src="" className="w-8" />
            </div>
            <div className="text-lg font-['Poppins'] tracking-[0.54] mt-1">
              Profile
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-row ml-1 gap-6 w-24 items-start">
        <img
          src="https://file.rendit.io/n/EcsMudLnbACoGTkntn2L.svg"
          className="mt-px w-6 shrink-0"
        />
        <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54]">
          More
        </div>
      </div>
    </div>
  );
}

export default SideNav;
