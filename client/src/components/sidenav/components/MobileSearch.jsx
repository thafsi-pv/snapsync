import React, { useEffect, useState } from 'react'
import InputField from '../../uiPrimitives/fields/InputField';
import { ENTIRE_API } from '../../../services/api/const';
import { axiosInstance } from '../../../services/api/axiosInterceptor';

/**
 * Mobile Search bar component
 * Responsible for search in sm devices and explore list 
 *  param0 
 * @returns 
 */

export const MobileSearch = ({ setSearchBar }) => {
    const [exploreList, setExploreList] = useState();
    useEffect(() => {
      getEntirePost();
      return () => {
        setSearchBar(false);
      };
    }, []);
  
    const getEntirePost = async () => {
      const postList = await axiosInstance.get(ENTIRE_API);
      setExploreList(postList.data);
    };
  
    return (
      <div className="fixed top-0 w-full h-full bg-white z-[9] block lg:hidden">
        <div>
          <InputField placeholder="Search" extra="border rounded-md m-3" />
        </div>
        <div className="h-full overflow-scroll ">
          <div className="columns-3 gap-0 grid-flow-row-dense max-w-4xl ">
            {exploreList?.map((post) => (
              <div
                key={post._id}
                onClick={() => {
                  handleViewComments(post._id);
                }}
                className={`
                ${
                  post.media_type.startsWith("image/") ? "" : "row-span-2"
                } cursor-pointer p-[1px]`}>
                {post.media_type.startsWith("image/") && (
                  <img
                    src={post.media_url}
                    alt="Post"
                    className="w-full h-full object-cover hover:bg-gray-500"
                  />
                )}
                {post.media_type.startsWith("video/") && (
                  // <video
                  //   controls={false}
                  //   className="w-full h-full object-cover hover:bg-gray-500 row-span-2">
                  //   <source src={post.media_url} type="video/mp4" />
                  //   Your browser does not support the video tag.
                  // </video>
                  <img
                  src={post.media_url.replace(
                    /\.mp4$/,
                    ".jpg"
                  )}
                  alt="Media thumbnail"
                  className="w-full h-full object-cover hover:bg-gray-500 row-span-2"
                />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  