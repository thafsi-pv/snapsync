import React, { useEffect, useState } from "react";
import VideoList from "./VideoList";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { REELS } from "../../services/api/const";

export const sampleVideos = [
  {
    src: "https://res.cloudinary.com/dm4djc1b1/video/upload/v1698317370/yisntwu55k2tdldmixvy.mp4",
  },
  {
    src: "https://res.cloudinary.com/dm4djc1b1/video/upload/v1698316669/tmvzigjdimwyzgpdqd5p.mp4",
  },
  {
    src: "https://res.cloudinary.com/dm4djc1b1/video/upload/v1698316669/tmvzigjdimwyzgpdqd5p.mp4",
  },
  {
    src: "https://res.cloudinary.com/dm4djc1b1/video/upload/v1698317370/yisntwu55k2tdldmixvy.mp4",
  },
  // Add more video sources as needed
];

function Reels() {
  const [reels, setReels] = useState();

  useEffect(() => {
    getReels();
  }, []);

  const getReels = async () => {
    const response = await axiosInstance.get(REELS);
    console.log("🚀 ~ file: Reels.jsx:31 ~ getReels ~ response:", response);
    setReels(response.data);
  };

  if (!reels) return <div>Loading</div>;
  return (
    // <div className="relative overflow-hidden w-full">

    //   <div className="w-full flex justify-center">
    //     <div className=" relative w-full md:w-fit lg:w-fit h-screen flex justify-center ">
    //       {/* <img
    //       alt=""
    //       className="object-cover object-center"
    //       src="https://res.cloudinary.com/dm4djc1b1/image/upload/v1698316845/jnifjbcgpds1pg4dkb0y.jpg"
    //     /> */}

    //       {/* <video
    //         src="https://res.cloudinary.com/dm4djc1b1/video/upload/v1698316669/tmvzigjdimwyzgpdqd5p.mp4"
    //         controls
    //         autoPlay={true}
    //         loop={true}
    //         playsInline
    //         poster="https://res.cloudinary.com/dm4djc1b1/video/upload/v1698316669/tmvzigjdimwyzgpdqd5p.jpg"
    //         className={`relative  max-w-xl xl:max-h-full  lg:rounded-l-md   bg-black `}
    //       /> */}
    //       <VideoList videos={sampleVideos} />
    //       <div className="absolute inset-0 right-0 w-full flex items-center justify-center bg-green-400 bg-opacity-30 ml-0 md:ml-14 lg:ml-14">
    //         <div className="absolute  right-0 flex flex-col  h-full top-1/2 gap-6 w-16 items-end mr-3">
    //           <HeartIcon className="w-6 h-6" />
    //           <CommentIcon className="w-6 h-6" />
    //           <MessageIcon className="w-6 h-6" />
    //           <BookmarkIcon className="w-6 h-6" />
    //         </div>
    //       </div>
    //       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-4">
    //         <div className="flex items-center space-x-4">
    //           <img
    //             alt="thelonercodergirl's profile picture"
    //             className="h-8 w-8 rounded-full"
    //             src="https://res.cloudinary.com/dm4djc1b1/image/upload/v1698316845/jnifjbcgpds1pg4dkb0y.jpg"
    //           />

    //           <div>
    //             <p className="text-white font-bold">thelonercodergirl</p>
    //             <p className="text-white">These are my 💎👇</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    // </div>
    <VideoList videos={reels} />
  );
}

export default Reels;
