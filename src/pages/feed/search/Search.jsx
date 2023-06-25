import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import { SearchWrapper } from "./search.style";
import SearchList from "./SearchList";
import { customAxios } from "../../../library/customAxios";
import MenuBar from "../../../components/commons/menuBar/MenuBar";
import TopButton from "../../../components/commons/topButton/TopButton";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";

export default function Search() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userList, setUserList] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);

    if (value.trim() === "") {
      setUserList([]);
    } else {
      handleSearch(value);
    }
  };

  const handleSearch = useCallback(
    debounce(async (value) => {
      try {
        const response = await customAxios.get(
          `/user/searchuser/?keyword=${value}`,
        );
        setUserList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }, 500),
    [],
  );

  return (
    <>
      <NewTopHeader
        title={"SearchPage"}
        left={"back"}
        right={"searchInput"}
        searchInputValue={searchInputValue} // Use searchInputValue instead of value
        onChangeKeyword={handleInputChange} // Use onChangeKeyword instead of handleInputChange
      />
      <SearchWrapper>
        <SearchList inputValue={searchInputValue} userList={userList} />
      </SearchWrapper>
      <TopButton />
      <MenuBar />
    </>
  );
}
