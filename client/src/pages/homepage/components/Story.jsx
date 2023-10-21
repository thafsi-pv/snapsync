import React, { useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function Story() {
  const containerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    const container = containerRef.current;
    container.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  return (
    <div
      className="relative flex flex-col gap-1 max-w-full  overflow-x-auto mt-10 scrollbar-hide "
      ref={containerRef}>
      <div className="flex flex-row gap-1 items-start ml-1 mr-5 my-1 h-24">
        <div
          className="sticky top-9 left-5 bg-white p-1 rounded-full shadow-xl cursor-pointer hover:bg-gray-200"
          onClick={() => handleScroll(-400)}>
          <BiChevronLeft />
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px]  h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div className="text-sm bg-red-500 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 w-[70px] min-w-[70px] h-[70px] m-2 p-[2px] ">
          <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p>
        </div>
        <div
          className="sticky top-9 right-5 bg-white p-1 rounded-full shadow-xl cursor-pointer hover:bg-gray-200"
          onClick={() => handleScroll(400)}>
          <BiChevronRight />
        </div>
      </div>
    </div>
  );
}

export default Story;

// import React, { useRef } from 'react';

// function HorizontalScrollContainer() {
//   const containerRef = useRef(null);

//   const handleScroll = (scrollOffset) => {
//     containerRef.current.scrollLeft += scrollOffset;
//   };

//   return (
//     <div className="flex items-center">
//       <div ref={containerRef} className="flex overflow-x-auto space-x-4 p-4">
//         {/* Your content goes here */}
//       </div>
//       <button onClick={() => handleScroll(-100)} className="px-4 py-2 bg-blue-500 text-white">Scroll Left</button>
//       <button onClick={() => handleScroll(100)} className="px-4 py-2 bg-blue-500 text-white">Scroll Right</button>
//     </div>
//   );
// }

// export default HorizontalScrollContainer;
