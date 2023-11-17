import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { PROFILE_API } from "../../services/api/const";
import SavedStory from "./components/SavedStory";
import UserDetails from "./components/UserDetails";
import UserPosts from "./components/UserPosts";

let postCount = "";
function Profile() {
  const [profile, setProfile] = useState();
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState(0);
  const { username } = useParams();

  useEffect(() => {
    getProfileData();
  }, [type]);

  const getProfileData = async () => {
    const response = await axiosInstance.get(
      `${PROFILE_API}?type=${type}&username=${username}`
    );
    if (type == 0) {
      setProfile(response.data.profile[0]);
      postCount = response.data.post.length;
    }
    setPosts(response.data.post);
  };

  return (
    <div
      id="MyProfileRoot"
      className="overflow-hidden  items-center relative flex flex-row justify-center w-full pl-8 py-10">
      <div className="items-center justify-center relative flex flex-col mb-5 gap-4 w-4/5 p-5">
        <UserDetails profile={profile} postCount={postCount} />
        <SavedStory />
        <UserPosts posts={posts} type={type} setType={setType} />
      </div>
    </div>
  );
}

export default Profile;
