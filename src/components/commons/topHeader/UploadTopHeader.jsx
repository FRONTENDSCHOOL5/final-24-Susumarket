import React from 'react'
import { useNavigate } from 'react-router-dom';
import backIcon from "../../../img/icon-arrow-left.svg";
import Button from "../button/Button";
import {
  TopHeaderWrapper,
  TopHeaderBackBtn,
  TopHeaderBackIcon,
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
      <TopHeaderBackBtn onClick={()=>onClickBack("/post")}>
        <TopHeaderBackIcon src={backIcon} alt="뒤로가기"/>
      </TopHeaderBackBtn>
      <Button className="ms" onClick={onClickUpload()}>
        업로드
      </Button>
    </TopHeaderWrapper>
  );
}
