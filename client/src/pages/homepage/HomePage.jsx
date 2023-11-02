import React, { useContext, useEffect, useState } from "react";
import SideNav from "../../components/sidenav/SideNav";
import Container from "./components/Container";
import { UserActionContext } from "../../context/UserActionContext";
import { axiosInstance } from "../../axios/axiosInterceptor";
import { GET_USER_DATA } from "../../axios/const";
import AddPost from "./modal/AddPost";
import UploadProgress from "./modal/UploadProgress";

function HomePage() {
  return (
    <div
      className="overflow-hidden  relative flex flex-row justify-between w-full items-start pr-10">
      <Container />
      {/* <AddPost show={addPost} closeModal={() => setAddPost(false)} />
      <UploadProgress /> */}
    </div>
  );
}

export default HomePage;
