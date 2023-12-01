import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import HeartIcon from "../../assets/svg/HeartIcon";
import CommentIcon from "../../assets/svg/CommentIcon";
import MessageIcon from "../../assets/svg/MessageIcon";
import BookmarkIcon from "../../assets/svg/BookmarkIcon";

const VideoList = ({ videos }) => {
  const videoRefs = useRef(videos.map(() => React.createRef()));

  const handleVideoIntersection = (index, inView) => {
    const videoRef = videoRefs.current[index];

    if (inView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div>
      {videos.map((video, index) => (
        <VideoPlayer
          key={index}
          src={video.src}
          onIntersection={(inView) => handleVideoIntersection(index, inView)}
          ref={videoRefs.current[index]}
        />
      ))}
    </div>
  );
};

const VideoPlayer = React.forwardRef(({ src, onIntersection }, ref) => {
  const [videoRef, inView] = useInView();

  useEffect(() => {
    onIntersection(inView);
  }, [inView, onIntersection]);

  return (
    <div className="relative overflow-hidden w-full  bg-black">
      <div className="w-full flex justify-center my-7">
        <div className=" relative w-full md:w-fit lg:w-fit h-screen flex justify-center ">
          <video
          
            ref={(node) => {
              videoRef(node);
              ref.current = node;
            }}
            controls={true} loop={true}
            className="object-cover h-full w-fit">
            <source src={src} type="video/mp4"  />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 right-0 w-full flex items-center justify-center  bg-opacity-30 ml-0 md:ml-14 lg:ml-14">
            <div className="absolute  right-0 flex flex-col  h-full top-1/2 gap-10 w-16 items-end mr-3">
              <HeartIcon className="w-7 h-7" />
              <CommentIcon className="w-7 h-7" />
              <MessageIcon className="w-7 h-7" />
              <BookmarkIcon className="w-7 h-7" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-4">
            <div className="flex items-center space-x-4">
              <img
                alt="thelonercodergirl's profile picture"
                className="h-8 w-8 rounded-full"
                src="https://res.cloudinary.com/dm4djc1b1/image/upload/v1698316845/jnifjbcgpds1pg4dkb0y.jpg"
              />

              <div>
                <p className="text-white font-bold">thelonercodergirl</p>
                <p className="text-white">These are my 💎👇</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default VideoList;
