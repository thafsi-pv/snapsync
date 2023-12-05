import React, { useContext, useEffect } from "react";
import { UserActionContext } from "../../services/providers/UserActionContext";
import Container from "./components/Container";
import useLocalStorage from "../../hooks/useLocalStorage";
import { tokenName } from "../../utils/const";
import useAuth from "../../hooks/useAuth";

function HomePage() {
  const { setNavbar, getUserData } = useContext(UserActionContext);
  const { getStorage } = useLocalStorage();
  const { navigateToLogin } = useAuth();

  useEffect(() => {
    setNavbar("block");
    getUserData();
  }, []);

  //protected route:if not exist token navigate to login
  // if (!getStorage(tokenName)) {
  //   navigateToLogin();
  // }

  return (
    <div className="overflow-hidden  relative flex flex-row justify-between w-full items-start">
      <Container />
    </div>
  );
}

export default HomePage;
