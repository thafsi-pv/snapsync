import React, { createContext, useState } from "react";

export const FileUploadContext = createContext(null);

function FileUploadContextProvider({ children }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(0); //0 Pending, 1 Completed, 2 Failed

  return (
    <FileUploadContext.Provider value={{ uploadProgress, setUploadProgress,uploadStatus, setUploadStatus }}>
      {children}
    </FileUploadContext.Provider>
  );
}

export default FileUploadContextProvider;
