import React from 'react'
import backIcon from "../../../img/icon-arrow-left.svg";
import {
  TopHeaderWrapper,
  TopHeaderBackBtn,
  TopHeaderBackIcon,
  TopHeaderSearchInput,
} from "./TopHeaderStyle.js";
import { useNavigate } from 'react-router-dom';

export default function SearchTopHeader() {
  const navigation = useNavigate();

  function onClickBack(url) {
    navigation(url)
  }

  return (
    <TopHeaderWrapper>
      <TopHeaderBackBtn onClick={()=>onClickBack("/post")}>
        <TopHeaderBackIcon src={backIcon} alt="뒤로가기" />
      </TopHeaderBackBtn>
      <TopHeaderSearchInput type="text" placeholder="계정검색" />
    </TopHeaderWrapper>
  );
}
