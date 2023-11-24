import { createContext, useState } from "react";

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, duration = 4000) => {
    const id = Date.now();
    setToasts([...toasts, { id, message }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, toasts }}>
      {children}
      <div className="fixed bottom-0 w-full ">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-gray-800 text-white px-4 p-4 bg-opacity-60 font-semibold text-center">
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
