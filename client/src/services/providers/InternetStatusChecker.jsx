import React, { useState, useEffect } from "react";
import { RiSignalWifiOffLine } from "react-icons/ri";

const InternetStatusChecker = ({ children }) => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  console.log("🚀 ~ file: InternetStatusChecker.jsx:6 ~ InternetStatusChecker ~ isOnline:", isOnline)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {isOnline ? (
        <>{children}</>
      ) : (
        <div class="bg-black text-white">
          <div class="flex h-screen w-screen">
            <div class="flex justify-center flex-col items-center w-full">
              <div>
              <RiSignalWifiOffLine className="h-16 w-16 text-red-400"/>
              </div>
              <p class="text-sm md:text-base  p-2 mb-4">
                You aren't connected to a working internet connection
              </p>
              <a
                href="/"
                class="bg-transparent hover:bg-gray-400 text-white hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-white hover:border-transparent">
                Retry
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternetStatusChecker;
