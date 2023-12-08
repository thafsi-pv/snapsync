import React from "react";
import "../tickcss.css";

function TickAnimatedIcon() {
  return (
    <div className="animation-ctn">
      <div className="icon icon--order-success svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
          <g fill="none" stroke="#22AE73" strokeWidth="1">
            <circle
              cx="12"
              cy="12"
              r="11"
              style={{
                strokeDasharray: "35px, 35px",
                strokeDashoffset: "70px",
              }}
            ></circle>
            <circle
              id="colored"
              fill="#22AE73"
              cx="12"
              cy="12"
              r="11"
            //   style={{
            //     strokeDasharray: "35px, 35px",
            //     strokeDashoffset: "70px",
            //   }}
            ></circle>
            <polyline
              className="st0"
              stroke="#fff"
              strokeWidth="2"
              points="8,12.3 10.5,16 18,8.7"
              style={{
                strokeDasharray: "18px, 18px",
                strokeDashoffset: "36px",
              }}
            ></polyline>
            {/* <polyline
              className="st0"
              stroke="#fff"
              strokeWidth="3"
              points="9,14.5 12.5,19 22,9.7"
              style={{
                strokeDasharray: "18px, 18px",
                strokeDashoffset: "36px",
              }}
            ></polyline> */}
          </g>
        </svg>
      </div>
    </div>
  );
}

export default TickAnimatedIcon;
