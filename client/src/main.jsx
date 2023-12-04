import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SocketContextProvider from "./services/providers/SocketContext.jsx";
import { ToastProvider } from "./services/providers/ToastContext.jsx";
import InternetStatusChecker from "./services/providers/InternetStatusChecker.jsx";
import UserActionContextProvider from "./services/providers/UserActionContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <InternetStatusChecker>
    <ToastProvider>
      <UserActionContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </UserActionContextProvider>
    </ToastProvider>
  </InternetStatusChecker>
);
