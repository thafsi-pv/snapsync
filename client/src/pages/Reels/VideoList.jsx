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
          src={video.media_url}
          caption={video.caption}
          alldata={video}
          onIntersection={(inView) => handleVideoIntersection(index, inView)}
          ref={videoRefs.current[index]}
        />
      ))}
    </div>
  );
};

const VideoPlayer = React.forwardRef(
  ({ src, onIntersection, caption, alldata }, ref) => {
    const [videoRef, inView] = useInView();

    useEffect(() => {
      onIntersection(inView);
    }, [inView, onIntersection]);

    const handleVideoClick = () => {
      const video = videoRef.current;
      console.log("🚀 ~ file: VideoList.jsx:47 ~ handleVideoClick ~ video:", video)

      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    };
    return (
      <div className="relative overflow-hidden w-full  bg-black">
        <div className="w-full flex justify-center my-7">
          <div className=" relative w-full md:w-fit lg:w-fit h-screen flex justify-center ">
            <video
              ref={(node) => {
                videoRef(node);
                ref.current = node;
              }}
              controls
              //onClick={handleVideoClick}
              playsInline
              autoPlay
              loop={true}
              className="object-cover h-full w-fit">
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className=" inset-0 right-0 w-full flex items-center justify-center ml-0 md:ml-14 lg:ml-14">
              <div className="absolute  right-0 flex flex-col  h-full top-1/2 gap-6 w-16 items-end mr-3">
                <div className="flex flex-col items-center font-semibold text-white">
                  <HeartIcon className="w-7 h-7 text-white" />
                  <p>{alldata.likeCount}</p>
                </div>
                <div className="flex flex-col items-center font-semibold text-white">
                  <CommentIcon className="w-7 h-7 text-white" />
                  <p>{alldata.commentCount}</p>
                </div>
                <MessageIcon className="w-7 h-7 text-white" />
                <BookmarkIcon className="w-7 h-7 text-white" color="white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-4">
              <div className="flex items-center space-x-4">
                <img
                  alt="thelonercodergirl's profile picture"
                  className="h-10 w-10 rounded-full"
                  src={alldata.user.imageUrl}
                />

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <p className="text-white font-bold">
                      {alldata.user.fullName}
                    </p>
                    <button className="border text-white px-3 py-1 rounded-md">
                      Follow
                    </button>
                  </div>
                  <p className="text-white line-clamp-2">{caption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default VideoList;
