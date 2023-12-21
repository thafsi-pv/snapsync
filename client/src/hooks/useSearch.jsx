import React, { useEffect, useState } from "react";
import { axiosInstance } from "../services/api/axiosInterceptor";
import { SEARCH_USER_API } from "../services/api/const";
import useDebounce from "./useDebounce";

function useSearch() {
  const [searchTerm, setSearchTerm] = useState();
  const [searchList, setSearchList] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm != "") {
      searchUser(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleSearchBar = () => {
    setSearchBar(false);
    const currentURL = window.location.href;
    const id = getIdFromUrl(currentURL);
    if (id != "inbox") {
      setNavbar("block");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const searchUser = async (debouncedSearchTerm) => {
    const result = await axiosInstance.get(
      `${SEARCH_USER_API}?param=${debouncedSearchTerm}`
    );
    setSearchList(result.data);
  };
  return { handleSearchBar, handleSearch, searchUser, searchTerm, searchList };
}

export default useSearch;
