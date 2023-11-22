import React, { useEffect, useState } from "react";
import PostBottom from "../../../components/post/PostBottom";
import PostComment from "../../../components/post/PostComment";
import PostFile from "../../../components/post/PostFile";
import PostHead from "../../../components/post/PostHead";
import PostLikeAndCaption from "../../../components/post/PostLikeAndCaption";
import { axiosInstance } from "../../../services/api/axiosInterceptor";
import { POST_API } from "../../../services/api/const";
import useSocialAction from "../../../hooks/useSocialAction";

function Post() {
  // const [posts, setPosts] = useState();
  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  // const getAllPosts = async () => {
  //   const post = await axiosInstance.get(POST_API);
  //   setPosts(post.data);
  // };

  const { posts, setPosts, likePost, viewComments, savePost,sharePost } =
    useSocialAction();
  return (
    <div className="flex flex-col gap-4 mx-20">
      {posts?.map((post, index) => {
        return (
          <div className="mb-px ml-4 mr-5 max-w-[500px]" key={index}>
            <PostHead post={post} />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <div className="relative flex flex-col items-start ">
                    <PostFile
                      media_url={post.media_url}
                      media_type={post.media_type}
                      extra="relative object-fit rounded-md !w-[500px] !max-w-[480px] !max-h-[600px] bg-black"
                    />
                  </div>
                  <PostBottom
                    post={post}
                    posts={posts}
                    setPosts={setPosts}
                    index={index}
                    likePost={likePost}
                    viewComments={viewComments}
                    savePost={savePost}
                    sharePost={sharePost}
                  />
                </div>
                <div className="flex flex-row justify-between items-start mr-8">
                  <PostLikeAndCaption
                    post={post}
                    posts={posts}
                    setPosts={setPosts}
                    index={index}
                  />
                </div>
              </div>
              <PostComment post={post} />
            </div>
            <div id="Border2" className="bg-[#efefef] h-px shrink-0" />
          </div>
        );
      })}
    </div>
  );
}

export default Post;
