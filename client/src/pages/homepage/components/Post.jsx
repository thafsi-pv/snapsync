import React, { useEffect, useRef, useState } from "react";
import { BsChat } from "react-icons/bs";
import { HiOutlineBookmark } from "react-icons/hi";
import { IoIosHeartEmpty, IoIosMore } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { LuSend } from "react-icons/lu";
import { axiosInstance } from "../../../axios/axiosInterceptor";
import { LIKE_API, POST_API } from "../../../axios/const";
import InputField from "../../../components/fields/InputField";

function Post({ setComments }) {
  const [posts, setPosts] = useState();
  console.log("🚀 ~ file: Post.jsx:13 ~ Post ~ posts:", posts)
  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const post = await axiosInstance.get(POST_API);
    setPosts(post.data);
  };

  const handleMoreCaption = (index) => {
    const data = [...posts];
    data[index].showFullCaption = true;
    setPosts(data);
  };

  const handleLikePost = async (index, post_id) => {
    const data = [...posts];
    const postData = { liked: !data[index].liked, post_id };
    const response = await axiosInstance.post(LIKE_API, postData);
    data[index].liked = !data[index].liked;
    setPosts(data);
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
                <div className="relative flex flex-row mb-px gap-2 w-24 shrink-0 items-start">
                  <div className="text-base font-semibold tracking-[0.51] relative mt-1">
                    {post?.user[0]?.fullName}
                  </div>
                  <div className="text-xs  tracking-[0.39] absolute top-7 left-0 h-4 w-24">
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
                  <div className="relative flex flex-col items-start ">
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
                      <div onClick={() => handleLikePost(index, post._id)}>
                        {post.liked ? (
                          <AiFillHeart
                            className={`h-7 w-7 cursor-pointer hover:text-red-500 text-red-600`}
                            id={`like-button-${post._id}`}
                          />
                        ) : (
                          <IoIosHeartEmpty
                            className={`h-7 w-7 cursor-pointer hover:text-gray-400}`}
                            id={`like-button-${post._id}`}
                          />
                        )}
                      </div>
                      <BsChat
                        className="h-6 w-6"
                        onClick={() => {
                          setComments(true);
                        }}
                      />
                      <LuSend className="h-6 w-6" />
                    </div>
                    <HiOutlineBookmark className="h-7 w-7" />
                  </div>
                </div>
                <div className="flex flex-row justify-between items-start mr-8">
                  <div className="self-stretch flex gap-2 flex-col items-start">
                    <div className="relative flex text-sm font-semibold ">
                      1.069 Likes
                    </div>
                    <div className=" gap-2 items-start  text-sm">
                      <span
                        className={`bold text-[#262626] ${
                          post.showFullCaption
                            ? "line-clamp-none"
                            : "line-clamp-2"
                        }`}>
                        <span className=" font-semibold text-[#262626]">
                          {post?.user[0]?.fullName} {"  "}
                        </span>
                        {post.caption}
                      </span>
                      {post.caption.length > 50 && !post.showFullCaption && (
                        <span
                          className="text-[#8e8e8e] cursor-pointer"
                          onClick={() => handleMoreCaption(index)}>
                          more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col   shrink-0">
                <div className="text-sm  leading-[18px]">
                  View all 100 comments
                </div>
                <div id="Border" className="bg-[#efefef]  shrink-0" />
                <div className="flex items-center">
                  <div className="flex-1">
                    <InputField
                      inputClass="p-0"
                      placeholder="Add a comment"
                      extra="!border-none !bg-white"
                    />
                  </div>
                  <span className="text-sm font-semibold text-blue-500 hover:text-black cursor-pointer">
                    Post
                  </span>
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
