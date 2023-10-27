import React, { useContext, useEffect, useState } from "react";
import SideNav from "../../components/sidenav/SideNav";
import Container from "./components/Container";
import { UserActionContext } from "../../context/UserActionContext";
import { axiosInstance } from "../../axios/axiosInterceptor";
import { GET_USER_DATA } from "../../axios/const";
import AddPost from "./modal/AddPost";
import UploadProgress from "./modal/UploadProgress";

function HomePage() {
  const { userData, setUserData } = useContext(UserActionContext);
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
      className="overflow-hidden  relative flex flex-row justify-between w-full items-start pr-10">
      <Container />
      <AddPost show={addPost} closeModal={() => setAddPost(false)} />
      <UploadProgress />
    </div>
  );
}

export default HomePage;
