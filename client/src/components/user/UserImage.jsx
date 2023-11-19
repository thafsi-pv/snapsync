import React, { useContext, useEffect, useState } from "react";
import { UserActionContext } from "../../services/providers/UserActionContext";
import { HAVING_STORY_API } from "../../services/api/const";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import StoryLoader from "../../assets/svg/StoryLoader";
import { useNavigate } from "react-router-dom";

function UserImage({ id, imgUrl, extra, username, imgStyle }) {
  const navigate = useNavigate();
  const [haveStory, setHaveStory] = useState(false);
  const { loadStory, setLoadStory } = useContext(UserActionContext);

  useEffect(() => {
    checkUserHaveStory();
  }, [id]);

  const checkUserHaveStory = async () => {
    const response = await axiosInstance.get(
      `${HAVING_STORY_API}?userId=${id}`
    );
    setHaveStory(response.data.length != 0 ? true : false);
  };

  const handleStoryClick = () => {
    setLoadStory({ loading: true, id });
    if (haveStory) {
      const timeOut = setTimeout(() => {
        navigate("/story");
      }, 3000);
      return () => clearTimeout(timeOut);
    } else navigate(`/${username}`);
  };

  return (
    <div
      className={`circle cursor-pointer ${extra}`}
      onClick={handleStoryClick}>
      <img
        src={imgUrl}
        alt=""
        className={` ${imgStyle} w-full h-full object-cover `}
      />
      {loadStory.loading != null && haveStory && (
        <StoryLoader loadStory={loadStory} id={id} />
      )}
    </div>
  );
}

export default UserImage;
