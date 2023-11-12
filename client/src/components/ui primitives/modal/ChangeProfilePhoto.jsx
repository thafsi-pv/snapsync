import React from "react";

function ChangeProfilePhoto() {
  return (
    <div className="overflow-hidden bg-white flex flex-col justify-center gap-4 w-full h-40 items-center rounded-lg">
      <div className="self-stretch flex flex-col gap-2 ml-px mr-0">
        <div className="relative flex flex-col justify-center pt-8 pb-10">
          <div className="text-base font-['Poppins'] font-semibold tracking-[0.51] text-[#0898f6] absolute top-0 left-32 h-12 w-1/3">
            Upload Photo
          </div>
          <div className="text-base font-['Poppins'] font-semibold tracking-[0.51] text-[#ed4956] absolute top-12 left-24 h-6 w-[209px]">
            Remove Current Photo
          </div>
          <div className="bg-[#dfdfdf] relative h-px shrink-0" />
        </div>
        <div className="bg-[#dfdfdf] h-px shrink-0" />
      </div>
      <div className="text-base font-['Poppins'] font-medium tracking-[0.51]">
        Cancel
      </div>
    </div>
  );
}

export default ChangeProfilePhoto;
