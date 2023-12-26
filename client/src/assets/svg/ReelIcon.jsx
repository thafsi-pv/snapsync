import React from "react";

function ReelIcon({ className, outline = false, color = "#ffffff" }) {
  if (outline) {
    return (
      <svg
      aria-label=""
        className={className}
        fill="currentColor"
        height="12"
        role="img"
        viewBox="0 0 24 24"
        width="12">
        <title></title>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="2.049"
          x2="21.95"
          y1="7.002"
          y2="7.002"></line>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="13.504"
          x2="16.362"
          y1="2.001"
          y2="7.002"></line>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="7.207"
          x2="10.002"
          y1="2.11"
          y2="7.002"></line>
        <path
          d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"></path>
        <path
          d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
          fillRule="evenodd"></path>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0,0,256,256">
      <g
        fill={color}
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{ mixBlendMode: "normal" }}>
        <g transform="scale(5.12,5.12)">
          <path d="M13.34,4.13l6.92,11.87h-16.26v-1c0,-5.52 4.05,-10.08 9.34,-10.87zM33.26,16h-10.69l-7,-12h10.69zM46,15v1h-10.43l-7,-12h6.43c6.08,0 11,4.92 11,11zM4,18v17c0,6.08 4.92,11 11,11h20c6.08,0 11,-4.92 11,-11v-17zM31,32.19l-7.99,4.54c-1.33,0.76 -3.01,-0.18 -3.01,-1.69v-9.08c0,-1.51 1.68,-2.45 3.01,-1.69l7.99,4.54c1.33,0.75 1.33,2.63 0,3.38z"></path>
        </g>
      </g>
    </svg>
  );
}

export default ReelIcon;
