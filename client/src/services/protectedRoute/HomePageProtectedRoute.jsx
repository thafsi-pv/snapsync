import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { tokenName } from "../../utils/const";
import useAuth from "../../hooks/useAuth";

function HomePageProtectedRoute({ children }) {
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
