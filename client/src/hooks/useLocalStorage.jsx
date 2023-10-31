import React from "react";

function useLocalStorage() {
  const setStorage = (key, value) => {
    localStorage.setItem(key, value);
  };
  const getStorage = (key) => {
    localStorage.getItem(key);
  };
  return { setStorage, getStorage };
}

export default useLocalStorage;
