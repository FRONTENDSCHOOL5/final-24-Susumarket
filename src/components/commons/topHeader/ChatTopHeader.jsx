import React, { useContext } from "react";
import backIcon from "../../../img/icon-arrow-left.svg";
import moreIcon from "../../../img/icon-more-vertical.svg";
import {
  TopHeaderWrapper,
  TopHeaderTitle,
  TopHeaderBackBtn,
  TopHeaderBackIcon,
  TopHeaderMoreIconImg,
  TopHeaderMoreBtn,
  TopHeaderLeft,
  TopHeaderMainTitle,
} from "./TopHeaderStyle.js";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../context/ModalContext";

export default function ChatTopHeader({ usernameTitle, headerText }) {
  // 컨텍스트에 저장된 setIsOPenPostModal를 불러와서 모달창을 관리
  const { setIsOpenPostModal } = useContext(ModalContext);
  const navigation = useNavigate();

  // 이전 페이지로 이동시키는 함수
  function onClickBack(url) {
    navigation(url);
  }

  // postModal을 여는 함수
  function onClickMore() {
    setIsOpenPostModal(true);
  }
  return (
    <TopHeaderWrapper>
      <TopHeaderMainTitle className="a11y-hidden">{headerText}</TopHeaderMainTitle>
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
