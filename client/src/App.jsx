import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import ChangePassword from "./pages/auth/ChangePassword";
import OTP from "./pages/auth/OTP";
import ResetPassword from "./pages/auth/ResetPassword";
import MainHomePage from "./pages/homepage/MainHomePage";
import EmailVerification from "./pages/auth/EmailVerification";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<LogIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/home" element={<MainHomePage />} />
        <Route path="/auth/verifyemail" element={<EmailVerification />} />
      </Routes>
    </>
  );
}

export default App;
