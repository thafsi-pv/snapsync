import React, { useContext, useEffect, useState } from "react";
import { UserActionContext } from "../../context/UserActionContext";
import { HAVING_STORY_API } from "../../axios/const";
import { axiosInstance } from "../../axios/axiosInterceptor";
import StoryLoader from "../../assets/svg/StoryLoader";

function UserImage({ id, imgUrl, extra }) {
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

  return (
    <div className={`circle ${extra}`}>
      <img src={imgUrl} alt="" className={` ${extra}  `} />
      {loadStory.loading != null && haveStory && (
        <StoryLoader loadStory={loadStory} id={id} />
      )}
    </div>
  );
}

export default React.memo(UserImage);
