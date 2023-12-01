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
  const { userData } = useContext(UserActionContext);
  const [storyList, setStoryList] = useState();
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(
    "🚀 ~ file: Story.jsx:19 ~ Story ~ scrollPosition:",
    scrollPosition
  );

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
      className="relative flex flex-col gap-1 max-w-full  overflow-x-auto lg:mt-10 mt-14 scrollbar-hide w-full "
      ref={containerRef}>
      <div className="relative flex flex-row gap-1 items-start ml-1 lg:mr-5 sm:mr-0 my-1 h-24 w-full ">
        <div className="relative text-sm w-[70px] lg:w-full h-[70px] m p-[2px] flex gap-2">
          {scrollPosition > 0 && (
            <NextPrevButton onClick={() => handleScroll(-400)} side="left" />
          )}
          {!storyList?.some((story) => story._id == userData?._id) && (
            <div className="relative text-sm cursor-pointer">
              <UserImage
                imgUrl={userData?.imageUrl}
                extra="w-20 h-20"
                // loading={loadStory}
                // id={id}
              />
              <p className="text-xs text-center w-20 truncate">
                {userData?.userName}
              </p>
              <div className="absolute bottom-0 right-2 w-4 h-4 bg-blue-400 rounded-full flex justify-center items-center text-white border">
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
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {storyList?.map((story) => (
            <UserStory
              key={story._id}
              id={story._id}
              userName={story.userName}
              imgUrl={story.imageUrl}
            />
          ))}
          {(scrollPosition <
            containerRef.current?.scrollWidth -
              containerRef.current?.clientWidth ||
            scrollPosition == 0) && (
            <NextPrevButton onClick={() => handleScroll(400)} side="right" />
          )}
        </div>
      </div>
    </div>
    // <div
    //   className="relative flex flex-col gap-1 w-full max-w-full  overflow-x-auto lg:mt-10 mt-14 scrollbar-hide "
    //   ref={containerRef}>
    //   <div className="relative flex flex-row gap-1 items-start ml-1 lg:mr-5 sm:mr-0 my-1 h-24 w-full ">
    //     {scrollPosition > 0 && (
    //       <NextPrevButton onClick={() => handleScroll(-400)} side="left" />
    //     )}
    //     <div className="text-sm  h-[70px] m p-[2px] flex">
    //       {storyList?.map((story) => (
    //         <UserStory
    //           key={story._id}
    //           id={story._id}
    //           userName={story.userName}
    //           imgUrl={story.imageUrl}
    //         />
    //       ))}
    //       {storyList?.map((story) => (
    //         <UserStory
    //           key={story._id}
    //           id={story._id}
    //           userName={story.userName}
    //           imgUrl={story.imageUrl}
    //         />
    //       ))}
    //       {storyList?.map((story) => (
    //         <UserStory
    //           key={story._id}
    //           id={story._id}
    //           userName={story.userName}
    //           imgUrl={story.imageUrl}
    //         />
    //       ))}
    //       {storyList?.map((story) => (
    //         <UserStory
    //           key={story._id}
    //           id={story._id}
    //           userName={story.userName}
    //           imgUrl={story.imageUrl}
    //         />
    //       ))}
    //       {storyList?.map((story) => (
    //         <UserStory
    //           key={story._id}
    //           id={story._id}
    //           userName={story.userName}
    //           imgUrl={story.imageUrl}
    //         />
    //       ))}
    //       {storyList?.map((story) => (
    //         <UserStory
    //           key={story._id}
    //           id={story._id}
    //           userName={story.userName}
    //           imgUrl={story.imageUrl}
    //         />
    //       ))}
    //       <div className="text-sm cursor-pointer">
    //         <UserImage
    //           imgUrl="https://res.cloudinary.com/dm4djc1b1/image/upload/v1699721655/rnkq2kj3yzd1yoqfwcuz.jpg"
    //           extra="w-20 h-20"
    //           //  loading={loadStory}
    //           id="654fb1b72e4ccc72bf9522d8"
    //         />
    //         <p className="text-xs text-center w-20 truncate ">
    //           abcsdfdsfdsfsdfsdfsdfsdf
    //         </p>
    //       </div>
    //     </div>

    //     {scrollPosition <
    //       containerRef.current?.scrollWidth -
    //         containerRef.current?.clientWidth && (
    //       <NextPrevButton onClick={() => handleScroll(400)} side="right" />
    //     )}
    //   </div>
    // </div>
  );
}

export default Story;
