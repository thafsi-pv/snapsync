import React, { useEffect, useState } from "react";
import ReelIcon from "../../assets/svg/ReelIcon";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInterceptor";
import { PROFILE_API } from "../../axios/const";

function Profile() {
  const [profile, setProfile] = useState();
  console.log("🚀 ~ file: Profile.jsx:9 ~ Profile ~ profile:", profile);
  const [posts, setPosts] = useState();
  console.log("🚀 ~ file: Profile.jsx:11 ~ Profile ~ posts:", posts);
  const { username } = useParams();
  console.log("🚀 ~ file: Profile.jsx:7 ~ Profile ~ username:", username);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const response = await axiosInstance.get(
      `${PROFILE_API}?username=${username}`
    );
    setProfile(response.data.profile[0]);
    setPosts(response.data.post);
  };

  return (
    <div
      id="MyProfileRoot"
      className="overflow-hidden  items-center relative flex flex-row justify-center w-full pl-8 py-10">
      <div className="items-center justify-center relative flex flex-col mb-5 gap-16 w-4/5 p-5">
        <div className="flex flex-row justify-between items-start ml-20 w-full ">
          <div className="w-1/3 m-6">
            <img
              src={profile?.imageUrl}
              className="ml-px w-44 h-38 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-8 w-2/3 items-start text-sm">
            <div className="self-stretch flex flex-row ml-px gap-2 items-start">
              <div className="flex flex-row mt-1 gap-3 w-full items-center">
                <div className="text-xl">pv.thafsi</div>
                <div className="flex flex-row gap-2 w-1/2 items-center">
                  <div className="bg-[rgba(217,_217,_217,_0.4)] flex flex-col justify-center w-1/2 p-2 items-center rounded-lg">
                    <div className="text-xs ">Edit profile</div>
                  </div>
                  <div className="bg-[rgba(217,_217,_217,_0.4)] flex flex-col justify-center w-1/2 p-2 items-center rounded-lg">
                    <div className="text-xs ">View archive</div>
                  </div>
                  <div className="flex flex-row gap-2 shrink-0 items-start">
                    <img
                      src="https://file.rendit.io/n/uXmNQrw03s12xLMCnK7x.svg"
                      id="Settingsline"
                      className=" w-8 shrink-0"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-row gap-10 items-start">
                <div className="text-sm font-semibold">11 posts</div>
                <div className="text-sm font-semibold">1M followers</div>
                <div className="text-sm font-semibold">10M following</div>
              </div>
              <div className="flex flex-col gap-1 items-start ml-px mr-20">
                <div className="text-lg">thafsi.pv</div>
                <div className="self-stretch flex flex-col gap-px items-start">
                  <div className=" text-[#a7a1a1]">UI/UX desginer</div>
                  <div className="text-sm">
                    Front end developer & Game Desginer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-start flex flex-col gap-3 w- mb-1 ml-12">
          <div className="flex flex-row justify-between items-start">
            <div id="Ellipse1" className="">
              <img
                src="https://file.rendit.io/n/5BqefhPtK3djYMI5vhZL.svg"
                className=" w-11 h-11"
              />
            </div>
            <div id="Ellipse1" className="">
              <img
                src="https://file.rendit.io/n/5BqefhPtK3djYMI5vhZL.svg"
                className=" w-11 h-11"
              />
            </div>
            <div id="Ellipse1" className="">
              <img
                src="https://file.rendit.io/n/5BqefhPtK3djYMI5vhZL.svg"
                className=" w-11 h-11"
              />
            </div>
          </div>
          <div className="flex flex-row gap-[114px] items-start ml-4 mr-6">
            <div className="font-['Microsoft_Sans_Serif']">Highlights</div>
            <div className="font-['Microsoft_Sans_Serif'] mr-2">Love</div>
            <div className="font-['Microsoft_Sans_Serif'] mr-1">Starts</div>
          </div>
        </div>

        <div className="w-full text-sm font-medium text-center text-gray-500 border-t border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mt-px justify-center gap-6">
            <li className="mr-2">
              <a
                href="#"
                className="inline-block p-4 border-t-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                POSTS
              </a>
            </li>
            <li className="mr-2">
              <a
                href="#"
                className="inline-block p-4 text-blue-600 border-t-2 border-blue-600 rounded-b-lg active dark:text-blue-500 dark:border-blue-500"
                aria-current="page">
                REELS
              </a>
            </li>
            <li className="mr-2 flex ">
              <img
                src="https://file.rendit.io/n/LDe6sBzq16q9E7Pc61H1.svg"
                className="w-4 shrink-0"
              />
              <a
                href="#"
                className="inline-block p-4 pl-1 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                SAVED
              </a>
            </li>
          </ul>
          <div className="flex justify-center items-center">
            <div className=" columns-3 gap-1">
              {posts?.map((post) =>
                post.media_type.startsWith("image/") ? (
                  <img
                    className="h-72 w-72 py-[1px] aspect-video"
                    src={post.media_url}
                    alt=""
                  />
                ) : (
                  <div className="relative">
                    <div className="absolute right-3 top-2 ">
                      <ReelIcon />
                    </div>
                    <video
                      className="h-72 w-72 py-[1px] object-cover"
                      src={post.media_url}></video>
                  </div>
                )
              )}

             
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col gap-5">
          <div
            id="Line1"
            className="border-solid border-[#9b9b9b] mb-px h-px shrink-0 border-t border-b-0 border-x-0"
          />
          <div className="self-start flex flex-row ml-[315px] gap-16 items-start">
            <div className="flex flex-row mr-1 gap-px w-20 shrink-0 items-start">
              <img src="" className="mt-px w-6 shrink-0" />
              <div className="font-['Microsoft_Sans_Serif']">POSTS</div>
            </div>
            <div className="flex flex-row gap-2 w-20 shrink-0 items-start">
              <img src="" className="mt-px w-4 shrink-0" />
              <div className="font-['Microsoft_Sans_Serif']">REELS</div>
            </div>
            <div className="flex flex-row gap-2 w-20 shrink-0 items-center">
              <img
                src="https://file.rendit.io/n/LDe6sBzq16q9E7Pc61H1.svg"
                className="w-4 shrink-0"
              />
              <div className="font-['Microsoft_Sans_Serif'] self-start">
                SAVED
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-start">
            <img src="" />
            <img src="" />
            <img src="" />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Profile;
