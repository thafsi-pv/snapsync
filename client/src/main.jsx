import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SocketContextProvider from "./services/providers/SocketContext.jsx";
import { ToastProvider } from "./services/providers/ToastContext.jsx";
import InternetStatusChecker from "./services/providers/InternetStatusChecker.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <InternetStatusChecker>
    <ToastProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </ToastProvider>
  </InternetStatusChecker>
);
