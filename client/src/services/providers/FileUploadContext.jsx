import React, { createContext, useState } from "react";

export const FileUploadContext = createContext(null);

function FileUploadContextProvider({ children }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(false);

  return (
    <FileUploadContext.Provider
      value={{
        uploadProgress,
        setUploadProgress,
        fileSize,
        setFileSize,
        uploadStatus,
        setUploadStatus,
      }}>
      {children}
    </FileUploadContext.Provider>
  );
}

export default FileUploadContextProvider;
