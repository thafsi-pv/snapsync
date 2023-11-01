import React from "react";

function useLocalStorage() {
  const setStorage = (key, value) => {
    localStorage.setItem(key, value);
  };
  const getStorage = (key) => {
    const token = localStorage.getItem(key);
    return token;
  };
  return { setStorage, getStorage };
}

export default useLocalStorage;
