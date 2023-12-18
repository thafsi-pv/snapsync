import React, { useEffect, useRef } from "react";
import HeartIcon from "../../assets/svg/HeartIcon";
import CommentIcon from "../../assets/svg/CommentIcon";
import MessageIcon from "../../assets/svg/MessageIcon";
import BookmarkIcon from "../../assets/svg/BookmarkIcon";
import StoryLayout from "../../layout/StoryLayout";

const VideoList = ({ videos }) => {
  const videoRefs = useRef(videos.map(() => React.createRef()));

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold as needed
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const videoIndex = video.getAttribute("data-index");

        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef.current);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  return (
    <div>
      {videos.map((video, index) => (
        <VideoPlayer
          key={index}
          src={video.media_url}
          caption={video.caption}
          alldata={video}
          index={index}
          ref={videoRefs.current[index]}
        />
      ))}
    </div>
  );
};

const VideoPlayer = React.forwardRef(
  ({ src, caption, alldata, index }, ref) => {
    return (
      // <StoryLayout>
      <div className="relative flex justify-center overflow-hidden w-full ">
        <div className="w-full flex justify-center my-16 lg:w-[400px] rounded-md">
          <div className="relative w-full h-screen flex justify-center">
            <video
              ref={(node) => {
                ref.current = node;
                if (node) {
                  node.setAttribute("data-index", index);
                }
              }}
              controls
              playsInline
              autoPlay
              loop={true}
              className="object-cover h-full w-full rounded-md">
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="inset-0 right-0 w-full flex items-center justify-center ml-0">
              <div className="absolute right-0 flex flex-col h-full top-1/2 gap-6 w-16 items-end mr-3">
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
            <div className="absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-black via-black to-transparent p-4">
              <div className="flex items-center space-x-4 py-14">
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
      // </StoryLayout>
    );
  }
);

export default VideoList;
