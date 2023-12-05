import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import useAuth from "../../hooks/useAuth";
import { tokenName } from "../../utils/const";

function AuthProtectedRoute({ children }) {
  const { getStorage } = useLocalStorage();
  const { navigateToHome } = useAuth();
  if (!getStorage(tokenName)) {
    return <>{children}</>;
  } else {
    navigateToHome();
    return null;
  }
}

export default AuthProtectedRoute;
