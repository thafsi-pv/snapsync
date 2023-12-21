import React, { useEffect, useState } from "react";
import VideoList from "./VideoList";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { REELS } from "../../services/api/const";


function Reels() {
  const [reels, setReels] = useState();

  useEffect(() => {
    getReels();
  }, []);

  const getReels = async () => {
    const response = await axiosInstance.get(REELS);
    console.log("🚀 ~ file: Reels.jsx:31 ~ getReels ~ response:", response);
    setReels(response.data);
  };

  if (!reels) return <div>Loading</div>;
  return (
    <VideoList videos={reels} />
  );
}

export default Reels;
