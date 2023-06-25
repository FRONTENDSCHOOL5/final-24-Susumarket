import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import { SearchWrapper } from "./search.style";
import SearchTopHeader from "../../../components/commons/topHeader/SearchTopHeader";
import SearchList from "./SearchList";
import { customAxios } from "../../../library/customAxios";
import MenuBar from "../../../components/commons/menuBar/MenuBar";
import TopButton from "../../../components/commons/topButton/TopButton";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [userList, setUserList] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

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
      <SearchTopHeader
        value={inputValue}
        handleInputChange={handleInputChange}
      />
      <SearchWrapper>
        <SearchList inputValue={inputValue} userList={userList} />
      </SearchWrapper>
      <TopButton />
      <MenuBar />
    </>
  );
}
