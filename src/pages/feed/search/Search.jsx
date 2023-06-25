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

  // debounce패턴 적용한 유저 검색 함수
  const handleSearch = useCallback(
    debounce(async (value) => {
      try {
        const response = await customAxios.get(
          `/user/searchuser/?keyword=${value}`,
        );
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    }, 500), // 500ms 뒤에 함수실행
    [],
  );

  return (
    <>
      <NewTopHeader
        title={"SearchPage"}
        left={"back"}
        right={"searchInput"}
        searchInputValue={searchInputValue}
        onChangeKeyword={handleInputChange}
      />
      <SearchWrapper>
        <SearchList inputValue={searchInputValue} userList={userList} />
      </SearchWrapper>
      <TopButton />
      <MenuBar />
    </>
  );
}
