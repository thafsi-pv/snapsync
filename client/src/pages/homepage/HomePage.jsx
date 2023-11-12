import React, { useContext, useEffect } from "react";
import Container from "./components/Container";
import { UserActionContext } from "../../services/providers/UserActionContext";

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
