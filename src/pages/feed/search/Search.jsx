import React, { useState, useEffect } from "react";
import { SearchWrapper } from "./search.style";
import SearchTopHeader from "../../../components/commons/topHeader/SearchTopHeader";
import SearchList from "./SearchList";
import { customAxios } from "../../../library/customAxios";

export default function Search() {
  const [inputValue, setInputValue] = useState(""); //
  const [userList, setUserList] = useState([]); // 유저정보리스트

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // console.log(inputValue);
  };

  // 스페이스바, 엔터키 제외한 문자열 입력됐을 때 api 호출하기 위한 함수
  useEffect(() => {
    if (inputValue.trim() === "") {
      setUserList([]);
    } else {
      fetchData();
    }
    // 유저검색 api 호출
    async function fetchData() {
      try {
        const response = await customAxios.get(
          `/user/searchuser/?keyword=${inputValue}`,
        );
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [inputValue]);

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
