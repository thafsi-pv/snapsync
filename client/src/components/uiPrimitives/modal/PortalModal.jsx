import React, { useEffect } from "react";
import ReactDOM from "react-dom";

/**
 * PortalModal component
 * Responsible for modal
 * @param {*} param0
 * @returns
 */
function PortalModal({ children, show, close }) {
  //hide body overflow
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden backdrop-blur-sm z-50 bg-black bg-opacity-50"
      onClick={close}>
      {children}
    </div>,
    document.getElementById("portal")
  );
}

export default PortalModal;
