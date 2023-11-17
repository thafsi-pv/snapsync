import React from "react";

function BookmarkIcon({fill='none',color='black'}) {
  return (
    <svg
      aria-label="Save"
      className="cursor-pointer"
      fill={color}
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24">
      <title>Save</title>
      <polygon
        fill={fill}
        points="20 21 12 13.44 4 21 4 3 20 3 20 21"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"></polygon>
    </svg>
  );
}

export default BookmarkIcon;
