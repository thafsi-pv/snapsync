import React from "react";
import SideNav from "../components/sidenav/SideNav";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div
      id="MainHomePageRoot"
      className="overflow-hidden  relative flex flex-row justify-center w-full items-start pr-1 gap-16 max-w-[1650px]">
      <SideNav/>
      <Outlet />
    </div>
  );
}

export default HomeLayout;
