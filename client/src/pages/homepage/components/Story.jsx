import React, { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { axiosInstance } from "../../../axios/axiosInterceptor";
import { STORY_API } from "../../../axios/const";
import UserStory from "../../../components/user/UserStory";

function Story() {
  const [storyList, setStoryList] = useState();
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (scrollOffset) => {
    const container = containerRef.current;
    container.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  useEffect(() => {
    getAllStories();
  }, []);

  const getAllStories = async () => {
    const storyList = await axiosInstance.get(STORY_API);
    console.log(
      "🚀 ~ file: Story.jsx:18 ~ getAllStories ~ storyList:",
      storyList
    );
    setStoryList(storyList.data);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollLeft);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      className="relative flex flex-col gap-1 max-w-full  overflow-x-auto mt-10 scrollbar-hide "
      ref={containerRef}>
      <div className="flex flex-row gap-1 items-start ml-1 mr-5 my-1 h-24">
        {scrollPosition > 0 && (
          <div
            className="sticky top-9 left-5 bg-white p-1 rounded-full shadow-xl cursor-pointer hover:bg-gray-200 z-10"
            onClick={() => handleScroll(-400)}>
            <BiChevronLeft />
          </div>
        )}
        <div className="text-sm w-[70px] min-w-[70px]  h-[70px] m p-[2px] flex ">
          {/* <img
            className="rounded-full object-cover w-full h-full p-[2px] bg-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xoV9KUFt2JC8fWh_LSYV75lFJHOVqNk-ZohGF5yoYQ&s"
            alt=""
          />
          <p className="text-xs"> Zia_queen</p> */}
          {storyList?.map((story) => (
            <UserStory
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
        </div>

      { scrollPosition < containerRef.current?.scrollWidth - containerRef.current?.clientWidth &&  <div
          className="sticky top-9 right-5 bg-white p-1 rounded-full shadow-xl cursor-pointer hover:bg-gray-200"
          onClick={() => handleScroll(400)}>
          <BiChevronRight />
        </div>}
      </div>
    </div>
  );
}

export default Story;

