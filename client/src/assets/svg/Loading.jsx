import { AiOutlineLoading3Quarters } from "react-icons/ai";
export const Loading = () => {
  return (
    <div className="fixed left-0 right-0 bottom-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-90 z-50">
      <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3 text-white" />
    </div>
  );
};
