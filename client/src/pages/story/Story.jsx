import React, { useState, useEffect } from "react";
import StoryLayout from "../../layout/StoryLayout";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { timeAgo } from "../../utils/timeAgo";
import { AiOutlineHeart } from "react-icons/ai";
import { axiosInstance } from "../../axios/axiosInterceptor";
import { STORY_API } from "../../axios/const";

// const stories = [
//   {
//     _id: "6533522dfc5e363414909ec5",
//     user_id: "6533522dfc5e363414909ec5",
//     userName: "thafsi.pv",
//     fullName: "thafseer",
//     imageUrl:
//       "https://res.cloudinary.com/dm4djc1b1/image/upload/v1699352711/bgmdaxlskosdggtestd9.jpg",
//     stories: [
//       {
//         _id: "654a37904b229207d2749664",
//         user_id: "6533522dfc5e363414909ec5",
//         mediaUrl:
//           "https://res.cloudinary.com/dm4djc1b1/image/upload/v1699362703/nlxatvfi5mmoty8epgsk.webp",
//         media_type: "image/jpeg",
//         expireAt: "2023-11-08T13:11:44.330Z",
//         createdAt: "2023-11-07T13:11:44.333Z",
//         updatedAt: "2023-11-07T13:11:44.333Z",
//         __v: 0,
//       },
//       {
//         _id: "654a37904b229207d2749664s",
//         user_id: "6533522dfc5e363414909ec5",
//         mediaUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLmH6VhjVLzPn1QprRYIMCdTKR4FC_5Osu4Q&usqp=CAU",
//         media_type: "image/jpeg",
//         expireAt: "2023-11-08T13:11:44.330Z",
//         createdAt: "2023-11-07T13:11:44.333Z",
//         updatedAt: "2023-11-07T13:11:44.333Z",
//         __v: 0,
//       },
//       {
//         _id: "654a37904b229207d2749664sa",
//         user_id: "6533522dfc5e363414909ec5",
//         mediaUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH63geeKnqesT4QCheaoc0ntWfJTed1WwGrQXdCszOS1Itbh24AOGVbxBnQR4WZ___CZg&usqp=CAU",
//         media_type: "image/jpeg",
//         expireAt: "2023-11-08T13:11:44.330Z",
//         createdAt: "2023-11-07T13:11:44.333Z",
//         updatedAt: "2023-11-07T13:11:44.333Z",
//         __v: 0,
//       },
//       {
//         _id: "654a37904b229207d2749664a",
//         user_id: "6533522dfc5e363414909ec5",
//         mediaUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUpG2btfMcn5U_uq2uItstSs2kJcNvkzXd3gSpi3VYb954FUuBIzYIqM1DOivWV0mmLg&usqp=CAU",
//         media_type: "image/jpeg",
//         expireAt: "2023-11-08T13:11:44.330Z",
//         createdAt: "2023-11-07T13:11:44.333Z",
//         updatedAt: "2023-11-07T13:11:44.333Z",
//         __v: 0,
//       },
//       {
//         _id: "654a37904b229207d2749664a",
//         user_id: "6533522dfc5e363414909ec5",
//         mediaUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUpG2btfMcn5U_uq2uItstSs2kJcNvkzXd3gSpi3VYb954FUuBIzYIqM1DOivWV0mmLg&usqp=CAU",
//         media_type: "image/jpeg",
//         expireAt: "2023-11-08T13:11:44.330Z",
//         createdAt: "2023-11-07T13:11:44.333Z",
//         updatedAt: "2023-11-07T13:11:44.333Z",
//         __v: 0,
//       },

//       {
//         _id: "654a37904b229207d2749664a",
//         user_id: "6533522dfc5e363414909ec5",
//         mediaUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUpG2btfMcn5U_uq2uItstSs2kJcNvkzXd3gSpi3VYb954FUuBIzYIqM1DOivWV0mmLg&usqp=CAU",
//         media_type: "image/jpeg",
//         expireAt: "2023-11-08T13:11:44.330Z",
//         createdAt: "2023-11-07T13:11:44.333Z",
//         updatedAt: "2023-11-07T13:11:44.333Z",
//         __v: 0,
//       },
//     ],
//   },
// ];

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
            <>
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
                  <div className="overflow-hidden h-0.5 mt-5 text-xs flex rounded bg-gray-400">
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
            </>
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

// import React, { useState, useEffect } from 'react';

// const stories = [
//   // An array of story objects with image URLs
//   { id: 1, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLmH6VhjVLzPn1QprRYIMCdTKR4FC_5Osu4Q&usqp=CAU' },
//   { id: 2, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH63geeKnqesT4QCheaoc0ntWfJTed1WwGrQXdCszOS1Itbh24AOGVbxBnQR4WZ___CZg&usqp=CAU' },
//   { id: 3, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUpG2btfMcn5U_uq2uItstSs2kJcNvkzXd3gSpi3VYb954FUuBIzYIqM1DOivWV0mmLg&usqp=CAU' },
//   // Add more story objects
// ];

// const Story = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) =>
//         prevSlide === stories.length - 1 ? 0 : prevSlide + 1
//       );
//     }, 5000); // Change slides every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className=" max-w-screen-sm mx-auto">
//       <div className=" aspect-w-16 aspect-h-9">
//         {stories.map((story, index) => (
//           <div
//             key={story.id}
//             className={`absolute top-0 transition-transform ${
//               index === currentSlide ? 'scale-100' : 'scale-0'
//             } transform-gpu`}
//           >
//             <img
//               src={story.imageUrl}
//               alt={`Story ${story.id}`}
//               className="object-cover w-full h-full"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Story;
