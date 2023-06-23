import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { SearchWrapper } from "./search.style";
import SearchTopHeader from "../../../components/commons/topHeader/SearchTopHeader";
import SearchList from "./SearchList";
import { customAxios } from "../../../library/customAxios";

export default function Search() {
  const [inputValue, setInputValue] = useState(""); //
  const [userList, setUserList] = useState([]); // 유저정보리스트

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    handleSearch(inputValue);
  };

  const handleSearch = useCallback(
    debounce(async (inputValue) => {
      try {
        const response = await customAxios.get(
          `/user/searchuser/?keyword=${inputValue}`,
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
      <SearchTopHeader
        value={inputValue}
        handleInputChange={handleInputChange}
      />
      <SearchWrapper>
        <SearchList inputValue={inputValue} userList={userList} />
      </SearchWrapper>
    </>
  );
}
