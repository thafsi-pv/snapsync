import React from "react";
import PortalModal from "../../../components/modal/PortalModal";

function Comments({ show, closeModal }) {
  if (!show) return null;
  return (
    <PortalModal show={show}>
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden ">
        <div
          className="fixed inset-0 bg-black opacity-50 "
          onClick={closeModal}></div>
        <div className="shadow-[0px_0px_15px_0px_rgba(0,_0,_0,_0.25)]  w-4/5 h-[80%] bg-white  flex z-10  rounded">
          <div className="w-3/5 h-full">
            <img
              className="object-cover w-full h-full rounded-l"
              src="https://res.cloudinary.com/dm4djc1b1/image/upload/v1698081757/xjn1yftddiogmk9q0vmq.jpg"
              alt=""
            />
          </div>
          <div className="p-4 w-2/5 flex flex-col justify-between">
            <div className="flex flex-row justify-between mr-2 items-start">
              <div className="flex flex-row gap-4 w-3/5 items-start">
                <div className="flex flex-col gap-4 w-12 shrink-0 items-start">
                  <div className="bg-cover  bg-blend-normal bg-no-repeat flex w-12 items-center p-1 gap-3">
                    <img
                      src="https://res.cloudinary.com/dm4djc1b1/image/upload/v1698081757/xjn1yftddiogmk9q0vmq.jpg"
                      className="w-10 rounded-full"
                    />
                    <div>
                      <div className="text-base font-['Microsoft_Sans_Serif']">
                        Abdul_ahad_desgins
                      </div>
                      <div className="font-['Microsoft_Sans_Serif'] text-[#bdbdbd]">
                        kerala,india
                      </div>
                    </div>
                  </div>
                  <div className="bg-cover  bg-blend-normal bg-no-repeat flex w-12 items-center p-1 gap-3">
                    <img
                      src="https://res.cloudinary.com/dm4djc1b1/image/upload/v1698081757/xjn1yftddiogmk9q0vmq.jpg"
                      className="w-10 rounded-full"
                    />
                    <div>
                      <div className="text-base font-['Microsoft_Sans_Serif']">
                        Abdul_ahad_desgins
                      </div>
                      <div className="font-['Microsoft_Sans_Serif'] text-[#bdbdbd]">
                        kerala,india
                      </div>
                    </div>
                  </div>
                 
                </div>
                
              </div>
              <div className="flex flex-row justify-between mt-5 w-5 shrink-0 items-start">
                <img
                  src="https://file.rendit.io/n/FfjGtRvuQ3J8Kuho82zl.svg"
                  id="Ellipse2"
                  className="w-1 shrink-0"
                />
                <img
                  src="https://file.rendit.io/n/FfjGtRvuQ3J8Kuho82zl.svg"
                  id="Ellipse3"
                  className="w-1 shrink-0"
                />
                <img
                  src="https://file.rendit.io/n/FfjGtRvuQ3J8Kuho82zl.svg"
                  id="Ellipse4"
                  className="w-1 shrink-0"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between items-start mx-px">
              <div className="flex flex-col mt-px gap-8 items-start">
                <div className="flex flex-col gap-6 w-32">
                  <div className="flex flex-row ml-1 gap-6 items-start">
                    <img
                      src="https://file.rendit.io/n/KPc56gwGRYr6L0IST5t6.svg"
                      className="mt-px w-6 shrink-0"
                    />
                    <img
                      src="https://file.rendit.io/n/2ojGnkou9SjgxNjbxFKw.svg"
                      className="mr-px w-6 shrink-0"
                    />
                    <img
                      src="https://file.rendit.io/n/5qjbxZc2qX75hQkoeJkP.svg"
                      className="mt-px w-6 shrink-0"
                    />
                  </div>
                  <div className="flex flex-col mr-6 gap-1 items-start">
                    <div className="text-base font-['Microsoft_Sans_Serif']">
                      1000 likes
                    </div>
                    <div className="text-xs font-['Microsoft_Sans_Serif'] ml-1">
                      2 MINUTES AGO
                    </div>
                  </div>
                </div>
                <div className="flex flex-row ml-1 gap-5 w-[174px] items-start">
                  <img
                    src="https://file.rendit.io/n/sW1YVBq1yktiO0tHe8fZ.svg"
                    className="w-6 shrink-0"
                  />
                  <div className="font-['Microsoft_Sans_Serif'] mt-1">
                    Add a comment...
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between w-8 shrink-0 h-[148px] items-start">
                <img
                  src="https://file.rendit.io/n/ZBptTs4cywonhTOHsg0y.svg"
                  className="ml-1 w-8"
                />
                <div className="font-['Microsoft_Sans_Serif'] text-[#149df7]">
                  Post
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalModal>
  );
}

export default Comments;
