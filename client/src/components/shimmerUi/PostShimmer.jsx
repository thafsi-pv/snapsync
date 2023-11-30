import React from "react";

function PostShimmer() {
  return (
    <div className="flex flex-col space-x-4 gap-3 lg:w-[500px] w-[380px] lg:ml-20">
      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full animate-pulse" />
        {/* Name Section */}
        <div className="w-1/2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 h-4 animate-pulse" />
      </div>

      {/* Post Content Section */}
      <div className="flex-1 space-y-4">
        {/* Post Image/Content Section */}
        <div className="h-96 w-[100%] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />

        {/* Like, Comment, Share, Save Buttons Section */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {/* Like Button */}
            <div className="w-6 h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-pulse" />

            {/* Comment Button */}
            <div className="w-6 h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-pulse" />

            {/* Share Button */}
            <div className="w-6 h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-pulse" />
          </div>

          {/* Save Button */}
          <div className="w-6 h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default PostShimmer;
