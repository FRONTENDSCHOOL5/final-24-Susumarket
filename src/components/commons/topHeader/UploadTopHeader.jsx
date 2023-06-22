import React from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../../img/icon-arrow-left.svg";
import Button from "../button/Button";
import {
  TopHeaderWrapper,
  TopHeaderBackBtn,
  TopHeaderBackIcon,
  TopHeaderMainTitle,
} from "./TopHeaderStyle.js";
export default function UploadTopHeader({ headerText }) {
  const navigation = useNavigate();

  // 이전 페이지로 이동시키는 함수
  function onClickBack(url) {
    navigation(url);
  }

  // 게시물, 상품 업로드 함수
  function onClickUpload() {
    // 업로드 기능
  }

  return (
    <TopHeaderWrapper>
      <TopHeaderMainTitle className="a11y-hidden">
        {headerText}
      </TopHeaderMainTitle>
      <TopHeaderBackBtn onClick={() => onClickBack("/post")}>
        <TopHeaderBackIcon src={backIcon} alt="뒤로가기" />
      </TopHeaderBackBtn>
      <Button className="ms" onClick={onClickUpload()}>
        업로드
      </Button>
    </TopHeaderWrapper>
  );
}
