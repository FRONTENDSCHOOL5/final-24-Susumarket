import React from "react";
import backIcon from "../../../img/icon-arrow-left.svg";
import {
  TopHeaderWrapper,
  TopHeaderBackBtn,
  TopHeaderBackIcon,
  TopHeaderSearchInput,
  TopHeaderMainTitle,
} from "./TopHeaderStyle.js";
import { useNavigate } from "react-router-dom";

export default function SearchTopHeader({ headerText }) {
  const navigation = useNavigate();

  // 이전 페이지로 이동시키는 함수
  function onClickBack(url) {
    navigation(url);
  }

  return (
    <TopHeaderWrapper>
      <TopHeaderMainTitle className="a11y-hidden">
        {headerText}
      </TopHeaderMainTitle>
      <TopHeaderBackBtn onClick={() => onClickBack("/post")}>
        <TopHeaderBackIcon src={backIcon} alt="뒤로가기" />
      </TopHeaderBackBtn>
      <TopHeaderSearchInput type="text" placeholder="계정검색" />
    </TopHeaderWrapper>
  );
}
