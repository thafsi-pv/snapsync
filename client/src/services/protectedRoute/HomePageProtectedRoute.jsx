import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { tokenName } from "../../utils/const";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function HomePageProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { getStorage } = useLocalStorage();
  const { navigateToLogin } = useAuth();

  if (!getStorage(tokenName)) {
    navigateToLogin();
   
    return null;
  } else {
    return <>{children}</>;
  }
}

export default HomePageProtectedRoute;
