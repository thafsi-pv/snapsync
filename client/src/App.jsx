import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import ChangePassword from "./pages/auth/ChangePassword";
import OTP from "./pages/auth/OTP";
import ResetPassword from "./pages/auth/ResetPassword";
import EmailVerification from "./pages/auth/EmailVerification";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import UserContextProvider from "./context/UserContext";
import FileUploadContextProvider from "./context/FileUploadContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<LogIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        <Route
          path="/home"
          element={
            <FileUploadContextProvider>
              <UserContextProvider>
                <HomePage />
              </UserContextProvider>
            </FileUploadContextProvider>
          }
        />
        <Route
          path="/auth/verifyemail"
          element={
            <UserContextProvider>
              <EmailVerification />
            </UserContextProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
