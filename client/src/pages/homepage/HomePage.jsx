import React, { useContext, useEffect, useState } from "react";
import SideNav from "../../components/sidenav/SideNav";
import Container from "./components/Container";
import { UserContext } from "../../context/UserContext";
import { axiosInstance } from "../../axios/axiosInterceptor";
import { GET_USER_DATA } from "../../axios/const";
import AddPost from "./modal/AddPost";
import UploadProgress from "./modal/UploadProgress";

function HomePage() {
  const { userData, setUserData } = useContext(UserContext);
  const [addPost, setAddPost] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const response = await axiosInstance.get(GET_USER_DATA);
    setUserData(response?.data);
  };

  return (
    <div
      id="MainHomePageRoot"
      className="overflow-hidden  relative flex flex-row justify-between w-full items-start pr-10 max-w-[1650px]">
      <SideNav setAddPost={setAddPost} />
      <Container />
      <AddPost show={addPost} closeModal={() => setAddPost(false)} />
      <UploadProgress />
    </div>
  );
}

export default HomePage;
