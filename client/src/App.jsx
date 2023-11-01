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
import {
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import FileUploadContextProvider from "./context/FileUploadContext";
import Profile from "./pages/profile/Profile";
import HomeLayout from "./layout/HomeLayout";
import UserActionContextProvider from "./context/UserActionContext";
import Messages from "./pages/messages/Messages";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <FileUploadContextProvider>
          <HomeLayout />
        </FileUploadContextProvider>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/profile/:username",
          element: <Profile />,
        },
        {
          path: "/inbox",
          element: <Messages />,
        },
      ],
    },
    {
      path: "/auth/login",
      element: <LogIn />,
    },
    {
      path: "/auth/signup",
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;

// <>
// <Routes>
//   <Route path="/" element={<Navigate to="/auth/login" replace />} />
//   <Route path="/auth/login" element={<LogIn />} />
//   <Route path="/auth/signup" element={<SignUp />} />

//   <Route
//     path="/home"
//     element={
//       <FileUploadContextProvider>
//         <UserContextProvider>
//           <HomeLayout />
//         </UserContextProvider>
//       </FileUploadContextProvider>
//     }
//   />
//   <Route
//     path="/auth/verifyemail"
//     element={
//       <UserContextProvider>
//         <EmailVerification />
//       </UserContextProvider>
//     }
//   />
//   <Route path="/profile" element={<Profile />} />
// </Routes>
// </>
