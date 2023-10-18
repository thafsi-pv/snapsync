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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LogIn />
      <SignUp/>
      <EmailVerification/>
      <ChangePassword/>
      <OTP/>
      <ResetPassword/>
      <MainHomePage/>
    </>
  );
}

export default App;
