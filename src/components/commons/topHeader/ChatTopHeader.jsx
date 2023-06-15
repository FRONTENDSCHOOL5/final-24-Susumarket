import React, { useContext, useState } from "react";
import backIcon from "../../../img/icon-arrow-left.svg";
import moreIcon from "../../../img/icon- more-vertical.svg";
import {
  TopHeaderWrapper,
  TopHeaderTitle,
  TopHeaderBackBtn,
  TopHeaderBackIcon,
  TopHeaderMoreIconImg,
  TopHeaderMoreBtn,
  TopHeaderLeft,
} from "./TopHeaderStyle.js";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../context/ModalContext";

export default function ChatTopHeader({ usernameTitle }) {
  const { setIsOpenPostModal } = useContext(ModalContext);
  const navigation = useNavigate();

  function onClickBack(url) {
    navigation(url);
  }

  function onClickMore() {
    setIsOpenPostModal(true);
  }
  return (
    <TopHeaderWrapper>
      <TopHeaderLeft>
        <TopHeaderBackBtn onClick={() => onClickBack(`/chatList`)}>
          <TopHeaderBackIcon src={backIcon} alt="뒤로가기" />
        </TopHeaderBackBtn>
        <TopHeaderTitle>{usernameTitle}</TopHeaderTitle>
      </TopHeaderLeft>
      <TopHeaderMoreBtn>
        <TopHeaderMoreIconImg
          src={moreIcon}
          alt="더보기"
          onClick={onClickMore}
        />
      </TopHeaderMoreBtn>
    </TopHeaderWrapper>
  );
}
