import React from "react";

function useLocalStorage() {
  const setStorage = (key, value) => {
    localStorage.setItem(key, value);
  };
  const getStorage = (key) => {
    const token = localStorage.getItem(key);
    return token;
  };
  const clearStorage = (key) => {
    localStorage.removeItem(key);
  };
  return { setStorage, getStorage, clearStorage };
}

export default useLocalStorage;
