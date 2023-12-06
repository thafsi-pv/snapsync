import React, { useContext, useEffect } from "react";
import { UserActionContext } from "../../services/providers/UserActionContext";
import Container from "./components/Container";

function HomePage() {
  const { setNavbar, getUserData } = useContext(UserActionContext);

  useEffect(() => {
    setNavbar("block");
    getUserData();
  }, []);

  return (
    <div className="overflow-hidden  relative flex flex-row justify-between w-full items-start">
      <Container />
    </div>
  );
}

export default HomePage;
