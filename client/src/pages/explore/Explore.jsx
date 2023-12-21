import React, { Suspense, lazy } from "react";
import { Loading } from "../../assets/svg/Loading";
import useExplore from "../../hooks/useExplore";
import Contents from "./components/Contents";
const Comments = lazy(() => import("../../components/modal/Comments"));

/**
 * Explore page component
 * Responsibel for load all contents and comment page load
 * using custom hook useExplore
 * @returns Explore page
 */

function Explore() {
  const { handleViewComments, exploreList, comments, setComments, postId } =
    useExplore();

  return (
    <div className="container mx-auto py-6">
      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 grid-flow-row-dense max-w-4xl">
        {exploreList?.map((post) => (
          <Contents post={post} handleViewComments={handleViewComments} />
        ))}
      </div>
      <Suspense fallback={<Loading />}>
        <Comments
          postId={postId}
          show={comments}
          closeModal={() => setComments(false)}
        />
      </Suspense>
    </div>
  );
}

export default Explore;
