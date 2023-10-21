import React from "react";
import SideNav from "../../components/sidenav/SideNav";
import Container from "./components/Container";

function HomePage() {
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
