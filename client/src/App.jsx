import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import HomeLayout from "./layout/HomeLayout";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import Explore from "./pages/explore/Explore";
import HomePage from "./pages/homepage/HomePage";
import Messages from "./pages/messages/Messages";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/components/EditProfile";
import Story from "./pages/story/Story";
import FileUploadContextProvider from "./services/providers/FileUploadContext";
import UserActionContextProvider from "./services/providers/UserActionContext";
import ResetPassword from "./pages/auth/ResetPassword";
import ConfirmResetPassword from "./pages/auth/ConfirmResetPassword";

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
    {
      path: "/accounts/password/reset",
      element: <ResetPassword />,
    },
    {
      path: "/accounts/password/reset/confirm",
      element: <ConfirmResetPassword />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
