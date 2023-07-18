import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import { SearchWrapper } from "./search.style";
import SearchList from "./SearchList";
import MenuBar from "../../../components/commons/menuBar/MenuBar";
import TopButton from "../../../components/commons/topButton/TopButton";
import { searchAPI } from "../../../API/searchAPI";
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
        const data = await searchAPI(value); // searchAPI 함수를 호출하여 검색 결과를 가져옵니다.
        setUserList(data); // 검색 결과를 userList 상태에 저장합니다.
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
