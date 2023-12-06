import { Suspense, lazy } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import SocketContextProvider from "./services/providers/SocketContext";
import { Loading } from "./assets/svg/Loading";

// import StoryLayout from "./layout/StoryLayout";
const StoryLayout = lazy(() => import("./layout/StoryLayout"));

// import AuthLayout from "./layout/AuthLayout";
const AuthLayout = lazy(() => import("./layout/AuthLayout"));

// import HomeLayout from "./layout/HomeLayout";
const HomeLayout = lazy(() => import("./layout/HomeLayout"));

// import Reels from "./pages/Reels/Reels";
const Reels = lazy(() => import("./pages/Reels/Reels"));

// import ConfirmResetPassword from "./pages/auth/ConfirmResetPassword";
const ConfirmResetPassword = lazy(() =>
  import("./pages/auth/ConfirmResetPassword")
);

// import LogIn from "./pages/auth/LogIn";
const LogIn = lazy(() => import("./pages/auth/LogIn"));

// import ResetPassword from "./pages/auth/ResetPassword";
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

// import SignUp from "./pages/auth/SignUp";
const SignUp = lazy(() => import("./pages/auth/SignUp"));

// import Explore from "./pages/explore/Explore";
const Explore = lazy(() => import("./pages/explore/Explore"));

// import HomePage from "./pages/homepage/HomePage";
const HomePage = lazy(() => import("./pages/homepage/HomePage"));

// import Messages from "./pages/messages/Messages";
const Messages = lazy(() => import("./pages/messages/Messages"));

// import Profile from "./pages/profile/Profile";
const Profile = lazy(() => import("./pages/profile/Profile"));

// import EditProfile from "./pages/profile/components/EditProfile";
const EditProfile = lazy(() =>
  import("./pages/profile/components/EditProfile")
);

// import Story from "./pages/story/Story";
const Story = lazy(() => import("./pages/story/Story"));

// import AuthProtectedRoute from "./services/protectedRoute/AuthProtectedRoute";
const AuthProtectedRoute = lazy(() =>
  import("./services/protectedRoute/AuthProtectedRoute")
);

// import HomePageProtectedRoute from "./services/protectedRoute/HomePageProtectedRoute";
const HomePageProtectedRoute = lazy(() =>
  import("./services/protectedRoute/HomePageProtectedRoute")
);

// import FileUploadContextProvider from "./services/providers/FileUploadContext";
const FileUploadContextProvider = lazy(() =>
  import("./services/providers/FileUploadContext")
);

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading/>}>
          <HomePageProtectedRoute>
            <SocketContextProvider>
              <FileUploadContextProvider>
                {/* <UserActionContextProvider> */}
                <HomeLayout />
                {/* </UserActionContextProvider> */}
              </FileUploadContextProvider>
            </SocketContextProvider>
          </HomePageProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Loading/>}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "/explore",
          element: (
            <Suspense fallback={<Loading/>}>
              <Explore />
            </Suspense>
          ),
        },
        {
          path: "/:username",
          element: (
            <Suspense fallback={<Loading/>}>
              <Profile />
            </Suspense>
          ),
        },
        {
          path: "accounts/edit",
          element: (
            <Suspense fallback={<Loading/>}>
              <EditProfile />
            </Suspense>
          ),
        },
        {
          path: "direct/inbox",
          element: (
            <Suspense fallback={<Loading/>}>
              <Messages />
            </Suspense>
          ),
        },
        {
          path: "direct/inbox/:id/",
          element: (
            <Suspense fallback={<Loading/>}>
              <Messages />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading/>}>
          <HomePageProtectedRoute>
            {/* <SocketContextProvider> */}
              <StoryLayout />
            {/* </SocketContextProvider> */}
          </HomePageProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          path: "story",
          element: (
            // <Suspense fallback={<Loading/>}>
            // <HomePageProtectedRoute>
            <Story />
            // </HomePageProtectedRoute>
            // </Suspense>
          ),
        },
        {
          path: "story/:id",
          element: (
            // <Suspense fallback={<Loading/>}>
            // <HomePageProtectedRoute>
            <Story />
            // </HomePageProtectedRoute>
            // </Suspense>
          ),
        },
      ],
    },
    // {
    //   path: "/story",
    //   element: (
    //     <Suspense fallback={<Loading/>}>
    //       <HomePageProtectedRoute>
    //         <Story />
    //       </HomePageProtectedRoute>
    //     </Suspense>
    //   ),
    // },
    // {
    //   path: "/story/:id",
    //   element: (
    //     <Suspense fallback={<Loading/>}>
    //       <HomePageProtectedRoute>
    //         <Story />
    //       </HomePageProtectedRoute>
    //     </Suspense>
    //   ),
    // },
    {
      path: "/reels/",
      element: (
        <Suspense fallback={<Loading/>}>
          <HomePageProtectedRoute>
            <Reels />
          </HomePageProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/reels/:id",
      element: (
        <Suspense fallback={<Loading/>}>
          <HomePageProtectedRoute>
            <Reels />
          </HomePageProtectedRoute>
        </Suspense>
      ),
    },

    {
      path: "/auth/",
      element: (
        <Suspense fallback={<Loading/>}>
          <AuthProtectedRoute>
            <AuthLayout />
          </AuthProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          path: "login",
          element: (
            <Suspense fallback={<Loading/>}>
              <LogIn />
            </Suspense>
          ),
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={<Loading/>}>
              <SignUp />
            </Suspense>
          ),
        },
        {
          path: "accounts/password/reset",
          element: (
            <Suspense fallback={<Loading/>}>
              <ResetPassword />
            </Suspense>
          ),
        },
        {
          path: "accounts/password/reset/confirm",
          element: (
            <Suspense fallback={<Loading/>}>
              <ConfirmResetPassword />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
