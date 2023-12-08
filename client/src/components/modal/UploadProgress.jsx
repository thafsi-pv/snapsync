import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { FileUploadContext } from "../../services/providers/FileUploadContext";
import TickAnimatedIcon from "../../assets/svg/TickAnimatedIcon";
import successicon from "../../assets/gif/success1.gif";

function UploadProgress() {
  const { uploadProgress, fileSize } = useContext(FileUploadContext);

  // if (uploadProgress == 0 || uploadProgress == undefined) return null;
  return ReactDOM.createPortal(
    <div className="fixed bottom-6 lg:bottom-0 md:w-1/4 lg:w-1/6 sm:w-full right-0 p-4 m-2 shadow-xl border rounded-md">
      <div className="flex gap-2 items-center">
        {/* <img src={successicon} loop={false} className=" w-10 h-10" alt="sd" /> */}
        <TickAnimatedIcon className="" />
        <p className="text-xs font-semibold">Post uploaded successfully</p>
      </div>
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
    </div>,
    document.getElementById("portal")
  );
}

export default UploadProgress;
