import React from "react";

function index({ onClick, label, extraClass }) {
  return (
    <button
      onClick={onClick}
      className={`bg-ssprimary900 text-white px-4 py-2 rounded hover:bg-ssprimary500 focus:outline-none ${extraClass}`}>
      {label}
    </button>
  );
}

export default index;
