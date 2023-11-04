import React from "react";
import PostFile from "../../components/post/PostFile";
import Contents from "./components/Contents";

function Explore() {
  // Sample data for posts
  const posts = [
    {
      id: 1,
      image: "path-to-image-1.jpg",
      likes: 1234,
      comments: 56,
      media_type: "image/",
      url: "https://res.cloudinary.com/dm4djc1b1/image/upload/v1698316845/jnifjbcgpds1pg4dkb0y.jpg",
    },
    {
      id: 2,
      video: "path-to-video-1.mp4",
      likes: 789,
      comments: 34,
      media_type: "video/",
      url: "https://res.cloudinary.com/dm4djc1b1/video/upload/v1698316669/tmvzigjdimwyzgpdqd5p.mp4",
    },
    {
      id: 3,
      image: "path-to-image-1.jpg",
      likes: 1234,
      comments: 56,
      media_type: "image/",
      url: "https://res.cloudinary.com/dm4djc1b1/image/upload/v1698316845/jnifjbcgpds1pg4dkb0y.jpg",
    },
    {
      id: 3,
      image: "path-to-image-1.jpg",
      likes: 1234,
      comments: 56,
      media_type: "image/",
      url: "https://res.cloudinary.com/dm4djc1b1/image/upload/v1698316845/jnifjbcgpds1pg4dkb0y.jpg",
    },
    {
      id: 4,
      video: "path-to-video-1.mp4",
      likes: 789,
      comments: 34,
      media_type: "video/",
      url: "https://res.cloudinary.com/dm4djc1b1/video/upload/v1698316669/tmvzigjdimwyzgpdqd5p.mp4",
    },
    {
      id: 5,
      video: "path-to-video-1.mp4",
      likes: 789,
      comments: 34,
      media_type: "video/",
      url: "https://res.cloudinary.com/dm4djc1b1/video/upload/v1698316669/tmvzigjdimwyzgpdqd5p.mp4",
    },
    {
      id: 6,
      video: "path-to-video-1.mp4",
      likes: 789,
      comments: 34,
      media_type: "video/",
      url: "https://res.cloudinary.com/dm4djc1b1/video/upload/v1698316669/tmvzigjdimwyzgpdqd5p.mp4",
    },
    {
        id: 3,
        image: "path-to-image-1.jpg",
        likes: 1234,
        comments: 56,
        media_type: "image/",
        url: "https://res.cloudinary.com/dm4djc1b1/image/upload/v1698316845/jnifjbcgpds1pg4dkb0y.jpg",
      },
    // Add more posts here
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-row-dense">
        {posts.map((post) => (
          <div className={post.media_type != "image/" ? "row-span-2" : ""}>
            {post.image && (
              <img
                src={post.url}
                alt="Post"
                className="w-full h-fit object-cover rounded-t-md hover:bg-gray-500"
              />
            )}
            {post.video && (
              <video
                controls={false}
                className="w-full h-fit object-cover rounded-t-md hover:bg-gray-500 row-span-2">
                <source src={post.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          //   <div key={post.id} className="bg-white rounded-md shadow-md hover:bg-gray-500">
          //     {post.image && (
          //       <img
          //         src={post.url}
          //         alt="Post"
          //         className="w-full h-fit object-cover rounded-t-md hover:bg-gray-500"
          //       />
          //     )}
          //     {post.video && (
          //       <video
          //         controls={false}
          //         className="w-full h-fit object-cover rounded-t-md hover:bg-gray-500">
          //         <source src={post.url} type="video/mp4" />
          //         Your browser does not support the video tag.
          //       </video>
          //     )}
          //     {/* <Contents media_type={post.media_type} media_url={post.url}/> */}
          //     {/* <div className="p-4">
          //       <div className="flex items-center justify-between">
          //         <div>
          //           <span className="text-lg font-semibold">
          //             Likes: {post.likes}
          //           </span>
          //         </div>
          //         <div>
          //           <span className="text-lg font-semibold">
          //             Comments: {post.comments}
          //           </span>
          //         </div>
          //       </div>
          //     </div> */}
          //   </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
