import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { FileUploadContext } from "../../services/providers/FileUploadContext";
import TickAnimatedIcon from "../../assets/svg/TickAnimatedIcon";
import successicon from "../../assets/gif/success1.gif";
import { IoClose } from "react-icons/io5";
import useSocialAction from "../../hooks/useSocialAction";

function UploadProgress() {
  const {
    uploadProgress,
    setUploadProgress,
    fileSize,
    uploadStatus,
    setUploadStatus,
  } = useContext(FileUploadContext);
    console.log("🚀 ~ file: UploadProgress.jsx:17 ~ UploadProgress ~ uploadProgress:", uploadProgress)


  const handleClose = () => {
    setUploadProgress(0);
    // setUploadStatus(false);
  };

  if (uploadProgress == 0 || uploadProgress == undefined) return null;
  return ReactDOM.createPortal(
    <div className="fixed bottom-6 lg:bottom-0 md:w-1/4 lg:w-1/6 w-1/2 right-0 mb-8 mr-2 p-4 lg:m-4 md:m-4 shadow-xl border rounded-md bg-white">
      {uploadStatus && (
        <div className="flex gap-2 items-center">
          <div
            className="absolute top-0 right-0 border rounded-full -mt-2 -mr-1 cursor-pointer bg-white"
            onClick={handleClose}>
            <IoClose className="w-4 h-4 " />
          </div>
          {/* <img src={successicon} loop={false} className=" w-10 h-10" alt="sd" /> */}
          <TickAnimatedIcon className="" />
          <p className="text-xs font-semibold">Post uploaded successfully</p>
        </div>
      )}
      {!uploadStatus && uploadProgress > 0 && (
        <div>
          <p className="text-xs font-semibold">Uploading Post..</p>
          <div className="flex justify-center items-center gap-1">
            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 ">
              <div
                class="bg-blue-600 text-xs font-medium text-blue-100 text-center  h-1 leading-none rounded-full"
                style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <p className="text-xs font-medium">{uploadProgress}%</p>
            <p className="text-xs font-medium">({fileSize.toFixed(1)}MB)</p>
          </div>
        </div>
      )}
    </div>,
    document.getElementById("portal")
  );
}

export default UploadProgress;
