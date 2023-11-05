import React, { useState, useEffect } from "react";
import StoryLayout from "../../layout/StoryLayout";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const stories = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLmH6VhjVLzPn1QprRYIMCdTKR4FC_5Osu4Q&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH63geeKnqesT4QCheaoc0ntWfJTed1WwGrQXdCszOS1Itbh24AOGVbxBnQR4WZ___CZg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUpG2btfMcn5U_uq2uItstSs2kJcNvkzXd3gSpi3VYb954FUuBIzYIqM1DOivWV0mmLg&usqp=CAU",
  // Add more story URLs here
];

const Story = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStory < stories.length - 1) {
        setCurrentStory(currentStory + 1);
        setProgress(0); // Reset progress when changing the story
      } else {
        // End of stories, you can handle this as needed
        setCurrentStory(0);
      }
    }, 5000);

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
          <img
            className="h-full w-full object-cover"
            src={stories[currentStory]}
            alt=""
          />
          <div className="absolute pt-1 top-0 right-0 w-full p-3">
            <div className="overflow-hidden h-0.5 my-4 text-xs flex rounded bg-gray-400">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
            </div>
          </div>
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
