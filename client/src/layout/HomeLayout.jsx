import React, { useContext } from "react";
import SideNav from "../components/sidenav/SideNav";
import { Outlet } from "react-router-dom";
import AddStory from "../pages/story/modal/AddStory";
import { UserActionContext } from "../services/providers/UserActionContext";
import AddPost from "../components/modal/AddPost";
import UploadProgress from "../components/modal/UploadProgress";

function HomeLayout() {
  const { addPost, setAddPost } = useContext(UserActionContext);
  return (
    <div
      id="MainHomePageRoot"
      className="overflow-hidden  relative flex flex-row justify-center w-full items-start pr-1  max-w-[1650px]">
      <SideNav />
      <Outlet />
      <AddPost show={addPost} closeModal={() => setAddPost(false)} />
      <AddStory/>
      <UploadProgress />
    </div>
  );
}

export default HomeLayout;
