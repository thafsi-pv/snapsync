import React, { useEffect, useState } from "react";

function Toast({ time = 4000 }) {
  const [showToast, setShowToast] = useState(true);
  console.log("🚀 ~ file: Toast.jsx:5 ~ Toast ~ showToast:", showToast)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    },time);
    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  if (!showToast) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full translate-x-0 h-16 bg-black p-2 bg-opacity-60">
      <div className="flex justify-center items-center h-full">
        <p className="text-white font-semibold">toast message</p>
      </div>
    </div>
  );
}

export default Toast;
