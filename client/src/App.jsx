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
import EditProfile from "./pages/profile/components/EditProfile";
import Explore from "./pages/explore/Explore";
import Story from "./pages/story/Story";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <FileUploadContextProvider>
          <UserActionContextProvider>
            <HomeLayout />
          </UserActionContextProvider>
        </FileUploadContextProvider>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/:username",
          element: <Profile />,
        },
        {
          path: "accounts/edit",
          element: <EditProfile />,
        },
        {
          path: "direct/inbox",
          element: <Messages />,
        },
        {
          path: "direct/inbox/:id",
          element: <Messages />,
        },
       
      ],
    },
    {
      path: "/story",
      element: <Story />,
    },
    {
      path: "/story/:id",
      element: <Story />,
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

