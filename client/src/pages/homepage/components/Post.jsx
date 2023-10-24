import React, { useEffect, useRef, useState } from "react";
import { BsChat } from "react-icons/bs";
import { HiOutlineBookmark } from "react-icons/hi";
import { IoIosHeartEmpty, IoIosMore } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import { axiosInstance } from "../../../axios/axiosInterceptor";
import { POST_API } from "../../../axios/const";

function Post() {
  const captionRef = useRef([]);
  const [posts, setPosts] = useState();
  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const post = await axiosInstance.get(POST_API);
    console.log("🚀 ~ file: Post.jsx:14 ~ getAllPosts ~ post:", post);
    setPosts(post.data);
  };

  const handleMoreCaption = (index) => {
    console.log("🚀 ~ file: Post.jsx:23 ~ handleMoreCaption ~ index:", index)
    console.log("clicked");
  console.log("🚀 ~ file: Post.jsx:11 ~ Post ~ captionRef:", captionRef)

    if (captionRef.current && captionRef.current[index]) {
      captionRef.current[index].classList.remove("line-clamp-2");
    }
  };

  return (
    <div className="flex flex-col gap-4 mx-20">
      {posts?.map((post, index) => {
        return (
          <div className="mb-px ml-4 mr-5" key={index}>
            <div className="flex flex-row justify-between items-center mb-2 ml-4 mr-5">
              <div className="flex flex-row gap-4 items-start">
                <div
                  id="Ellipse8"
                  className="rounded-full bg-cover bg-50%_50% bg-blend-normal bg-no-repeat relative flex flex-col mt-2 w-10 shrink-0 items-start pt-1 pb-px px-px">
                  <img
                    src="https://4.img-dpreview.com/files/p/E~C667x0S5333x4000T1200x900~articles/3925134721/0266554465.jpeg"
                    className="w-8 h-8 absolute top-1 left-1 rounded-full"
                  />
                  <img src="" className="relative w-8" />
                </div>
                <div className="relative flex flex-row mb-px gap-4 w-24 shrink-0 items-start">
                  <div className="text-base font-['Microsoft_Sans_Serif'] tracking-[0.51] relative mt-1">
                    {post.user_id.fullName}
                  </div>
                  <div className="text-xs  tracking-[0.39] absolute top-8 left-0 h-4 w-24">
                    {post.location}
                  </div>
                  <div className="relative flex flex-row mb-3 gap-px w-6 shrink-0 items-start text-gray-400">
                    <div className="text-lg font-medium tracking-[0.54] mb-1">
                      .
                    </div>
                    <div className=" text-sm  mt-2">2h</div>
                  </div>
                </div>
              </div>
              <div>
                <IoIosMore className="font-bold text-xl" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <div className="relative flex flex-col items-start">
                    {post.media_type.startsWith("image/") ? (
                      <img
                        src={post.media_url}
                        id="Element3"
                        className="relative"
                      />
                    ) : (
                      <video
                        src={post.media_url}
                        controls="false"
                        autoPlay
                        className="object-fit w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex flex-row justify-between items-center ml-3 mr-4">
                    <div className="flex flex-row gap-6 items-start">
                      <IoIosHeartEmpty className="h-7 w-7 cursor-pointer hover:text-gray-400 animate-ping" />
                      <BsChat className="h-6 w-6" />
                      <LuSend className="h-6 w-6" />
                    </div>
                    <HiOutlineBookmark className="h-7 w-7" />
                  </div>
                </div>
                <div className="flex flex-row justify-between items-start ml-4 mr-8">
                  <div className="flex flex-col gap-1 w-[417px] items-start">
                    <div className="self-stretch flex flex-col gap-1 items-start">
                      <div className="self-stretch flex gap-2 flex-col items-start">
                        <div className="relative flex text-sm font-semibold ">
                          1.069 Likes
                        </div>
                        <div className="self-stretch gap-5 items-start  text-sm">
                          <span className=" font-semibold text-[#262626]">
                            {post.user_id.fullName}
                          </span>
                          <span
                            ref={captionRef[index]}
                            className=" font-semibold text-[#262626] line-clamp-2"
                            onClick={() => handleMoreCaption(index)}>
                            {post.caption}
                            <span className="text-[#8e8e8e]">more</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-sm  leading-[18px]">
                        View all 100 comments
                      </div>
                    </div>
                    <div className="text-xs  tracking-[0.2] leading-[18px] uppercase">
                      1 hour ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 h-8 shrink-0">
                <div id="Border" className="bg-[#efefef] h-px shrink-0" />
                <div className="flex flex-row justify-between items-start ml-3 mr-4">
                  <div className="text-sm  leading-[18px] text-[#676767] mt-1">
                    Add a comment...
                  </div>
                  <img
                    src="https://compiler-vyindg4stq-uc.a.run.app/compiler/placeholder/24x24"
                    className="w-6 shrink-0"
                  />
                </div>
              </div>
            </div>
            <div id="Border2" className="bg-[#efefef] h-px shrink-0" />
          </div>
        );
      })}
    </div>
  );
}

export default Post;
