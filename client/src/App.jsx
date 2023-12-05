import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import AuthLayout from "./layout/AuthLayout";
import HomeLayout from "./layout/HomeLayout";
import Reels from "./pages/Reels/Reels";
import ConfirmResetPassword from "./pages/auth/ConfirmResetPassword";
import LogIn from "./pages/auth/LogIn";
import ResetPassword from "./pages/auth/ResetPassword";
import SignUp from "./pages/auth/SignUp";
import Explore from "./pages/explore/Explore";
import HomePage from "./pages/homepage/HomePage";
import Messages from "./pages/messages/Messages";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/components/EditProfile";
import Story from "./pages/story/Story";
import AuthProtectedRoute from "./services/protectedRoute/AuthProtectedRoute";
import HomePageProtectedRoute from "./services/protectedRoute/HomePageProtectedRoute";
import FileUploadContextProvider from "./services/providers/FileUploadContext";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <HomePageProtectedRoute>
          <FileUploadContextProvider>
            {/* <UserActionContextProvider> */}
            <HomeLayout />
            {/* </UserActionContextProvider> */}
          </FileUploadContextProvider>
        </HomePageProtectedRoute>
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
          path: "direct/inbox/:id/",
          element: <Messages />,
        },
      ],
    },
    {
      path: "/story",
      element: (
        <HomePageProtectedRoute>
          <Story />
        </HomePageProtectedRoute>
      ),
    },
    {
      path: "/story/:id",
      element: (
        <HomePageProtectedRoute>
          <Story />
        </HomePageProtectedRoute>
      ),
    },
    {
      path: "/reels/",
      element: (
        <HomePageProtectedRoute>
          <Reels />
        </HomePageProtectedRoute>
      ),
    },
    {
      path: "/reels/:id",
      element: (
        <HomePageProtectedRoute>
          <Reels />
        </HomePageProtectedRoute>
      ),
    },

    {
      path: "/auth/",
      element: (
        <AuthProtectedRoute>
          <AuthLayout />
        </AuthProtectedRoute>
      ),
      children: [
        {
          path: "login",
          element: <LogIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "accounts/password/reset",
          element: <ResetPassword />,
        },
        {
          path: "accounts/password/reset/confirm",
          element: <ConfirmResetPassword />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
