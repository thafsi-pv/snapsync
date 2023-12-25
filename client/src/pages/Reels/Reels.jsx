import React, { useEffect, useState } from "react";
import VideoList from "./VideoList";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { REELS } from "../../services/api/const";
import { transformedData } from "../../utils/transformData";

function Reels() {
  const [reels, setReels] = useState();

  useEffect(() => {
    getReels();
  }, []);

  const getReels = async () => {
    const response = await axiosInstance.get(REELS);
    const transformedDatas = transformedData(response.data);
    setReels(transformedDatas);
  };

  if (!reels) return <div>Loading</div>;
  return <VideoList videos={reels} />;
}

export default Reels;
