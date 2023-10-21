import React, { useContext, useEffect } from "react";
import SideNav from "../../components/sidenav/SideNav";
import Container from "./components/Container";
import { UserContext } from "../../context/UserContext";
import { axiosInstance } from "../../axios/axiosInterceptor";
import { GET_USER_DATA } from "../../axios/const";

function HomePage() {
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const response = await axiosInstance.get(GET_USER_DATA);
    console.log(
      "🚀 ~ file: HomePage.jsx:17 ~ getUserData ~ response:",
      response
    );
    setUserData(response?.data);
  };

  return (
    <div
      id="MainHomePageRoot"
      className="overflow-hidden  relative flex flex-row justify-between w-full items-start pr-10 ">
      <SideNav />
      <Container />
    </div>
  );
}

export default HomePage;
