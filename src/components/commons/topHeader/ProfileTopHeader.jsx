import React from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../../img/icon-arrow-left.svg";
import moreIcon from "../../../img/icon- more-vertical.svg";
import {
  TopHeaderWrapper,
  TopHeaderBackBtn,
  TopHeaderBackIcon,
  TopHeaderMoreBtn,
  TopHeaderMoreIconImg,
  TopHeaderMainTitle,
} from "./TopHeaderStyle.js";

export default function ProfileTopHeader({ onClickMore, headerText }) {
  const navigation = useNavigate();

  // 이전 페이지로 이동시키는 함수
  function onClickBack(url) {
    navigation(url);
  }

  // postModal창을 여는 함수

  return (
    <TopHeaderWrapper>
      <TopHeaderMainTitle className="a11y-hidden">
        {headerText}
      </TopHeaderMainTitle>
      <TopHeaderBackBtn onClick={() => onClickBack("/post")}>
        <TopHeaderBackIcon src={backIcon} alt="뒤로가기" />
      </TopHeaderBackBtn>
      <TopHeaderMoreBtn onClick={onClickMore}>
        <TopHeaderMoreIconImg src={moreIcon} alt="더보기" />
      </TopHeaderMoreBtn>
    </TopHeaderWrapper>
  );
}
