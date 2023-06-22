import React from "react";
import searchIcon from "../../../img/icon-search.svg";
import {
  TopHeaderWrapper,
  TopHeaderTitle,
  TopHeaderSearchBtn,
  TopHeaderSearchIconImg,
  TopHeaderMainTitle,
} from "./TopHeaderStyle.js";
import { useNavigate } from "react-router-dom";

export default function FeedTopHeader({ headerText }) {
  const navigation = useNavigate();

  // 검색 페이지로 이동 시키는 함수
  function onClickSearch() {
    navigation("/search");
  }
  return (
    <TopHeaderWrapper>
      <TopHeaderMainTitle className="a11y-hidden">
        {headerText}
      </TopHeaderMainTitle>
      <TopHeaderTitle>감귤마켓 피드</TopHeaderTitle>
      <TopHeaderSearchBtn onClick={onClickSearch}>
        <TopHeaderSearchIconImg src={searchIcon} alt="계정검색" />
      </TopHeaderSearchBtn>
    </TopHeaderWrapper>
  );
}
