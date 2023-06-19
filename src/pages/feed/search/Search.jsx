import styled from "styled-components";
import React from "react";
// import "search.style.js";
import MenuBar from "../../../components/commons/menuBar/MenuBar";
import SearchTopHeader from "../../../components/commons/topHeader/SearchTopHeader";
import SearchList from "./SearchList";

export const SearchWrapper = styled.main`
  display: flex;
  justify-content: center;
  padding: 20px 16px;
  overflow-y: scroll;
`;

export default function Search() {
  return (
    <>
      <SearchTopHeader />
      <SearchWrapper>
        <SearchList />
      </SearchWrapper>
      <MenuBar />
    </>
  );
}
