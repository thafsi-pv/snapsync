import React from "react";

function GradiantHeartIcon() {
  return (
    <svg aria-label="Like" viewBox="0 0 48 48" width="78">
      <title>Like</title>
      <defs>
        <linearGradient gradientTransform="rotate(35)" id="ig_heart_gradient">
          <stop offset="0%" stop-color="#FF7A00"></stop>
          <stop offset="40%" stop-color="#FF0169"></stop>
          <stop offset="100%" stop-color="#D300C5"></stop>
        </linearGradient>
      </defs>
      <path
        d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
        fill="url(#ig_heart_gradient)"></path>
    </svg>
  );
}

export default GradiantHeartIcon;
