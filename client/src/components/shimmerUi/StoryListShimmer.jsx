import React from "react";

function StoryListShimmer() {
  return (
    <div className="flex space-x-4 mt-16">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="flex flex-col gap-2">
          <div
            key={index}
            className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full animate-pulse"
          />
          <div className="h-2 w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300  animate-pulse rounded-md"></div>
        </div>
      ))}
    </div>
  );
}

export default StoryListShimmer;
