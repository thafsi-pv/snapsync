import React, { useState, useEffect } from "react";
import StoryLayout from "../../layout/StoryLayout";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { timeAgo } from "../../utils/timeAgo";
import { AiOutlineHeart } from "react-icons/ai";
import { STORY_API } from "../../services/api/const";
import { axiosInstance } from "../../services/api/axiosInterceptor";

const Story = () => {
  const [stories, setStories] = useState();
  const [currentStory, setCurrentStory] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getAllStories();
  }, []);
  const getAllStories = async () => {
    const response = await axiosInstance.get(STORY_API);
    setStories(response.data);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStory < stories[0].stories.length - 1) {
        setCurrentStory(currentStory + 1);
        setProgress(0); // Reset progress when changing the story
      } else {
        // End of stories, you can handle this as needed
        setCurrentStory(0);
      }
    }, 1000);

    const progressInterval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 2);
      } else {
        setProgress(100); // Set progress to 100 when it reaches the desired value
        clearInterval(progressInterval); // Stop the interval
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [currentStory, stories, progress]);

  return (
    <StoryLayout>
      <div className="w-full flex justify-center items-center">
        <div className="text-white ">
          <GrFormPrevious className="p-0.5 bg-white h-6 w-6 rounded-full hover:bg-gray-400 cursor-pointer" />
        </div>
        <div className="relative w-[33%] h-screen p-2 transition-transform">
          {stories?.map((user) => (
            <div key={user._id}>
              <img
                className="h-full w-full object-cover rounded-md"
                src={user.stories[currentStory].mediaUrl}
                alt=""
              />
              <div
                className={`absolute pt-1 top-0 right-0 w-full  p-5 pb-1 gap-1 grid grid-rows-1`}
                style={{
                  gridTemplateColumns: `repeat(${user.stories.length}, minmax(0, 1fr))`,
                }}>
                {user.stories.map((storie) => (
                  <div
                    key={storie._id}
                    className="overflow-hidden h-0.5 mt-5 text-xs flex rounded bg-gray-400">
                    <div
                      style={{
                        width: `${
                          storie._id == user.stories[currentStory]._id
                            ? progress
                            : 0
                        }%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
                  </div>
                ))}
                <div className=" flex gap-2 items-center text-white text-sm col-span-4">
                  <img
                    src={user.imageUrl}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <p>{user.fullName}</p>
                  <p className="text-gray-300">
                    {timeAgo(stories[0].stories[currentStory].createdAt)}
                  </p>
                </div>
              </div>
              <div className=" absolute bottom-5 w-full col-span-4 px-4 flex gap-3">
                <input
                  type="text"
                  className="w-full p-2 rounded-3xl"
                  placeholder={`Reply to ${stories[0].fullName}`}
                />
                <AiOutlineHeart className="h-10 w-10 text-white mr-3" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-white">
          <GrFormNext className="p-0.5 bg-white h-6 w-6 rounded-full hover:bg-gray-400 cursor-pointer" />
        </div>
      </div>
    </StoryLayout>
  );
};

export default Story;
