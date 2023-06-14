import React from "react";
import backIcon from "../../../img/icon-arrow-left.svg";
import moreIcon from "../../../img/icon- more-vertical.svg";
import {
  TopHeaderWrapper,
  TopHeaderTitle,
  BackBtn,
  BackIcon,
  MoreIconImg,
  MoreBtn,
} from "./TopHeaderStyle.js";
import { useNavigate } from "react-router-dom";

export default function ChatTopHeader({ usernameTitle }) {

  const navigation = useNavigate();

  function onClickBack(url) {
    navigation(url);
  }

  function onClickMore() {

  }
  return (
    <TopHeaderWrapper>
      <BackBtn onClick={() => onClickBack(`/chatList`)}>
        <BackIcon src={backIcon} alt="뒤로가기" />
      </BackBtn>
      <TopHeaderTitle>{usernameTitle}</TopHeaderTitle>
      <MoreBtn>
        <MoreIconImg src={moreIcon} alt="더보기" onClick={onClickMore} />
      </MoreBtn>
    </TopHeaderWrapper>
  );
}
