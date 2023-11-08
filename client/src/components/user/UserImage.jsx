import React, { useContext } from "react";
import { UserActionContext } from "../../context/UserActionContext";

const animation = "stroke-draw 6s ease-out infinite alternate";
function UserImage({ id, imgUrl, extra }) {
  const { loadStory } = useContext(UserActionContext);
  const gradientId = "myGradient";


  
  return (
    <div className={`circle ${extra}`}>
      <img src={imgUrl} alt="" className={` ${extra}  `} />
      {loadStory.loading != null && (
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            // enableBackground: "new -580 439 577.9 194",
            animation: loadStory.id == id ? animation : "",
          }}
          xml:space="preserve">
          <defs>
            {/* Define a linear gradient */}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "yellow" }} />
              <stop offset="50%" style={{ stopColor: "red" }} />
              <stop offset="100%" style={{ stopColor: "violet" }} />
            </linearGradient>
          </defs>
          {/* Apply the gradient to the circle's stroke */}
          <circle
            cx="50"
            cy="50"
            r="40"
            style={
              loadStory.id != id
                ? {
                    fill: "none",
                    stroke: `url(#${gradientId})`, // Reference the gradient
                    strokeLinecap: "round",
                    strokeWidth: 2,
                    strokeDasharray: 1,
                    strokeDashoffset: 0,
                  }
                : {}
            }
          />
        </svg>
      )}
    </div>
  );
}

export default React.memo(UserImage);
