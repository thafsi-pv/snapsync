import React from 'react';

const StoryLoader = () => {
  return (
    <div className="w-16 h-16 relative rounded-full border-4 border-white">
      {/* Profile Image */}
      <div className="w-full h-full rounded-full overflow-hidden">
        {/* Animation Spinner */}
        <div className="w-full h-full animate-spin bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
      </div>
    </div>
  );
};

export default StoryLoader;
