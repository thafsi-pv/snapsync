import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function PortalModal({ children, show }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden backdrop-blur-sm">
      {children}
    </div>,
    document.getElementById("portal")
  );
}

export default PortalModal;
