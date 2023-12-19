import React, { useState, useEffect, useRef } from "react";
import StoryLayout from "../../layout/StoryLayout";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { timeAgo } from "../../utils/timeAgo";
import { AiOutlineHeart } from "react-icons/ai";
import { STORY_API } from "../../services/api/const";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Story = () => {
  const [activeStoryUser, setActiveStoryUser] = useState(null);
  const [stories, setStories] = useState([]);
  const [currentStory, setCurrentStory] = useState(0);
  const [progress, setProgress] = useState(0);

  const progressRef = useRef({ current: 0 });

  useEffect(() => {
    getAllStories();
  }, []);

  const getAllStories = async () => {
    try {
      const response = await axiosInstance.get(STORY_API);
      setStories(response.data);
      setActiveStoryUser(response.data[0]);
      startProgress();
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  useEffect(() => {
    let interval;
    console.log("useeffect start runnnnn");

    const startInterval = () => {
      interval = setInterval(() => {
        console.log("interval runnnnn");
        if (activeStoryUser) {
          setProgress(0); // Reset progress when changing the story
          startProgress(); // Start progress for the new story
          setCurrentStory((prevStory) => {
            if (prevStory < activeStoryUser.stories.length - 1) {
              return prevStory + 1;
            } else {
              // End of stories for the current user, switch to the next user
              const nextStoryUserIndex =
                (stories.indexOf(activeStoryUser) + 1) % stories.length;
              setActiveStoryUser(stories[nextStoryUserIndex]);

              return 0;
            }
          });
        }
      }, 5000);
    };

    startInterval(); // Start the story change interval

    return () => {
      clearInterval(interval);
    };
  }, [activeStoryUser]);

  const startProgress = () => {
    progressRef.current.current = 0;

    const progressInterval = setInterval(() => {
      console.log("progress interval runnnnn");
      if (progressRef.current.current < 100) {
        setProgress(progressRef.current.current);
        progressRef.current.current += 2; // Adjust the increment based on the desired completion time
      } else {
        setProgress(100);
        clearInterval(progressInterval);
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="text-white hidden md:block lg:block">
        <GrFormPrevious className="p-0.5 bg-white h-6 w-6 rounded-full hover:bg-gray-400 cursor-pointer" />
      </div>
      <div className="relative w-full lg:w-[33%] h-screen transition-transform">
        <div className="w-full h-full">
          <img
            className="h-full w-full object-cover rounded-md"
            src={activeStoryUser?.stories[currentStory]?.mediaUrl || ""}
            alt=""
          />
          <div
            className={`absolute pt-1 top-0 right-0 w-full  p-5 pb-1 gap-1 grid grid-rows-1 bg-gradient-to-t from-transparent to-gray-900`}
            style={{
              gridTemplateColumns: `repeat(${activeStoryUser?.stories.length}, minmax(0, 1fr))`,
            }}>
            {activeStoryUser?.stories.map((story) => (
              <div
                key={story._id}
                className="overflow-hidden h-0.5 mt-5 text-xs flex rounded bg-gray-400">
                <div
                  style={{
                    width: `${
                      story._id === activeStoryUser.stories[currentStory]._id
                        ? progress
                        : 0
                    }%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
                />
              </div>
            ))}
            <div className="flex gap-2 items-center text-white text-sm col-span-4">
              <img
                src={activeStoryUser?.imageUrl}
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <p>{activeStoryUser?.fullName}</p>
              <p className="text-gray-300">
                {timeAgo(activeStoryUser?.stories[currentStory]?.createdAt)}
              </p>
            </div>
            <div className="absolute top-8 right-4">
              <Link to="/">
                <IoClose className="w-6 h-6 text-white" />
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 w-full col-span-4 px-4 flex gap-3 bg-gradient-to-b from-transparent to-gray-900 py-4">
            <input
              type="text"
              className="w-full p-2 rounded-3xl"
              placeholder={`Reply to ${activeStoryUser?.fullName}`}
            />
            <AiOutlineHeart className="h-10 w-10 text-white mr-3" />
          </div>
        </div>
      </div>
      <div className="text-white hidden md:block lg:block">
        <GrFormNext className="p-0.5 bg-white h-6 w-6 rounded-full hover:bg-gray-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default Story;
