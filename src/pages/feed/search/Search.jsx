import React, { useState, useEffect } from "react";
import { SearchWrapper } from "./search.style";
import SearchTopHeader from "../../../components/commons/topHeader/SearchTopHeader";
import SearchList from "./SearchList";
import { customAxios } from "../../../library/customAxios";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [userList, setUserList] = useState([]); // 유저정보객체

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // console.log(inputValue);
  };
  useEffect(() => {
    console.log(inputValue);

    // 키 확인하기 api 호출
    customAxios
      .get(`/user/searchuser/?keyword=${inputValue}`)
      .then((response) => {
        // 요청에 대한 응답 처리
        console.log("response.data", response.data);
        setUserList(response.data);
        // userData 저장
      })
      .catch((error) => {
        // 에러 처리
        console.error();
      });
  }, [inputValue]);

  return (
    <>
      <input
        type="text"
        placeholder="계정검색"
        value={inputValue}
        onChange={handleInputChange}
      />
      <SearchWrapper>
        <SearchList inputValue={inputValue} userList={userList} />
      </SearchWrapper>
    </>
  );
}
