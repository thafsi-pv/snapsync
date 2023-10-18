import React from "react";

function index({ onClick, label, extraClass, type }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-ssprimary900 text-white text-sm px-2 py-1 font-semibold rounded-lg hover:bg-ssprimary500 focus:outline-none ${extraClass}`}>
      {label}
    </button>
  );
}

export default index;
