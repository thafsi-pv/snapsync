import React, { useContext, useEffect, useState } from "react";
import ReelIcon from "../../assets/svg/ReelIcon";
import { Link, useParams } from "react-router-dom";
import Comments from "../homepage/modal/Comments";
import UserImage from "../../components/user/UserImage";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { PROFILE_API } from "../../services/api/const";
import { UserActionContext } from "../../services/providers/UserActionContext";
import SavedStory from "./components/SavedStory";
import UserDetails from "./components/UserDetails";
import UserPosts from "./components/UserPosts";

function Profile() {
  const [profile, setProfile] = useState();
  console.log("🚀 ~ file: Profile.jsx:12 ~ Profile ~ profile:", profile);
  const [posts, setPosts] = useState();
  const { username } = useParams();
  const { comments, setComments, postId, setPostId } =
    useContext(UserActionContext);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const response = await axiosInstance.get(
      `${PROFILE_API}?type=0&username=${username}`
    );
    setProfile(response.data.profile[0]);
    setPosts(response.data.post);
  };

  const handleViewComments = (postId) => {
    setComments(true);
    setPostId(postId);
  };

  return (
    <div
      id="MyProfileRoot"
      className="overflow-hidden  items-center relative flex flex-row justify-center w-full pl-8 py-10">
      <div className="items-center justify-center relative flex flex-col mb-5 gap-4 w-4/5 p-5">
        <UserDetails profile={profile} postCount={posts?.length} />
        <SavedStory />

        <UserPosts posts={posts} />

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
      <Comments
        postId={postId}
        show={comments}
        closeModal={() => setComments(false)}
      />
    </div>
  );
}

export default Profile;
