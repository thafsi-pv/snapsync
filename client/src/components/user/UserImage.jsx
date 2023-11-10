import React, { useContext, useEffect, useState } from "react";
import { UserActionContext } from "../../context/UserActionContext";
import { HAVING_STORY_API } from "../../axios/const";
import { axiosInstance } from "../../axios/axiosInterceptor";
import StoryLoader from "../../assets/svg/StoryLoader";
import { useNavigate } from "react-router-dom";

function UserImage({ id, imgUrl, extra,username }) {
  const navigate = useNavigate();
  const [haveStory, setHaveStory] = useState();
  const { loadStory } = useContext(UserActionContext);

  useEffect(() => {
    checkUserHaveStory();
  }, []);

  const checkUserHaveStory = async () => {
    const response = await axiosInstance.get(
      `${HAVING_STORY_API}?userId=${id}`
    );
    setHaveStory(response.data.length != 0 ? true : false);
  };

  const handleStoryClick = () => {
    if (haveStory) {
      const timeOut = setTimeout(() => {
        navigate("/story");
      }, 3000);
      return () => clearTimeout(timeOut);
    } else navigate(`/${username}`);
  };

  return (
    <div className={`circle cursor-pointer ${extra}`} onClick={handleStoryClick}>
      <img src={imgUrl} alt="" className={` ${extra}  `} />
      {loadStory.loading != null && haveStory && (
        <StoryLoader loadStory={loadStory} id={id} />
      )}
    </div>
  );
}

export default React.memo(UserImage);
