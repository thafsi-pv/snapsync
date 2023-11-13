import React, { useEffect, useRef, useState } from "react";
import NextPrevButton from "../../../components/uiPrimitives/button/NextPrevButton";
import UserStory from "../../../components/user/UserStory";
import { axiosInstance } from "../../../services/api/axiosInterceptor";
import { STORY_API } from "../../../services/api/const";


/**
 * Story Component:
 * Renders a list of user stories with navigation buttons.
 * Home page top horizontal story list
 */

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
          <NextPrevButton onClick={handleScroll(-400)} side="left" />
        )}
        <div className="text-sm w-[70px] min-w-[70px]  h-[70px] m p-[2px] flex ">
          {storyList?.map((story) => (
            <UserStory
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
        </div>

        {scrollPosition <
          containerRef.current?.scrollWidth -
            containerRef.current?.clientWidth && (
          <NextPrevButton onClick={handleScroll(400)} side="right" />
        )}
      </div>
    </div>
  );
}

export default Story;
