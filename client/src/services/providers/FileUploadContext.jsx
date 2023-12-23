import React, { createContext, useState } from "react";

export const FileUploadContext = createContext(null);

function FileUploadContextProvider({ children }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState({
    total: 0,
    current: 0,
  });

  return (
    <FileUploadContext.Provider
      value={{
        uploadProgress,
        setUploadProgress,
        fileSize,
        setFileSize,
        uploadStatus,
        setUploadStatus,
        uploadingFiles,
        setUploadingFiles,
      }}>
      {children}
    </FileUploadContext.Provider>
  );
}

export default FileUploadContextProvider;
