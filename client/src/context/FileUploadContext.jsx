import React, { createContext, useState } from "react";

export const FileUploadContext = createContext(null);

function FileUploadContextProvider({ children }) {
  const [uploadProgress, setUploadProgress] = useState(0);

  return (
    <FileUploadContext.Provider value={{ uploadProgress, setUploadProgress}}>
      {children}
    </FileUploadContext.Provider>
  );
}

export default FileUploadContextProvider;
