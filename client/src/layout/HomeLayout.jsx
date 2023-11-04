import React, { useContext } from "react";
import SideNav from "../components/sidenav/SideNav";
import { Outlet } from "react-router-dom";
import { UserActionContext } from "../context/UserActionContext";
import AddPost from "../pages/homepage/modal/AddPost";
import UploadProgress from "../pages/homepage/modal/UploadProgress";

function HomeLayout() {
  const { addPost, setAddPost } = useContext(UserActionContext);
  return (
    <div
      id="MainHomePageRoot"
      className="overflow-hidden  relative flex flex-row justify-center w-full items-start pr-1  max-w-[1650px]">
      <SideNav />
      <Outlet />
      <AddPost show={addPost} closeModal={() => setAddPost(false)} />
      <UploadProgress />
    </div>
  );
}

export default HomeLayout;
