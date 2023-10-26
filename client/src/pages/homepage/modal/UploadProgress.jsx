import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { FileUploadContext } from "../../../context/FileUploadContext";

function UploadProgress() {
  const { uploadProgress,uploadStatus } = useContext(FileUploadContext);

  if (uploadStatus == 0) return null;
  return ReactDOM.createPortal(
    <div className="fixed bottom-0 md:w-1/4 lg:w-1/6 sm:w-full right-0 p-4 m-2">
      <p className="text-xs font-semibold">Sending Post..</p>
      <div className="flex justify-center items-center gap-2">
        <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 ">
          <div
            class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.2 h-2 leading-none rounded-full"
            style={{ width: `${uploadProgress}%` }}></div>
        </div>
        <p className="text-xs font-semibold">{uploadProgress}</p>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default UploadProgress;
