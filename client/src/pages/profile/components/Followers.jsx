import React from "react";
import PortalModal from "../../../components/uiPrimitives/modal/PortalModal";

function Followers({ showModal }) {
  if (!showModal) return null;
  return (
    <PortalModal show={showModal}>
      <div id="NewRootRoot" className="flex flex-col w-1/3">
        <div className="shadow-[0px_4px_15px_4px_rgba(0,_0,_0,_0.25)] bg-white flex flex-col gap-5 items-start pt-6 pb-16 px-1 rounded-lg">
          <div className="self-stretch relative flex flex-col ml-6 pt-1 gap-6 items-end">
            <div
              id="Ellipse"
              className="w-24 h-24 bg-[url(https://file.rendit.io/n/FU5Euzj614NRvVd8MSPA.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat absolute top-5 left-px flex flex-col items-start pt-px pb-1 px-px">
              <img src="" className="ml-px w-24" />
            </div>
            <div
              id="Ellipse1"
              className="w-24 h-24 bg-[url(https://file.rendit.io/n/FU5Euzj614NRvVd8MSPA.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat absolute top-5 left-40 flex flex-col items-start pt-px pb-1 px-px">
              <img src="" className="ml-px w-24" />
            </div>
            <div className="text-2xl font-['Microsoft_Sans_Serif'] tracking-[1.38] absolute top-0 left-40 h-6 w-32">
              Followers
            </div>
            <img
              src="https://file.rendit.io/n/WBPG3N74hLMePamVAult.svg"
              className="relative mr-8 w-6"
            />
            <div className="self-stretch relative flex flex-col gap-5">
              <div className="bg-[#ecebeb] flex flex-col justify-center pl-5 h-12 shrink-0 items-start ml-4 mr-10 rounded-lg">
                <div className="text-lg font-['Microsoft_Sans_Serif']">
                  Search
                </div>
              </div>
              <div className="flex flex-row gap-24 items-end">
                <div className="flex flex-col mr-1 gap-4 items-start">
                  <div className="flex flex-row gap-4 w-40 items-center">
                    <div className="self-start relative flex flex-col w-16 shrink-0 items-start">
                      <img
                        src=""
                        className="w-16 h-16 absolute top-px left-px"
                      />
                      <img src="" className="relative w-16" />
                    </div>
                    <div className="flex flex-col gap-1 w-20 shrink-0 items-start">
                      <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54]">
                        Aja_ssd
                      </div>
                      <div className="text-sm font-['Microsoft_Sans_Serif'] tracking-[0.42]">
                        Ajmal asad
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 w-40 items-center">
                    <div className="self-start relative flex flex-col w-16 shrink-0 items-start">
                      <img
                        src=""
                        className="w-16 h-16 absolute top-px left-px"
                      />
                      <img src="" className="relative w-16" />
                    </div>
                    <div className="flex flex-col gap-1 w-20 shrink-0 items-start">
                      <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54]">
                        Aja_ssd
                      </div>
                      <div className="text-sm font-['Microsoft_Sans_Serif'] tracking-[0.42]">
                        Ajmal asad
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2 gap-2 w-20 shrink-0 items-start">
                  <img src="" className="mt-px w-4 shrink-0" />
                  <div className="font-['Microsoft_Sans_Serif']">REELS</div>
                </div>
                <div className="self-start flex flex-col mb-2 gap-4 w-12 shrink-0 items-start">
                  <img
                    src="https://file.rendit.io/n/dau7mKuYucNMncZTYn1P.svg"
                    className="ml-1 w-3"
                  />
                  <div className="font-['Microsoft_Sans_Serif']">SAVED</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row ml-6 gap-4 items-center">
            <div className="self-start relative flex flex-col w-16 shrink-0 items-start">
              <img src="" className="w-16 h-16 absolute top-px left-px" />
              <img src="" className="relative w-16" />
            </div>
            <div className="flex flex-col gap-1 w-20 shrink-0 items-start">
              <div className="text-lg font-['Microsoft_Sans_Serif'] tracking-[0.54]">
                Aja_ssd
              </div>
              <div className="text-sm font-['Microsoft_Sans_Serif'] tracking-[0.42]">
                Ajmal asad
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalModal>
  );
}

export default Followers;
