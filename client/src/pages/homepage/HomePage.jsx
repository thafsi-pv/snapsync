import React, { useContext, useEffect } from "react";
import { UserActionContext } from "../../context/UserActionContext";
import Container from "./components/Container";

function HomePage() {
  const { setNavbar } = useContext(UserActionContext);
  useEffect(() => {
    setNavbar("block");
  }, []);
  return (
    <div className="overflow-hidden  relative flex flex-row justify-between w-full items-start pr-10">
      <Container />
    </div>
  );
}

export default HomePage;
