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
import UserContextProvider from "./context/UserContext";
import FileUploadContextProvider from "./context/FileUploadContext";
import Profile from "./pages/myprofile/components/Profile";
import HomeLayout from "./layout/HomeLayout";

function App() {
  const [count, setCount] = useState(0);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/profile",
          element: <Profile />,
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

  return (
    <FileUploadContextProvider>
      <UserContextProvider>
        <RouterProvider router={appRouter} />
      </UserContextProvider>
    </FileUploadContextProvider>
  );
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
