import React from 'react';
import searchIcon from "../../../img/icon-search.svg";
import {
  TopHeaderWrapper,
  TopHeaderTitle,
  SearchBtn,
  SearchIconImg
} from "./TopHeaderStyle.js";
import { useNavigate } from 'react-router-dom';

export default function FeedTopHeader() {
  const navigation = useNavigate();

  function onClickSearch() {
    navigation("/search")
  }
    return (
      <TopHeaderWrapper>
        <TopHeaderTitle>감귤마켓 피드</TopHeaderTitle>
        <SearchBtn onClick={onClickSearch}>
          <SearchIconImg src={searchIcon} alt="계정검색" />
        </SearchBtn>
      </TopHeaderWrapper>
    );
}
