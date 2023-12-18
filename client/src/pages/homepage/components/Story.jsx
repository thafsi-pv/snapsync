import React, { useContext, useEffect, useRef, useState } from "react";
import NextPrevButton from "../../../components/uiPrimitives/button/NextPrevButton";
import UserStory from "../../../components/user/UserStory";
import { axiosInstance } from "../../../services/api/axiosInterceptor";
import { STORY_API } from "../../../services/api/const";
import UserImage from "../../../components/user/UserImage";
import { UserActionContext } from "../../../services/providers/UserActionContext";
import { IoIosAdd } from "react-icons/io";
import StoryListShimmer from "../../../components/shimmerUi/StoryListShimmer";

/**
 * Story Component:
 * Renders a list of user stories with navigation buttons.
 * Home page top horizontal story list
 */

function Story() {
  const { userData, setAddStory } = useContext(UserActionContext);
  const [storyList, setStoryList] = useState();
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // const { loadStory, setLoadStory } = useContext(UserActionContext);

  const handleScroll = (scrollOffset) => {
    console.log("handle scroll");

    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    getAllStories();
  }, []);

  const getAllStories = async () => {
    const storyList = await axiosInstance.get(STORY_API);
    setStoryList(storyList.data);
  };

  useEffect(() => {
    const handleScrolll = () => {
      console.log("handle scrollzz");
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollLeft);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScrolll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScrolll);
      }
    };
  }, [storyList]);

  if (storyList == null) return <StoryListShimmer />;

  return (
    <div
      className="relative flex flex-col gap-1 max-w-full  overflow-x-auto lg:mt-10 mt-14 scrollbar-hide w-full"
      ref={containerRef}>
      <div className="relative flex flex-row gap-1 items-start ml-1 lg:mr-5 sm:mr-0 my-1 h-24 w-fit min-w-full">
        {scrollPosition > 0 && storyList.length > 7 && (
          <NextPrevButton onClick={() => handleScroll(-400)} side="left" />
        )}
        <div className="relative text-sm w-[70px] lg:w-full h-[70px] m p-[2px] gap-1 lg:gap-2 flex ">
          {!storyList?.some((story) => story._id == userData?._id) && (
            <div
              className="relative w-16 text-sm cursor-pointer "
              onClick={() => setAddStory(true)}>
              <UserImage
                imgUrl={userData?.imageUrl}
                extra="w-[74px] h-[74px]"
                // loading={loadStory}
                // id={id}
              />
              <p className="text-xs text-center w-18 truncate">
                {userData?.userName}
              </p>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-400 rounded-full flex justify-center items-center text-white border">
                <IoIosAdd />
              </div>
            </div>
          )}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          
        </div>
        {(scrollPosition <
          containerRef.current?.scrollWidth -
            containerRef.current?.clientWidth ||
          scrollPosition == 0) &&
          storyList.length > 7 && (
            <NextPrevButton onClick={() => handleScroll(400)} side="right" />
          )}
      </div>
    </div>
  );
}

export default Story;
