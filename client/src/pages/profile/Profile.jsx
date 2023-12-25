import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { GET_SAVED_POST_API, PROFILE_API } from "../../services/api/const";
import SavedStory from "./components/SavedStory";
import UserDetails from "./components/UserDetails";
import UserPosts from "./components/UserPosts";

let postCount = "";
function Profile() {
  const [profile, setProfile] = useState();
  const [posts, setPosts] = useState();
  const [type, setType] = useState(0);
  const { username } = useParams();

  useEffect(() => {
    getProfileData();
  }, [type, username]);

  const getProfileData = async () => {
    const apiUrl =
      type === 3
        ? GET_SAVED_POST_API
        : `${PROFILE_API}?type=${type}&username=${username}`;
    const response = await axiosInstance.get(apiUrl);
    console.log("🚀 ~ file: Profile.jsx:26 ~ getProfileData ~ response:", response)
    if (type == 0) {
      setProfile(response.data.profile[0]);
      postCount = response.data.post.length;
      setPosts(response?.data?.post);
    } else if (type == 3) {
      setPosts(response?.data);
    } else {
      setPosts(response?.data?.post);
    }
  };

  return (
    <div
      id="MyProfileRoot"
      className="overflow-hidden  items-center relative flex flex-row justify-center w-full lg:pl-8 py-14">
      {profile && (
        <div className="items-center justify-center relative flex flex-col mb-5 gap-3 w-full lg:w-4/5 lg:p-5">
          <UserDetails profile={profile} postCount={postCount} />
          <SavedStory />
          <UserPosts
            userId={profile._id}
            posts={posts}
            type={type}
            setType={setType}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
