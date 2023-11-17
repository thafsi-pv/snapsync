import React from "react";

function index({ onClick, label, extraClass, type, icon, disabled }) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`bg-ssprimary900 text-white text-sm px-2 py-1 font-semibold rounded-lg hover:bg-ssprimary500 focus:outline-none ${extraClass}`}>
      <span className="flex justify-center text-xs">
        {" "}
        {icon}
        {label}
      </span>
    </button>
  );
}

export default index;
