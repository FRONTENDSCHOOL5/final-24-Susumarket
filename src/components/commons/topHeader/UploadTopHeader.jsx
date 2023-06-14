import React from 'react'
import { useNavigate } from 'react-router-dom';
import backIcon from "../../../img/icon-arrow-left.svg";
import Button from "../button/Button";
import {
  TopHeaderWrapper,
  BackBtn,
  BackIcon,
} from "./TopHeaderStyle.js";
export default function UploadTopHeader() {
  const navigation = useNavigate();

  function onClickBack(url) {
    navigation(url)
  }

  function onClickUpload() {
    // 업로드 기능
  }
  
  return (
    <TopHeaderWrapper>
      <BackBtn onClick={()=>onClickBack("/post")}>
        <BackIcon src={backIcon} alt="뒤로가기"/>
      </BackBtn>
      <Button className="ms" onClick={onClickUpload()}>
        업로드
      </Button>
    </TopHeaderWrapper>
  );
}
