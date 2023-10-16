import React from "react";

function Search() {
  return (
    <div id="NewRootRoot" className="flex flex-col w-full">
      <div className="bg-white flex flex-col gap-16 h-[1055px] shrink-0 px-4 py-12 rounded-tr-[20px] rounded-br-[20px]">
        <div className="flex flex-col mr-1 gap-12 h-32 shrink-0 items-start">
          <div className="text-2xl font-['Poppins'] font-medium tracking-[0.72] ml-2">
            Search
          </div>
          <div className="bg-[#ecebeb] self-stretch flex flex-row justify-between h-12 shrink-0 items-center px-5 rounded-lg">
            <div className="text-lg font-['Microsoft_Sans_Serif']">Search</div>
            <img
              src="https://file.rendit.io/n/qU3rEb5lFAqqGgQPkPrB.svg"
              className="w-4 shrink-0"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-start ml-2 mr-10">
          <div className="flex flex-col gap-10 w-3/5 h-24 items-start">
            <div className="text-xl font-['Microsoft_Sans_Serif']">Recent</div>
            <div className="self-stretch flex flex-col ml-16 gap-1 items-start">
              <div className="text-base font-['Microsoft_Sans_Serif']">
                queen_official
              </div>
              <div className="text-sm font-['Microsoft_Sans_Serif'] text-[#b9b9b9]">
                queen_official . Following{" "}
              </div>
            </div>
          </div>
          <div className="text-base font-['Microsoft_Sans_Serif'] text-[#009cff] mt-px">
            Clear all
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
